/*class Sportler {
    constructor(vorname, nachname, geburtstag, geschlecht, email) {
        this.vorname = vorname;
        this.nachname = nachname;
        this.geburtstag = geburtstag;
        this.geschlecht = geschlecht;
        this.email = email;
    }
}
const changeButton = this.shadowRoot.querySelector('#change-button-wrapper');
changeButton.addEventListener("click", evt => {
    _popupPin = true;

    const popUp = document.createElement("change-section-popup");

    popUp.setAttribute("data-fname", this.getAttribute("data-fname"));
    popUp.setAttribute("data-lname", this.getAttribute("data-lname"));
    popUp.setAttribute("data-bd", this.getAttribute("data-bd"));
    popUp.setAttribute("data-gender", this.getAttribute("data-gender"));
    popUp.setAttribute("data-email", this.getAttribute("data-email"));
    popUp.setAttribute("data-id", this.getAttribute("id"));

    _addPlayer = false;

    const main = document.getElementById("main");
    main.appendChild(popUp);
});*/
import {Chart} from "chart.js/auto";


let _activePlayercard = null;
let _currentActive = null;
let _currentActiveNav = null;
let _currentPopupOrigin = null;
let _currentActivePopup = null;
let _popupPin = false;
let _changeOptionPin = false;
let _addPlayer = false;
let tmp;
let _uebungskatalogCurrentActiv = null;
let _currentTableId;
let _currentTableMetric;
let _currentTableInEdit;
let daymonChart = [];
let resultChart = [];
var kchart = null;
var schchart = null;
var auschart = null;
var kochart = null;
let _exerciseDate = null;
let _exerciseExId = null;
let _exerciseAtId = null;
let _exerciseResult = null;


window.onload = (event) => {
    createMeineDSA();
};

function getAllPlayer() {
    const playerList = document.getElementById("player-list");

    while (playerList.hasChildNodes()) {
        playerList.removeChild(playerList.firstChild);
    }
    try {
        axios.get('/athletes').then(response => {
            for (let item of response.data) {
                const playerCard = document.createElement("player-card");

                playerCard.setAttribute("data-fname", item.firstName);
                playerCard.setAttribute("data-lname", item.lastName);
                playerCard.setAttribute("data-bd", item.dob);
                playerCard.setAttribute("data-gender", item.sex);
                playerCard.setAttribute("data-email", item.email);
                playerCard.setAttribute("id", item.id);
                playerCard.setAttribute("swim-certificate", item.swimmingCertificate);


                playerList.appendChild(playerCard);
            }

        });
    } catch (e) {
        alert(e);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const meineDSA = document.querySelector("#nav-meine-dsa");
    meineDSA.addEventListener("click", createMeineDSA);

    const meineAthleten = document.querySelector("#nav-meine-athleten");
    meineAthleten.addEventListener("click", createMeineAthleten);

    const uebungskatalog = document.querySelector("#nav-uebungskatalog");
    uebungskatalog.addEventListener("click", createUebungskatalog);

    const expandNavButton = document.querySelector("#nav-expand-button");
    expandNavButton.addEventListener("click", expandNav);

    document.addEventListener("playerCreated", getAllPlayer);
    document.addEventListener("popupCreated", popupCreated);
});

const popupCreated = (item) => {
    let popup;
    let fButton;
    let sButton;
    let eButton;
    let thirdButton;
    let forthButton;
    let fithtButton;
    let sixthButton;
    if (item.detail.popupTyp == "change-option") {
        popup = document.getElementById("change-option__popup");
        fButton = document.getElementById("change-button");
        sButton = document.getElementById("delete-button");
    } else if (item.detail.popupTyp == "add-option") {
        popup = document.getElementById("add-option__popup");
        fButton = document.getElementById("add-button");
        sButton = document.getElementById("csv-button");
        eButton = document.getElementById("export-csv-button");
    } else if (item.detail.popupTyp == "filter-option") {
        popup = document.getElementById("filter-option__popup");
        fButton = document.getElementById("filter-aufsteigend-button");
        sButton = document.getElementById("filter-absteigend-button");
        thirdButton = document.getElementById("filter-aufsteigend-lastname-button");
        forthButton = document.getElementById("filter-absteigend-lastname-button");
        fithtButton = document.getElementById("filter-aufsteigend-birthday-button");
        sixthButton = document.getElementById("filter-absteigend-birthday-button");
    }
    document.addEventListener("click", (clickEvent) => {
        if (fButton && fButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "change-option") {
                changeMeineAthleten(item.detail.id);
            } else if (item.detail.popupTyp == "add-option") {
                createProfilePopUp();
            } else if (item.detail.popupTyp == "filter-option") {
                filterPlayerUpscend();
            }
        } else if (sButton && sButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "change-option") {
                deleteMeineAthleten(item.detail.id);
            } else if (item.detail.popupTyp == "add-option") {
                addPlayerWithCSV();
            } else if (item.detail.popupTyp == "filter-option") {
                filterPlayerDescend();
            }
        } else if (thirdButton && thirdButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "filter-option") {
                filterPlayerLastNameAscend();
            }
        } else if (forthButton && forthButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "filter-option") {
                filterPlayerLastNameDescend();
            }
        } else if (fithtButton && fithtButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "filter-option") {
                filterPlayerBirthdayAscend();
            }
        } else if (sixthButton && sixthButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "filter-option") {
                filterPlayerBirthdayDescend();
            }
        } else if (eButton && eButton.contains(clickEvent.target)) {
            exportPlayersCSV();
        }
        popup.remove();
        _changeOptionPin = false;
        _currentActivePopup = null;
        _currentPopupOrigin = null;
    }, {once: true, capture: item.detail.capture});
    document.addEventListener("wheel", (clickEvent) => {
        popup.remove();
        _changeOptionPin = false;
        _currentActivePopup = null;
        _currentPopupOrigin = null;
    }, {once: true, capture: item.detail.capture});
}

function exportPlayersCSV() {
    try {
        axios.get('/athletes/export', {
            responseType: 'blob'
        })
            .then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data], {type: 'text/csv'}));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'all-athletes-export.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(function (error) {
                console.error('There was an error exporting the CSV:', error);
            });
    } catch (e) {
        alert(e);
    }
}

function checkAction(evt) {
    const activeFilter = document.getElementById("active-filter-player");
    const closeFilter = document.getElementById("close-filter");
    const filterOption = document.getElementById("filter-option");
    const addPlayer = document.getElementById("add-player-popup");
    const inputFilter = document.getElementById("filter-by-name");

    if (activeFilter != null && activeFilter.contains(evt.target)) {
        activePlayerFilter();
    }
    if (closeFilter != null && closeFilter.contains(evt.target)) {
        closePlayerFilter();
        inputFilter.removeEventListener("input", updatePlayerList);
        getAllPlayer();
    }
    if (filterOption != null && filterOption.contains(evt.target)) {
        createPopup("filter-option", evt, filterOption);
    }
    if (addPlayer != null && addPlayer.contains(evt.target)) {
        createPopup("add-option", evt, addPlayer);
    }
    if (inputFilter != null && inputFilter.contains(evt.target)) {
        filterPlayerByName(inputFilter);
    }
}

function activePlayerFilter() {
    const header = document.getElementById("player-section__header");
    tmp = header.innerHTML;

    header.innerHTML = document.getElementById("filter-player").innerHTML;
}

function closePlayerFilter() {
    const header = document.getElementById("player-section__header");
    header.innerHTML = tmp;
}

function filterPlayerByName(input) {
    input.addEventListener("input", updatePlayerList);
}

function updatePlayerList(evt) {
    let currentPlayerList = document.getElementById("player-list").childNodes;
    for (let i = 0; i < currentPlayerList.length; i++) {
        filterByName(currentPlayerList[i], evt);
    }
}

function filterByName(playerCard, evt) {
    let fullName = playerCard.getAttributeNode("data-fname").value + " " + playerCard.getAttributeNode("data-lname").value;
    if (containsInOrder(fullName.toLowerCase(), (evt.target.value).toLowerCase())) {
        playerCard.style.display = "block";
    } else {
        playerCard.style.display = "none";
    }
}

function filterPlayerUpscend() {
    let currentPlayerList = document.getElementById("player-list").childNodes;
    let updatedPlayerList = Array.from(currentPlayerList).sort((firstElement, lastElement) => {
        const nameComparison = firstElement.dataset.fname.localeCompare(lastElement.dataset.fname);
        if (nameComparison !== 0) {
            return nameComparison;
        }
        return firstElement.dataset.lname?.localeCompare(lastElement.dataset.lname) || -1;
    });
    document.getElementById("player-list").replaceChildren(...updatedPlayerList);
}

function filterPlayerDescend() {
    let currentPlayerList = document.getElementById("player-list").childNodes;
    let updatedPlayerList = Array.from(currentPlayerList).sort((firstElement, lastElement) => {
        const nameComparison = lastElement.dataset.fname.localeCompare(firstElement.dataset.fname);
        if (nameComparison !== 0) {
            return nameComparison;
        }
        return lastElement.dataset.lname?.localeCompare(firstElement.dataset.lname) || 1;
    });
    document.getElementById("player-list").replaceChildren(...updatedPlayerList);
}

function filterPlayerLastNameAscend() {
    let currentPlayerList = document.getElementById("player-list").childNodes;
    let updatedPlayerList = Array.from(currentPlayerList).sort((firstElement, lastElement) => {
        const nameComparison = firstElement.dataset.lname.localeCompare(lastElement.dataset.lname);
        if (nameComparison !== 0) {
            return nameComparison;
        }
        return firstElement.dataset.fname?.localeCompare(lastElement.dataset.fname) || -1;
    });
    document.getElementById("player-list").replaceChildren(...updatedPlayerList);
}

function filterPlayerLastNameDescend() {
    let currentPlayerList = document.getElementById("player-list").childNodes;
    let updatedPlayerList = Array.from(currentPlayerList).sort((firstElement, lastElement) => {
        const nameComparison = lastElement.dataset.lname.localeCompare(firstElement.dataset.lname);
        if (nameComparison !== 0) {
            return nameComparison;
        }
        return lastElement.dataset.fname?.localeCompare(firstElement.dataset.fname) || 1;
    });
    document.getElementById("player-list").replaceChildren(...updatedPlayerList);
}

function filterPlayerBirthdayAscend() {
    let currentPlayerList = document.getElementById("player-list").childNodes;
    let updatedPlayerList = Array.from(currentPlayerList).sort((firstElement, lastElement) => {
        const dateComparison = firstElement.dataset.bd.localeCompare(lastElement.dataset.bd);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return firstElement.dataset.fname?.localeCompare(lastElement.dataset.fname) || -1;
    });
    document.getElementById("player-list").replaceChildren(...updatedPlayerList);
}


function filterPlayerBirthdayDescend() {
    let currentPlayerList = document.getElementById("player-list").children;
    let updatedPlayerList = Array.from(currentPlayerList).sort((firstElement, lastElement) => {
        const dateComparison = lastElement.dataset.bd.localeCompare(firstElement.dataset.bd);
        if (dateComparison !== 0) {
            return dateComparison;
        }
        return lastElement.dataset.fname.localeCompare(firstElement.dataset.fname);
    });
    document.getElementById("player-list").replaceChildren(...updatedPlayerList);
}


function containsInOrder(mainString, subString) {
    let startIndex = 0;
    while ((startIndex = mainString.indexOf(subString, startIndex)) !== -1) {
        for (let i = 0; i < subString.length; i++) {
            if (mainString[startIndex + i] !== subString[i]) {
                return false; // Order doesn't match, continue searching
            }
        }
        return true;
    }
    return false;
}

function addPlayerWithCSV() {
    let elem = document.getElementById("add-player-csv");
    elem.type = "file";

    elem.addEventListener("change", () => {
        if (elem.files.length == 1) {
            let formData = new FormData();
            formData.append("file", elem.files[0]);
            try {
                axios.post('/athletes/upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                })
                    .then(function (response) {
                        if (response.status == 200) {
                            getAllPlayer();
                        }
                    });
            } catch (e) {
                alert(e);
            }
        }
    });
}

function createPopup(typ, evt, button, thisId) {
    let popUp;
    if (_changeOptionPin) {
        _currentActivePopup.remove();
        _currentActivePopup = null;
        _changeOptionPin = false;
    }
    if (typ == "change-option") {
        popUp = document.getElementById("change-option-popup").content;
    } else if (typ == "add-option") {
        popUp = document.getElementById("add-option-popup").content;
    } else if (typ == "filter-option") {
        popUp = document.getElementById("filter-option-popup").content;
    }

    if (_currentPopupOrigin != evt.target) {
        const buttonRect = button.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let left = buttonRect.left - 110;
        let top = buttonRect.top + buttonRect.height;

        if (left + popUp.offsetWidth > windowWidth) {
            left = windowWidth - popUp.offsetWidth;
        }
        if (top + popUp.offsetHeight > windowHeight) {
            top = windowHeight - popUp.offsetHeight;
        }

        const main = document.getElementById("main");
        main.appendChild(popUp.cloneNode(true));

        if (typ == "change-option") {
            popUp = document.getElementById("change-option__popup");
        } else if (typ == "add-option") {
            popUp = document.getElementById("add-option__popup");
        } else if (typ == "filter-option") {
            popUp = document.getElementById("filter-option__popup");
        }

        popUp.style.left = `${left}px`;
        popUp.style.top = `${top}px`;

        if (thisId != null) {
            const popupCreated = new CustomEvent("popupCreated", {
                detail: {
                    id: thisId,
                    popupTyp: typ,
                    capture: false
                }
            });
            document.dispatchEvent(popupCreated);
        } else if (typ == "add-option") {
            const popupCreated = new CustomEvent("popupCreated", {
                detail: {
                    popupTyp: typ,
                    capture: true
                }
            });
            document.dispatchEvent(popupCreated);
        } else if (typ == "filter-option") {
            const popupCreated = new CustomEvent("popupCreated", {
                detail: {
                    popupTyp: typ,
                    capture: true
                }
            });
            document.dispatchEvent(popupCreated);
        }
        _changeOptionPin = true;
        _currentPopupOrigin = evt.target;
        _currentActivePopup = popUp;
    } else {
        _currentPopupOrigin = null;
    }
}

function selectActiveNav(selectedNav) {
    if (_currentActiveNav == null) {
        _currentActiveNav = selectedNav;
        selectedNav.setAttribute("aria-pressed", true);
    } else {
        _currentActiveNav.setAttribute("aria-pressed", false);
        _currentActiveNav = selectedNav;
        selectedNav.setAttribute("aria-pressed", true);
    }
}

function expandNav() {
    const nav = document.getElementById("nav-menu");
    if (nav.getAttribute("aria-expanded") === "true") {
        nav.setAttribute("aria-expanded", "false")
    } else {
        nav.setAttribute("aria-expanded", "true")
    }
}


function createMeineDSA() {
    const main = document.querySelector("#main-view");
    main.innerHTML = document.querySelector("#meine-DSA").innerHTML

    const activeNav = document.querySelector("#active-nav");
    activeNav.setAttribute("style", "transform: translate(0, -165px); visibility: visible");

    const meineDSA = document.querySelector("#nav-meine-dsa");
    selectActiveNav(meineDSA);
}

function createMeineAthleten() {
    const main = document.querySelector("#main-view");

    main.innerHTML = document.querySelector("#meine-Athleten").innerHTML;

    getAllPlayer();

    const activeNav = document.querySelector("#active-nav");
    activeNav.setAttribute("style", "transform: translate(0, -108px); visibility: visible");

    const meineAthleten = document.querySelector("#nav-meine-athleten");
    selectActiveNav(meineAthleten);

    const playerAction = document.getElementById("player-section__header");
    playerAction.addEventListener("click", (evt) => {
        checkAction(evt);
    });

    createAusdauerGraph();
}

function createAusdauerGraph() {

}

function changeMeineAthleten(id) {
    _popupPin = true;

    const popUp = document.createElement("change-section-popup");
    const playerCard = document.getElementById(id);

    let fname = playerCard.getAttribute("data-fname");
    let nachname = playerCard.getAttribute("data-lname");
    let lname = playerCard.getAttribute("data-bd");
    let bd = playerCard.getAttribute("data-gender");
    let email = playerCard.getAttribute("data-email");

    popUp.setAttribute("data-fname", fname);
    popUp.setAttribute("data-lname", nachname);
    popUp.setAttribute("data-bd", lname);
    popUp.setAttribute("data-gender", bd);
    popUp.setAttribute("data-email", email);
    popUp.setAttribute("data-id", id);

    _addPlayer = false;

    const main = document.getElementById("main");
    main.appendChild(popUp);
}

function deleteMeineAthleten(id) {
    const playerCard = document.getElementById(id);

    try {
        // First, perform the export operation
        axios.get('/athletes/export/' + id, {
            responseType: 'blob'
        })
            .then(function (exportResponse) {
                if (exportResponse.status === 200) {
                    // Create a URL for the CSV file and trigger download
                    const url = window.URL.createObjectURL(new Blob([exportResponse.data], {type: 'text/csv'}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'athlete-' + id + '-export.csv');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // If export is successful, perform the delete operation
                    return axios.delete("/athletes/delete/" + id);
                } else {
                    throw new Error("Failed to export athlete data");
                }
            })
            .then(deleteResponse => {
                if (deleteResponse.status === 200) {
                    // If delete is successful, remove the player card from the DOM
                    playerCard.remove();
                } else {
                    throw new Error("Failed to delete athlete");
                }
            })
            .catch(error => {
                console.error('There was an error:', error);
            });
    } catch (e) {
        alert(e);
    }
}

function createUebungskatalog() {
    const main = document.querySelector("#main-view");

    main.innerHTML = document.querySelector("#uebungskatalog-t").innerHTML;

    const activeNav = document.querySelector("#active-nav");
    activeNav.setAttribute("style", "transform: translate(0, -52px); visibility: visible");

    const uebungskatalog = document.querySelector("#nav-uebungskatalog");
    selectActiveNav(uebungskatalog);

    const uebungskatalogList = document.getElementById("uebungskatalog-list");
    uebungskatalogList.addEventListener("click", uebungskatalogAction);
}
function selectActiveUebungskatalog(list, element) {
    for(let item of list) {
        if(item.nodeType != Node.TEXT_NODE) {
            const helper = item.querySelector(".uebungskatalog-list__button");
            if(element != helper || element == _uebungskatalogCurrentActiv) {
                helper.setAttribute("data-active", "false");
            }
            else {
                element.setAttribute("data-active", true);
            }
        }
    }
}
function uebungskatalogAction(evt) {
    const ausdauer = document.getElementById("uebungskatalog-ausdauer-button");
    const kraft = document.getElementById("uebungskatalog-kraft-button");
    const schnelligkeit = document.getElementById("uebungskatalog-schnelligkeit-button");
    const koordination = document.getElementById("uebungskatalog-koordination-button");
    const uebersicht = document.getElementById("uebersicht-section-main");
    const details = document.getElementById("uebungskatalog-detail-values");
    const list = document.getElementById("uebungskatalog-list");

    if (ausdauer != null && ausdauer.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == ausdauer) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            selectActiveUebungskatalog(list.childNodes, ausdauer);
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("ausdauer", uebersicht);
            selectActiveUebungskatalog(list.childNodes, ausdauer);
            _uebungskatalogCurrentActiv = ausdauer;
        }
    }
    if (kraft != null && kraft.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == kraft) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            selectActiveUebungskatalog(list.childNodes, kraft);
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("kraft", uebersicht);
            selectActiveUebungskatalog(list.childNodes, kraft);
            _uebungskatalogCurrentActiv = kraft;
        }
    }
    if (schnelligkeit != null && schnelligkeit.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == schnelligkeit) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            selectActiveUebungskatalog(list.childNodes, schnelligkeit);
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("schnelligkeit", uebersicht);
            selectActiveUebungskatalog(list.childNodes, schnelligkeit);
            _uebungskatalogCurrentActiv = schnelligkeit;
        }
    }
    if (koordination != null && koordination.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == koordination) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            selectActiveUebungskatalog(list.childNodes, koordination);
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("koordination", uebersicht);
            selectActiveUebungskatalog(list.childNodes, koordination);
            _uebungskatalogCurrentActiv = koordination;
        }
    }
    details.style.display = "none";
}

function createUebungskatalogDetail(typ, uebersicht) {
    let detail;
    document.getElementById("uebersicht-section").style.visibility = "visible";
    if (typ == "ausdauer") {
        detail = document.getElementById("uebungskatalog-ausdauer-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Ausdauer";
    } else if (typ == "kraft") {
        detail = document.getElementById("uebungskatalog-kraft-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Kraft";
    } else if (typ == "schnelligkeit") {
        detail = document.getElementById("uebungskatalog-schnelligkeit-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Schnelligkeit";
    } else if (typ == "koordination") {
        detail = document.getElementById("uebungskatalog-koordination-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Koordination";
    }

    uebersicht.innerHTML = detail.innerHTML;
    uebersicht.addEventListener("click", showUebungskatalogTable);
}

function showUebungskatalogTable(evt) {
    const ausdauerLaufen = document.getElementById("ausdauer-800-meter");
    const ausdauerDauerlaufen = document.getElementById("ausdauer-dauerlauf");
    const ausdauerSchwimmen = document.getElementById("ausdauer-schwimmen");
    const ausdauerRadfahren = document.getElementById("ausdauer-radfahren");
    const kraftWerfen = document.getElementById("kraft-werfen");
    const kraftKugelstossen = document.getElementById("kraft-kugelstossen");
    const kraftStandweitsprung = document.getElementById("kraft-standweitsprung");
    const kraftGeraeteturnen = document.getElementById("kraft-geraeteturnen");
    const schnelligkeitLaufen = document.getElementById("schnelligkeit-laufen");
    const schnelligkeitSchwimmen = document.getElementById("schnelligkeit-25m-schwimmen");
    const schnelligkeitRadfahren = document.getElementById("schnelligkeit-200m-radfahren");
    const schnelligkeitGeraeteturnen = document.getElementById("schnelligkeit-geraeteturnen");
    const koordinationHochsprung = document.getElementById("koordination-hochsprung");
    const koordinationWeitsprung = document.getElementById("koordination-Weitsprung");
    const koordinationZonenweitsprung = document.getElementById("koordination-Zonenweitsprung");
    const koordinationDrehwurf = document.getElementById("koordination-Drehwurf");
    const koordinationSchleuderball = document.getElementById("koordination-Schleuderball");
    const koordinationSeilsprigen = document.getElementById("koordination-Seilspringen");
    const koordinationGeraeteturnen = document.getElementById("koordination-Geraeteturnen");
    const detailsTitle= document.getElementById("uebungskatalog-detail-values__title");
    const list = document.getElementById("uebungskatalog-details-list");
    /*const changePopup = document.createElement("change-table-popup");*/

    let typ, id;

    if (ausdauerLaufen != null && ausdauerLaufen.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 1;
        detailsTitle.textContent = "Laufen";
        selectActiveUebungskatalog(list.childNodes, ausdauerLaufen);
        /*changePopup.getElementById("change-table-exercise-value").textContent = "800-Meter Laufen"*/
    }
    if (ausdauerDauerlaufen != null && ausdauerDauerlaufen.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 2;
        detailsTitle.textContent = "Dauerlaufen";
        selectActiveUebungskatalog(list.childNodes, ausdauerDauerlaufen);
    }
    if (ausdauerSchwimmen != null && ausdauerSchwimmen.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 3;
        detailsTitle.textContent = "Schwimmen";
        selectActiveUebungskatalog(list.childNodes, ausdauerSchwimmen);
    }
    if (ausdauerRadfahren != null && ausdauerRadfahren.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 4;
        detailsTitle.textContent = "Radfahren";
        selectActiveUebungskatalog(list.childNodes, ausdauerRadfahren);
    }
    if (kraftWerfen != null && kraftWerfen.contains(evt.target)) {
        typ = "KRAFT"
        id = 5;
        detailsTitle.textContent = "Werfen";
        selectActiveUebungskatalog(list.childNodes, kraftWerfen);
    }
    if (kraftKugelstossen != null && kraftKugelstossen.contains(evt.target)) {
        typ = "KRAFT"
        id = 6;
        detailsTitle.textContent = "Kugelstoßen";
        selectActiveUebungskatalog(list.childNodes, kraftKugelstossen);
    }
    if (kraftStandweitsprung != null && kraftStandweitsprung.contains(evt.target)) {
        typ = "KRAFT"
        id = 7;
        detailsTitle.textContent = "Standweitsprung";
        selectActiveUebungskatalog(list.childNodes, kraftStandweitsprung);
    }
    if (kraftGeraeteturnen != null && kraftGeraeteturnen.contains(evt.target)) {
        typ = "KRAFT"
        id = 8;
        detailsTitle.textContent = "Geräteturnen";
        selectActiveUebungskatalog(list.childNodes, kraftGeraeteturnen);
    }
    if (schnelligkeitLaufen != null && schnelligkeitLaufen.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 9;
        detailsTitle.textContent = "Laufen";
        selectActiveUebungskatalog(list.childNodes, schnelligkeitLaufen);
    }
    if (schnelligkeitSchwimmen != null && schnelligkeitSchwimmen.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 10;
        detailsTitle.textContent = "Schwimmen";
        selectActiveUebungskatalog(list.childNodes, schnelligkeitSchwimmen);
    }
    if (schnelligkeitRadfahren != null && schnelligkeitRadfahren.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 11;
        detailsTitle.textContent = "Radfahren";
        selectActiveUebungskatalog(list.childNodes, schnelligkeitRadfahren);
    }
    if (schnelligkeitGeraeteturnen != null && schnelligkeitGeraeteturnen.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 12;
        detailsTitle.textContent = "Geräteturnen";
        selectActiveUebungskatalog(list.childNodes, schnelligkeitGeraeteturnen);
    }
    if (koordinationHochsprung != null && koordinationHochsprung.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 13;
        detailsTitle.textContent = "Hochsprung";
        selectActiveUebungskatalog(list.childNodes, koordinationHochsprung);
    }
    if (koordinationWeitsprung != null && koordinationWeitsprung.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 14;
        detailsTitle.textContent = "Weitsprung";
        selectActiveUebungskatalog(list.childNodes, koordinationWeitsprung);
    }
    if (koordinationZonenweitsprung != null && koordinationZonenweitsprung.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 15;
        detailsTitle.textContent = "Zonenweitsprung";
        selectActiveUebungskatalog(list.childNodes, koordinationZonenweitsprung);
    }
    if (koordinationDrehwurf != null && koordinationDrehwurf.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 16;
        detailsTitle.textContent = "Drehwurf";
        selectActiveUebungskatalog(list.childNodes, koordinationDrehwurf);
    }
    if (koordinationSchleuderball != null && koordinationSchleuderball.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 17;
        detailsTitle.textContent = "Schleuderball";
        selectActiveUebungskatalog(list.childNodes, koordinationSchleuderball);
    }
    if (koordinationSeilsprigen != null && koordinationSeilsprigen.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 18;
        detailsTitle.textContent = "Seilspringen";
        selectActiveUebungskatalog(list.childNodes, koordinationSeilsprigen);
    }
    if (koordinationGeraeteturnen != null && koordinationGeraeteturnen.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 19;
        detailsTitle.textContent = "Geräteturnen";
        selectActiveUebungskatalog(list.childNodes, koordinationGeraeteturnen);
    }

    axios.get("/athletes/exercises",
        {}).then(response => {
        if (response.status == 200) {
            for (let item of response.data) {
                if (item.id == id) {
                    createUebungskatalogDetailTable(item);
                    _currentTableInEdit = id;
                }
            }
        }
    });
}

function createUebungskatalogDetailTable(typ) {
    let tableMain, tableBody, table, tableRow, helperTable, helperButton;
    let checker = false;
    helperButton = document.getElementById("tableChangeButton");
    let tableChangeButton = document.importNode(helperButton.content, true);
    let showTable = document.createElement("div");
    showTable.setAttribute("id", "main-table-with-data");
    let label = 1;
    let counter = 0;
    let counterSecond = 0;
    let metric = typ.rule.metric;

    const detailedSection = document.getElementById("uebungskatalog-detail-values__main");
    document.getElementById("uebungskatalog-detail-values").style.display = "block";

    for (let item of typ.rule) {
        counter++;
        if(item.label == label) {
            let tableRowTemplate = document.getElementById("tableRow");
            tableRow = document.importNode(tableRowTemplate.content, true);
            createTableRow(tableRow, item);
            if(counter % 2 == 0) {
                tableRow.querySelector(".row").setAttribute("class", "white-background");
            }
            tableBody.appendChild(tableRow);
            tableMain.appendChild(tableBody);
            table.getElementById("main-table-section").appendChild(tableMain);
            checker = true;
        }
        else if(item.label != label) {
            if(checker == true) {
                helperTable = table.cloneNode(true);
                showTable.appendChild(helperTable);
                if(metric != "POINTS") {
                    helperButton = tableChangeButton.cloneNode(true);
                    showTable.appendChild(helperButton);
                }
                checker = false;
            }
            let tableTemplate = document.getElementById("uebungskatalog-table-value");
            table = document.importNode(tableTemplate.content, true);
            table.querySelector(".uebungskatalog-table__wrapper").setAttribute("id", item.id);
            tableChangeButton.querySelector(".change-section__save-button").setAttribute("data-id", item.id);
            _currentTableMetric = item.metric;
            tableChangeButton.querySelector(".change-section__save-button").setAttribute("id", counterSecond + 200);
            counterSecond++;

            console.log(item.label);
            label = item.label;

            table.getElementById("uebungskatalog-table__header").textContent = label;
            if(label != null) {
                table.getElementById("uebungskatalog-table__details").style.display = "flex";
            }

            tableMain = table.getElementById("uebungskatalog-table__main");
            tableBody = table.getElementById("uebungskatalog-table__body");

            let tableRowTemplate = document.getElementById("tableRow");
            tableRow = document.importNode(tableRowTemplate.content, true);

            createTableRow(tableRow, item);
            if(counter % 2 == 0) {
                tableRow.querySelector(".row").setAttribute("class", "white-background");
            }
            tableBody.appendChild(tableRow);
            tableMain.appendChild(tableBody);
            table.getElementById("main-table-section").appendChild(tableMain);
            checker = true;
        }
    }
    if(checker) {
        helperTable = table.cloneNode(true);
        showTable.appendChild(helperTable);
        if(metric != "POINTS") {
            helperButton = tableChangeButton.cloneNode(true);
            showTable.appendChild(helperButton);
        }
    }
    detailedSection.innerHTML = "";
    showTable.addEventListener("click", checkTableAction);
    detailedSection.appendChild(showTable);
}

function checkTableAction(evt) {
    let fButton, sButton, tButton, ftButton;

    fButton = document.getElementById("200");
    sButton = document.getElementById("201");
    tButton = document.getElementById("202");
    ftButton = document.getElementById("203");

    if(fButton != null && fButton.contains(evt.target)) {
        createTablePopup(fButton);
    }
    if(sButton != null && sButton.contains(evt.target)) {
        createTablePopup(sButton);
    }
    if(tButton != null && tButton.contains(evt.target)) {
        createTablePopup(tButton);
    }
    if(ftButton != null && ftButton.contains(evt.target)) {
        createTablePopup(ftButton);
    }
}

function createTablePopup(button) {
    const id = button.getAttribute("data-id");
    const table = document.getElementById(id);
    const body = table.querySelector("#main-table-section");
    const popup = document.createElement("change-table-popup")
    const main = document.getElementById("main");
    _currentTableId = button.getAttribute("data-id");
    _popupPin = true;
    main.appendChild(popup);
    popup.setAttribute("data-id", id);
}

function convertTime(input, metric) {
    let finalTime
    if(metric == "MINUTEN") {
        if(input.length % 2 == 0) {
            finalTime = input[0] + input[1] + ":" + input[2] + input[3];
        }
        else {
            finalTime = input[0] + ":" + input[1] + input[2];
        }
    }
    if(metric == "METER") {
        if(input.length % 2 == 0) {
            finalTime = input[0] + input[1] + "," + input[2] + input[3];
        }
        else {
            finalTime = input[0] + "," + input[1] + input[2];
        }
    }
    if(metric == "SEKUNDEN") {
        if(input.length % 2 == 0) {
            finalTime = input[0] + "," + input[1];
        }
        else {
            finalTime = input[0] + input[1] + "," + input[2];
        }
    }
    if(metric == "ANZAHL" || metric == "PUNKTE" || metric == "CENTIMETER" || metric == "DEZISEKUNDEN" || metric == "GESAMTPUNKTE") {
        return input;
    }

    return finalTime;
}

function createTableRow(tableRow, item) {
    let converter;

    tableRow.getElementById("age").textContent = String(item.fromAge) + " - " + String(item.toAge);
    tableRow.getElementById("gender").textContent = item.gender;
    tableRow.getElementById("metric").textContent = item.metric;
    tableRow.querySelector(".row").setAttribute("data-set-id", item.id);

    if(item.valueBronze > 0) {
        converter = convertTime(item.valueBronze.toString(), item.metric);
        tableRow.getElementById("bronze").textContent = converter;
        converter = convertTime(item.valueSilver.toString(), item.metric);
        tableRow.getElementById("silver").textContent = converter;
        converter = convertTime(item.valueGold.toString(), item.metric);
        tableRow.getElementById("gold").textContent = converter;
    }
    else {
        tableRow.getElementById("bronze").textContent = "";
        tableRow.getElementById("silver").textContent = "";
        tableRow.getElementById("gold").textContent = "";
    }
}


function selectActivePlayerCard(playerCardDom, playerCard) {
    _activePlayercard = playerCard;
    const overview = document.getElementById("playerCard-detail");

    if (_currentActive != null) {
        _currentActive.setAttribute("active", false);
    }
    if (_currentActive == playerCardDom) {
        playerCardDom.setAttribute("active", false);
        overview.setAttribute("hidden", "true");
        _currentActive = null;
    } else {
        overview.setAttribute("hidden", "false");
        _currentActive = playerCardDom;
        playerCardDom.setAttribute("active", true);
        passOverviewPlayerInfos(overview, playerCard);
        const ExBtnActionKraft = document.getElementById("create-exercise-action-kraft");
        ExBtnActionKraft.addEventListener("click", () => {
            createExercisePopup("popup-exercise", "kraft");
        });
        const ExBtnActionAus = document.getElementById("create-exercise-action-ausdauer");
        ExBtnActionAus.addEventListener("click", () => {
            createExercisePopup("popup-exercise", "ausdauer");
        });
        const ExBtnActionKoo = document.getElementById("create-exercise-action-koordination");
        ExBtnActionKoo.addEventListener("click", () => {
            createExercisePopup("popup-exercise", "koordination");
        });
        const ExBtnActionSch = document.getElementById("create-exercise-action-schnelligkeit");
        ExBtnActionSch.addEventListener("click", () => {
            createExercisePopup("popup-exercise", "schnelligkeit");
        });
        const einzelpruefKarteBtn = document.getElementById("export-pruefkarte");
        einzelpruefKarteBtn.addEventListener("click", () => {
            let pruefYear = document.getElementById("pruefkarte-jahr").value;
            if(pruefYear==="" ||pruefYear===null){
                pruefYear="2024";
            }
            try {
                axios.get('athletes/einzelpruefkarte/' + playerCard.getAttribute("id") + "/" + pruefYear,  {
                    responseType: 'blob'


                }).then(response => {
                    if (response.status == 200) {
                        const url = window.URL.createObjectURL(new Blob([response.data], {type: 'text/pdf'}));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'pruefkarte.pdf');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                    }
                }).catch(error => {
                    console.error('Error:', error);
                });
            } catch (e) {
                console.log(e);
            }
        });
        const swim_confirm = document.getElementById("swim-confirm");
        swim_confirm.addEventListener("click", swimFunction)

        const player_id = playerCard.getAttribute("id")
        createExerciseDropdown("KRAFT", player_id);
        createExerciseDropdownYear(player_id, "kraft");
        createExerciseDropdown("SCHNELLIGKEIT", player_id);
        createExerciseDropdownYear(player_id, "schnelligkeit");
        createExerciseDropdown("AUSDAUER", player_id);
        createExerciseDropdownYear(player_id, "ausdauer");
        createExerciseDropdown("KOORDINATION", player_id);
        createExerciseDropdownYear(player_id, "koordination");
        createCharts();


        const dropdownau = document.getElementById("change-exercise-ausdauer");
        const dropdownsch = document.getElementById("change-exercise-schnelligkeit");
        const dropdownk = document.getElementById("change-exercise-kraft");
        const dropdownkoo = document.getElementById("change-exercise-koordination");
        const dropdownschy = document.getElementById("change-exercise-year-schnelligkeit");
        const dropdownauy = document.getElementById("change-exercise-year-ausdauer");
        const dropdownky = document.getElementById("change-exercise-year-kraft");
        const dropdownkooy = document.getElementById("change-exercise-year-koordination");

        //change in exercise dropdown
        dropdownsch.addEventListener("change", (evt) => {
            console.log(evt.target.textContent)
            changeChartExercise( evt.target.value, player_id, schchart, "schnelligkeit", dropdownschy.value);
        })
        dropdownau.addEventListener("change", (evt) => {
            console.log(evt.target.textContent)
            changeChartExercise( evt.target.value, player_id, auschart, "ausdauer", dropdownky.value);
        })
        dropdownk.addEventListener("change", (evt) => {
            console.log(evt.target.textContent)
            changeChartExercise( evt.target.value, player_id, kchart, "kraft", dropdownauy.value);
        })

        dropdownkoo.addEventListener("change", (evt) => {
            console.log(evt.target.textContent)
            changeChartExercise( evt.target.value, player_id, kochart, "koordination", dropdownschy.value);
        })

        //change in year dropdown
        dropdownschy.addEventListener("change", (evt) => {
            console.log(evt.target.textContent)
            changeChartExercise( dropdownsch.value, player_id, schchart, "schnelligkeit", evt.target.value);
        })

        dropdownauy.addEventListener("change", (evt) => {
            console.log(evt.target.textContent)
            changeChartExercise( dropdownau.value, player_id, auschart, "ausdauer", evt.target.value);
        })

        dropdownky.addEventListener("change", (evt) => {
            console.log(dropdownk.value)
            changeChartExercise( dropdownk.value, player_id, kchart, "kraft", evt.target.value);
        })

        dropdownkooy.addEventListener("change", (evt) => {
            console.log(dropdownkoo.value)
            changeChartExercise( dropdownkoo.value, player_id, kochart, "koordination", evt.target.value);
        })

    }
}
function swimFunction (){
    try {
        const swimSelectValue = document.getElementById("swim-select").value;
        const testValue = _activePlayercard.getAttribute("id")
        console.log(testValue)
        axios.patch('athletes/swimming-certificate/' + _activePlayercard.getAttribute("id") + "/" + swimSelectValue, {
        }).then(response => {
            if (response.status === 200) {
                alert("Sportabzeicheneinstellungen wurden geändert")
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    } catch (e) {
        console.log(e);
    }
}

function passOverviewPlayerInfos(overview, playerCard) {
    document.getElementById("overview-player-name").textContent = playerCard.getAttribute("data-fname") + " " + playerCard.getAttribute("data-lname");
    document.getElementById("overview-player-bd").textContent = playerCard.getAttribute("data-bd");
    document.getElementById("overview-player-gender").textContent = playerCard.getAttribute("data-gender");
    document.getElementById("overview-player-email").textContent = playerCard.getAttribute("data-email");
}

function createProfilePopUp() {
    const main = document.getElementById("main");

    const createProfilePopUp = document.createElement("profil-add-popup");

    main.appendChild(createProfilePopUp);

    _addPlayer = true;
    _popupPin = true;
}

customElements.define(
    "player-card",
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(
                "playerCard",
            ).content;
            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            const shadowRoot = this.shadowRoot;
            const _this = this;

            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");

            const swimProof = (this.getAttribute("swim-certificate"));
            console.log(swimProof)
           /* if (swimProof === true) {
                this.shadowRoot.querySelector("#swim-icon").style.visibility = "visible"
            } else {
                this.shadowRoot.querySelector("#swim-icon").style.visibility = "hidden"
            }*/

            this.shadowRoot.appendChild(linkElem);

            const userNameShort = this.shadowRoot.querySelector('#user-name-short');
            userNameShort.textContent = this.getAttribute("data-fname")[0] + this.getAttribute("data-lname")[0];

            const userNameFull = this.shadowRoot.querySelector('#user-name-long');
            userNameFull.textContent = this.getAttribute("data-fname") + " " + this.getAttribute("data-lname");

            this.addEventListener("click", (evt) => {
                if (!_popupPin) {
                    selectActivePlayerCard(this.shadowRoot.getElementById("playerCardDom"), this);
                }
            });

            const changeOption = this.shadowRoot.querySelector('#change-option-button');
            changeOption.addEventListener("click", evt => {
                evt.stopPropagation();
                let thisId = this.getAttribute("id");
                createPopup("change-option", evt, changeOption, thisId);
            });

            this.addEventListener("playerChanged", (item) => {

                this.setAttribute("data-fname", item.detail.vorname);
                this.setAttribute("data-lname", item.detail.nachname);
                this.setAttribute("data-bd", item.detail.geburtstag);
                this.setAttribute("data-gender", item.detail.geschlecht);
                this.setAttribute("data-email", item.detail.email);

                const userNameShort = this.shadowRoot.querySelector('#user-name-short');
                userNameShort.textContent = (this.getAttribute("data-fname"))[0] + (this.getAttribute("data-lname"))[0];

                const userNameFull = this.shadowRoot.querySelector('#user-name-long');
                userNameFull.textContent = this.getAttribute("data-fname") + " " + this.getAttribute("data-lname");
            });
        }
    }
);

customElements.define(
    "profil-add-popup",
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(
                "change-section-popup",
            ).content;
            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            const shadowRoot = this.shadowRoot;

            const popUp = this;

            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");

            shadowRoot.appendChild(linkElem);

            const popUpIdentifier = shadowRoot.querySelector("#popUp-identifier");

            popUpIdentifier.textContent = "Profil Anlegen";

            shadowRoot.querySelector('#cancelChange').onclick = function closePopUp() {
                _popupPin = false;
                popUp.remove();
            }

            shadowRoot.querySelector('#sendDataButton').onclick = function packData() {
                const thisVorname = shadowRoot.querySelector('#change-section-name').value;
                const thisNachname = shadowRoot.querySelector('#change-section-lastname').value;
                const thisGeburtstag = shadowRoot.querySelector('#change-section-birthday').value;
                const thisGeschlecht = shadowRoot.querySelector('#change-section-gender').value;
                const thisEmail = shadowRoot.querySelector('#change-section-username').value;
                const thisPasswort = shadowRoot.querySelector('#change-section-password').value;


                try {
                    axios.post('/athletes/register',
                        {
                            firstName: thisVorname,
                            lastName: thisNachname,
                            dob: thisGeburtstag,
                            sex: thisGeschlecht,
                            password: thisPasswort,
                            email: thisEmail,
                            role: "ATHLETE"
                        }).then(response => {
                        if (response.status == 200) {
                            const playerCreated = new CustomEvent("playerCreated", {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    vorname: thisVorname,
                                    nachname: thisNachname,
                                    geburtstag: thisGeburtstag,
                                    geschlecht: thisGeschlecht,
                                    email: thisEmail,
                                }
                            });
                            document.dispatchEvent(playerCreated);
                        }
                    })
                } catch (e) {
                    console.log(e);
                }
                _popupPin = false;
                popUp.remove();
            }
        }
    }
)

// Hier beginnt der Code Snippet für die Webkomponente: Change-section-popup.
customElements.define(
    "change-section-popup",
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(
                "change-section-popup",
            ).content;
            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");

            const shadowRoot = this.shadowRoot;

            const popUp = this;

            shadowRoot.appendChild(linkElem);

            let inputfield = shadowRoot.querySelector("#change-section-name");
            inputfield.setAttribute("value", this.getAttribute("data-fname"));

            inputfield = shadowRoot.querySelector("#change-section-lastname");
            inputfield.setAttribute("value", this.getAttribute("data-lname"));

            inputfield = shadowRoot.querySelector("#change-section-birthday");
            inputfield.setAttribute("value", this.getAttribute("data-bd"));

            inputfield = shadowRoot.querySelector("#change-section-gender");
            inputfield.value = this.getAttribute("data-gender");

            inputfield = shadowRoot.querySelector("#change-section-username");
            inputfield.setAttribute("value", this.getAttribute("data-email"));
            inputfield.setAttribute("data-id", this.getAttribute("data-id"));

            if (!_addPlayer) {
                const passwordField = shadowRoot.querySelector("#add-player-password");
                passwordField.setAttribute("hidden", "true");

                const usernameField = shadowRoot.querySelector("#add-player-username");
                usernameField.style.gridColumn = 'span 2';
            }

            shadowRoot.querySelector('#cancelChange').onclick = function closePopUp() {
                _popupPin = false;
                popUp.remove();
            }

            shadowRoot.querySelector('#sendDataButton').onclick = function packData() {
                const thisVorname = shadowRoot.querySelector('#change-section-name').value;
                const thisNachname = shadowRoot.querySelector('#change-section-lastname').value;
                const thisGeburtstag = shadowRoot.querySelector('#change-section-birthday').value;
                const thisGeschlecht = shadowRoot.querySelector('#change-section-gender').value;
                const thisEmail = shadowRoot.querySelector('#change-section-username').value;
                const thisId = inputfield.getAttribute("data-id");

                try {
                    axios.put('/athletes/update/' + thisId,
                        {
                            id: thisId,
                            firstName: thisVorname,
                            lastName: thisNachname,
                            dob: thisGeburtstag,
                            sex: thisGeschlecht,
                            email: thisEmail

                        }).then(response => {
                        if (response.status == 200) {
                            const playerCard = document.getElementById(thisId);
                            const playerChanged = new CustomEvent("playerChanged", {
                                bubbles: true,
                                composed: true,
                                detail: {
                                    vorname: thisVorname,
                                    nachname: thisNachname,
                                    geburtstag: thisGeburtstag,
                                    geschlecht: thisGeschlecht,
                                    email: thisEmail,
                                    id: thisId
                                }
                            });
                            playerCard.dispatchEvent(playerChanged);
                        }
                    })
                } catch (e) {
                    console.log(e);
                }
                _popupPin = false;
                popUp.remove();
            }
        }
    },
);

customElements.define(
    "exercise-exists-popup",

    class extends HTMLElement {
        constructor() {
            console.log(1)
            super();
            const template = document.getElementById(
                "exercise-exists-popup",
            ).content;
            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.cloneNode(true));
        }
        connectedCallback(){
            console.log(2)
            _popupPin = true;
            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");
            this.shadowRoot.appendChild(linkElem);
            const popUp = this;
            const overlay = this.shadowRoot.getElementById("exercise-exists-overlay");
            const cnlBtn = this.shadowRoot.getElementById("cancelOverwrite");
            const cnfrmBtn = this.shadowRoot.getElementById("confirmOverwrite");

            overlay.addEventListener('click', () => {
                _popupPin = false;
                popUp.remove();
            });
            cnlBtn.addEventListener('click', () => {
                _popupPin = false;
                popUp.remove();
            });

            cnfrmBtn.addEventListener('click', () => {
                try {
                    console.log("ex: " + _exerciseExId + "")
                    axios.put('athletes/exercises/updateCompletedExercise/' + _exerciseExId + "/" + _exerciseAtId
                        + "/" + _exerciseResult + "/" + _exerciseDate).then(response => {



                        if (response.status == 200) {
                            _popupPin = false;
                            popUp.remove();
                            alert("Die Leistung wurde geändert!")
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        }
    }



)

customElements.define(
    "exercise-popup",
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(
                "exercise-popup",
            ).content;
            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            _popupPin = true;
            const _this = this;
            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");
            this.shadowRoot.appendChild(linkElem);
            const popUp = this;
            const overlay = this.shadowRoot.getElementById("exercise-overlay");
            const closeBtn = this.shadowRoot.getElementById("cancelExercise")
            const dateField = this.shadowRoot.getElementById("exercise-date");
            let data_exercise_type = _this.getAttribute("data-type");
            console.log(data_exercise_type);
            overlay.addEventListener('click', () => {
                _popupPin = false;
                popUp.remove();
            });
            closeBtn.addEventListener('click', () => {
                _popupPin = false;
                popUp.remove();
            });
            setExerciseDateDefaultValue(dateField);
            const athleteId = _activePlayercard.getAttribute("id");
            setExerciseMetric(athleteId, this.shadowRoot, data_exercise_type);
            const exerciseId = document.getElementById("change-exercise-" + data_exercise_type).value
            const shadowRoot = this.shadowRoot;
            let result;
            let date;

            this.shadowRoot.querySelector('#sendDataExerciseButton').onclick = function packData() {
                result = shadowRoot.querySelector("#exercise-result").value;
                console.log(typeof (result));
                date = shadowRoot.querySelector("#exercise-date").value;

                if (result === "" || date === null || result.is) {
                    alert("Bitte geben Sie die Werte ein");
                } else {
                    try {
                        axios.post('athletes/exercises/saveCompletedExercise/' + exerciseId + "/" + athleteId
                            + "/" + result + "/" + date).then(response => {



                            if (response.status == 200) {
                                if (response.data === false) {
                                    console.log(response.data);
                                    _popupPin = false;
                                    popUp.remove();
                                    _exerciseExId = exerciseId;
                                    _exerciseDate = date;
                                    _exerciseResult = result;
                                    _exerciseAtId = athleteId;
                                    createExerciseExistsPopUp();

                                } else {
                                    _popupPin = false;
                                    popUp.remove();
                                    createExerciseDropdownYear(athleteId)
                                    alert("Die Leistung wurde erfolgreich erfasst!");
                                }
                            }
                        }).catch(error => {
                            console.error('Error:', error);
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }
            }


        }
    });

customElements.define(
    "change-table-popup",
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(
                "change-table-popup",
            ).content;
            const shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.cloneNode(true));
        }

        connectedCallback() {
            const shadowRoot = this.shadowRoot;
            const popUp = this;

            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");
            shadowRoot.appendChild(linkElem);

            fillUpContent(shadowRoot, "6 - 7");

            shadowRoot.querySelector('#cancel-change').onclick = function closePopUp() {
                _popupPin = false;
                popUp.remove();
            }

            fillUpContent(shadowRoot, "6 - 7", "M");

            shadowRoot.querySelector('#change-table-gender').addEventListener("change", (evt) => {
                const selectedAgeOption = shadowRoot.querySelector("#change-table-age").value;

                this.setAttribute("data-id", fillUpContent(shadowRoot, selectedAgeOption, evt.target.value));
            })

            shadowRoot.querySelector('#change-table-age').addEventListener("change", (evt) => {
                const selectedGenderOption = shadowRoot.querySelector('#change-table-gender').value;

                this.setAttribute("data-id", fillUpContent(shadowRoot, evt.target.value, selectedGenderOption));
            });

            shadowRoot.querySelector('#send-table-button').addEventListener("click", (evt) => {
                const id = this.getAttribute("data-id");
                let thisValueBronze = shadowRoot.querySelector('#change-table-bronze-value').value;
                let thisValueSilver = shadowRoot.querySelector('#change-table-silver-value').value;
                let thisValueGold = shadowRoot.querySelector('#change-table-gold-value').value;
                const thisMetric = shadowRoot.querySelector('#change-table-metric').value;
                console.log(checkInputField(shadowRoot));
                if(checkInputField(shadowRoot)) {
                    thisValueBronze = reOrder(thisValueBronze);
                    thisValueSilver = reOrder(thisValueSilver);
                    thisValueGold = reOrder(thisValueGold);
                    {
                        try {
                            axios.put("/rules/update/" + id,
                                {
                                    valueGold: thisValueGold,
                                    valueSilver: thisValueSilver,
                                    valueBronze: thisValueBronze
                                }).then(response => {
                                if (response.status == 200) {
                                    popUp.remove();
                                    axios.get("/athletes/exercises",
                                        {}).then(response => {
                                        if (response.status == 200) {
                                            for (let item of response.data) {
                                                if (item.id == _currentTableInEdit) {
                                                    createUebungskatalogDetailTable(item);
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        catch (e) {
                            alert(e);
                        }
                    }
                }
                else {
                    alert("Die Werte wurden nicht an der Einheit angepasst: Minuten: tt:tt | Meter: m,mm | Alles andere: wwww");
                }
            });
        }
    });
function fillUpContent(popup, age, gender) {
    const tableMetric = popup.querySelector("#table-metric");
    const tableBronze = popup.querySelector("#change-table-bronze-value");
    const tableSilver = popup.querySelector("#change-table-silver-value");
    const tableGold = popup.querySelector("#change-table-gold-value");
    const table = document.getElementById(_currentTableId).querySelector("#uebungskatalog-table__body");

    tableMetric.setAttribute("value", _currentTableMetric);
    tableMetric.textContent = _currentTableMetric;
    return fillUpTableAge(table, gender, age, tableBronze, tableSilver, tableGold);
}

function fillUpTableAge(table, gender, age, tableBronze, tableSilver, tableGold) {
    let tableRowAge, helper;
    tableBronze.setAttribute("value", "");
    tableSilver.setAttribute("value", "");
    tableGold.setAttribute("value", "");

    for (let item of table.childNodes) {
        let option = document.createElement("option");
        if(item.nodeType != Node.TEXT_NODE) {
            helper = item.childNodes[3].textContent;
            if(helper == gender) {
                tableRowAge = item.childNodes[1].textContent;
                if(tableRowAge == age) {
                    console.log(item);
                    helper = item.childNodes[7].textContent;
                    tableBronze.setAttribute("value", helper);

                    helper = item.childNodes[9].textContent;
                    tableSilver.setAttribute("value", helper);

                    helper = item.childNodes[11].textContent;
                    tableGold.setAttribute("value", helper);
                    return item.getAttribute("data-set-id");
                }
            }
        }
    }
}

function reOrder(str) {
    let word = "";
    for(let i = 0; i<str.length; i++) {
        if(str[i] != ':' && str[i] != ',') {
            word += str[i];
        }
    }
    console.log(word);
    return word;
}

function checkInputField(popup) {
    let bronzeValue = popup.querySelector('#change-table-bronze-value').value;
    let silverValue = popup.querySelector('#change-table-silver-value').value;
    let goldValue = popup.querySelector('#change-table-gold-value').value;
    const metric = popup.querySelector('#change-table-metric').value;

    if(metric == "ANZAHL" || metric == "PUNKTE" || metric === "CENTIMETER" || metric == "DEZISEKUNDEN" || metric == "GESAMTPUNKTE") {
        if(containsOnlyDigits(bronzeValue) && containsOnlyDigits(silverValue) && containsOnlyDigits(goldValue)) {
            if(firstIsNumber(bronzeValue) && firstIsNumber(silverValue) && firstIsNumber(goldValue)) {
                if(bronzeValue.length <= 4 && silverValue.length <= 4 && goldValue.length <= 4)
                    return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    if(metric == "MINUTEN") {
        if(firstIsNumber(bronzeValue) && firstIsNumber(silverValue) && firstIsNumber(goldValue)) {
            console.log("first")
            if(containsOnlyDigits(reOrder(bronzeValue)) && containsOnlyDigits(reOrder(silverValue)) && containsOnlyDigits(reOrder(goldValue))) {
                console.log("contains");
                if(reOrder(bronzeValue).length < 5 && reOrder(silverValue).length < 5 && reOrder(goldValue).length < 5 ) {
                    console.log("bronze");
                    return true;
                }
            }
        }
    }
    if(metric == "METER") {
        if(firstIsNumber(bronzeValue) && firstIsNumber(silverValue) && firstIsNumber(goldValue)) {
            if(containsOnlyDigits(reOrder(bronzeValue)) && containsOnlyDigits(reOrder(silverValue)) && containsOnlyDigits(reOrder(goldValue))) {
                if(reOrder(bronzeValue).length < 4 && reOrder(silverValue).length < 4 && reOrder(goldValue).length < 4 ) {
                    conole.log(reOrder(bronzeValue).length);
                    console.log(reOrder(bronzeValue));
                    return true;
                }
            }
        }
    }
}
function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
}

function firstIsNumber(str) {
    if(containsOnlyDigits(str[0]) && str[0] > 0) {
        return true;
    }
    else {
        return false;
    }
}


function convertTime(input, metric) {
    let finalTime
    if(metric == "MINUTEN") {
        if(input.length % 2 == 0) {
            finalTime = input[0] + input[1] + ":" + input[2] + input[3];
        }
        else {
            finalTime = input[0] + ":" + input[1] + input[2];
        }
    }
    if(metric == "METER") {
        if(input.length % 2 == 0) {
            finalTime = input[0] + input[1] + "," + input[2] + input[3];
        }
        else {
            finalTime = input[0] + "," + input[1] + input[2];
        }
    }
    if(metric == "SEKUNDEN") {
        if(input.length % 2 == 0) {
            finalTime = input[0] + "," + input[1];
        }
        else {
            finalTime = input[0] + input[1] + "," + input[2];
        }
    }
    if(metric == "ANZAHL" || metric == "PUNKTE" || metric == "CENTIMETER" || metric == "DEZISEKUNDEN" || metric == "GESAMTPUNKTE") {
        return input;
    }

    return finalTime;
}


function createExerciseExistsPopUp() {
    _popupPin = true;
    const main = document.getElementById("main")
    const exerciseExists = document.createElement("exercise-exists-popup");
    main.appendChild(exerciseExists);
}
function createExercisePopup(id, typeBox) {
    _popupPin = true;
    const main = document.getElementById("main")
    const exercise = document.createElement("exercise-popup");
    exercise.setAttribute("data-type", typeBox)
    main.appendChild(exercise);
}

function setExerciseMetric(playerId, shadow, extype) {
    const uebungId = document.getElementById("change-exercise-" + extype).value;
    try {
        axios.get('athletes/exercises/ruleMetricByExIdAthId', {
            params: {
                athleteId: parseInt(playerId),
                exerciseId: parseInt(uebungId)
            }
        }).then(response => {
            if (response.status == 200) {
                shadow.getElementById("erreichte-leistung").textContent = "Bitte geben Sie die erreichte Leistung in " + response.data.charAt(0).toUpperCase() + response.data.slice(1).toLowerCase() + " an";
                return response.data.charAt(0).toUpperCase() + response.data.slice(1).toLowerCase();
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    } catch (e) {
        console.error(e);
    }

}


function createExerciseDropdown(ex_type, player_id) {
    try {
        console.log(ex_type);
        axios.get('/athletes/exercise/' + player_id,
            {
                params: {type: ex_type}
            }).then(response => {
            if (response.status == 200) {
                console.log(response.data)
                const dropdownKraft = document.getElementById("change-exercise-" + ex_type.toLowerCase());
                dropdownKraft.innerHTML = "";
                for (let item of response.data) {
                    const dropdownOption = document.createElement("option");
                    dropdownOption.value = item.id;
                    dropdownOption.textContent = item.title;
                    dropdownKraft.appendChild(dropdownOption);
                }
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    } catch (e) {
        alert(e);
    }
}

// Function to set today's date in the date input
function setExerciseDateDefaultValue(dateInput) {
    if (dateInput) {
        let today = new Date();
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        let year = today.getFullYear();
        let todayDate = `${year}-${month}-${day}`;
        dateInput.value = todayDate;
    } else {
        console.error("Element with ID 'exercise-date' not found.");
    }
}

function createExerciseDropdownYear(player_id, exertype) {
    try {
        axios.get('/api/completedExercises/ByPlayerId/' + player_id).then(response => {
            if (response.status == 200) {
                console.log(response.data)
                let idbtn = "change-exercise-year-" + exertype.toLowerCase();
                console.log(idbtn)
                const dropdownKraft = document.getElementById(idbtn);
                dropdownKraft.innerHTML = "";
                let years = [];
                for (let item of response.data) {
                    const dropdownOption = document.createElement("option");
                    let containsYear;
                    let dateofComp = new Date(item.dateOfCompletion);
                    const yearofComp = dateofComp.getFullYear();
                    for (let item1 of years) {
                        if (item1 == yearofComp) {
                            containsYear = true;
                            break;
                        }
                    }
                    if (containsYear) {
                    } else {
                        years.push(yearofComp)
                        dropdownOption.value = yearofComp;
                        dropdownOption.textContent = yearofComp;
                        dropdownKraft.appendChild(dropdownOption);
                    }
                }
            }
        });
    } catch (e) {
        alert(e);
    }
}


function changeChartExercise(Extitle, player_id, mychart, extype, year) {
    //var exChart = document.getElementById("chart-" + ExType);
    try {
        axios.get('/api/completedExercises/ByPlayerId/' + player_id).then(response => {
            if (response.status == 200) {
                console.log(response.data)
                daymonChart = [];
                resultChart = [];
                let medals = [];
                let metric = null;
                for (let item of response.data) {
                    if (item.exercise.id == Extitle) {
                        let dateofComp = new Date(item.dateOfCompletion);
                        let getyear = dateofComp.getFullYear();
                        if ( getyear == year ){
                            let day = dateofComp.getDate();
                            let month = dateofComp.getMonth() + 1;
                            let formattedDate = ('0' + day).slice(-2) + '-' + ('0' + month).slice(-2);
                            daymonChart.push(formattedDate);
                            resultChart.push(item.result);
                            metric = item.exercise.rule[0].metric;
                            medals.push(item.medal);
                        }
                    }
                }
                let getmedal = "No Medal";
                let groessterWert;
                if (extype === "ausdauer" || extype === "schnelligkeit") {
                    groessterWert = resultChart[0];
                    getmedal = medals[0];
                    for (let i = 0; i < resultChart.length; i++) {
                        if ( resultChart[i] < groessterWert) {
                            groessterWert = resultChart[i];
                            getmedal = medals[i];
                        }
                    }

                }
                if (extype === "kraft" || extype === "koordination") {
                    groessterWert = resultChart[0];
                    getmedal = medals[0];
                    for (let i = 0; i < resultChart.length; i++) {
                        if ( resultChart[i] > groessterWert) {
                            groessterWert = resultChart[i];
                            getmedal = medals[i];
                        }
                    }

                }


                let indices = daymonChart.map((value, index) => index);
                indices.sort((a, b) => {
                    let valueA = extractValues(daymonChart[a]);
                    let valueB = extractValues(daymonChart[b]);

                    if (valueA.first === valueB.first) {
                        return valueA.second - valueB.second;
                    } else {
                        return valueA.first - valueB.first;
                    }
                });
                let goldURL = 'medals_gold.jpg';
                let silberURL = 'medals_silber.jpg';
                let bronzeURL = 'medals_bronze.jpg';

                daymonChart = indices.map(index => daymonChart[index]);
                resultChart = indices.map(index => resultChart[index]);

                mychart.data.datasets[0].data = resultChart;
                mychart.data.labels = daymonChart;

                // Update chart
                mychart.update();

                const bestvalue = document.getElementById("value-best-exercise-" + extype);
                const bestmetric = document.getElementById("metric-best-exercise-" + extype);

                if ( groessterWert === null ) {
                    bestvalue.textContent = "Noch kein Ergebniss";

                }else {
                    bestvalue.textContent = groessterWert;
                    var formatted4String = capitalizeFirstLetterOnly(metric);
                    bestmetric.textContent = formatted4String;
                }

                if ( getmedal === "GOLD") {
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = "";
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = '<img src="' + goldURL + '" alt="Medaille">';
                } else if ( getmedal === "SILBER") {
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = "";
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = '<img src="' + silberURL + '" alt="Medaille">';
                } else if ( getmedal === "BRONZE") {
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = "";
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = '<img src="' + bronzeURL + '" alt="Medaille">';
                } else {
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = "";
                    document.getElementById('result-medal-by-excercise-id-' + extype).innerHTML = "";
                }

            }
        })
    } catch (e) {
        alert(e);
    }
}

function createCharts() {
    var kraftChart = document.getElementById("chart-kraft");
    kchart = new Chart(kraftChart, {
        type: 'line',
        data: {
            labels: daymonChart,
            datasets: [{
                label: "Ergebnisse für ",
                borderColor: 'rgba(95, 194, 208, 1)',
                data: resultChart
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var ScheChart = document.getElementById("chart-schnelligkeit");
    schchart = new Chart(ScheChart, {
        type: 'line',
        data: {
            labels: daymonChart,
            datasets: [{
                label: "Ergebnisse für ",
                borderColor: 'rgba(95, 194, 208, 1)',
                data: resultChart
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var auChart = document.getElementById("chart-ausdauer");
    auschart = new Chart(auChart, {
        type: 'line',
        data: {
            labels: daymonChart,
            datasets: [{
                label: "Ergebnisse für ",
                borderColor: 'rgba(95, 194, 208, 1)',
                data: resultChart
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var kooChart = document.getElementById("chart-koordination");
    kochart = new Chart(kooChart, {
        type: 'line',
        data: {
            labels: daymonChart,
            datasets: [{
                label: "Ergebnisse für ",
                borderColor: 'rgba(95, 194, 208, 1)',
                data: resultChart
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function extractValues(str) {
    let parts = str.split('-').map(Number); // Teile den String an '-' und konvertiere zu Zahlen
    return {first: parts[0], second: parts[1]};
}

function capitalizeFirstLetterOnly(string) {
    // Den gesamten String in Kleinbuchstaben umwandeln
    var lowerCaseString = string.toLowerCase();
    // Den ersten Buchstaben des Kleinbuchstaben-Strings großschreiben und den Rest unverändert lassen
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);

    function downloadFile(data, filename) {
        // Create a new Blob object using the response data of the file
        const blob = new Blob([data], { type: data.type });

        // Create a link element
        const link = document.createElement('a');

        // Set the download attribute with the filename
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    }}