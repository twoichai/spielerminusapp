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

let _currentActive = null;
let _currentActiveNav = null;
let _currentPopupOrigin = null;
let _currentActivePopup = null;
let _popupPin = false;
let _changeOptionPin = false;
let _addPlayer = false;
let tmp;
let _uebungskatalogCurrentActiv = null;
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
                playerCard.setAttribute("swim-certificate", item.swimmingCerticate);

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

function uebungskatalogAction(evt) {
    const ausdauer = document.getElementById("uebungskatalog-ausdauer-button");
    const kraft = document.getElementById("uebungskatalog-kraft-button");
    const schnelligkeit = document.getElementById("uebungskatalog-schnelligkeit-button");
    const koordination = document.getElementById("uebungskatalog-koordination-button");
    const uebersicht = document.getElementById("uebersicht-section-main");

    if (ausdauer != null && ausdauer.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == ausdauer) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("ausdauer", uebersicht);
            _uebungskatalogCurrentActiv = ausdauer;
        }
    }
    if (kraft != null && kraft.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == kraft) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("kraft", uebersicht);
            _uebungskatalogCurrentActiv = kraft;
        }
    }
    if (schnelligkeit != null && schnelligkeit.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == schnelligkeit) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("schnelligkeit", uebersicht);
            _uebungskatalogCurrentActiv = schnelligkeit;
        }
    }
    if (koordination != null && koordination.contains(evt.target)) {
        if (_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == koordination) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        } else {
            createUebungskatalogDetail("koordination", uebersicht);
            _uebungskatalogCurrentActiv = koordination;
        }
    }
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
    const detailsTitle = document.getElementById("uebungskatalog-detail-values__title");

    let typ, id;

    if (ausdauerLaufen != null && ausdauerLaufen.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 1;
        detailsTitle.textContent = "Laufen";
    }
    if (ausdauerDauerlaufen != null && ausdauerDauerlaufen.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 2;
        detailsTitle.textContent = "Dauerlaufen";
    }
    if (ausdauerSchwimmen != null && ausdauerSchwimmen.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 3;
        detailsTitle.textContent = "Schwimmen";
    }
    if (ausdauerRadfahren != null && ausdauerRadfahren.contains(evt.target)) {
        typ = "AUSDAUER"
        id = 4;
        detailsTitle.textContent = "Radfahren";
    }
    if (kraftWerfen != null && kraftWerfen.contains(evt.target)) {
        typ = "KRAFT"
        id = 5;
        detailsTitle.textContent = "Werfen";
    }
    if (kraftKugelstossen != null && kraftKugelstossen.contains(evt.target)) {
        typ = "KRAFT"
        id = 6;
        detailsTitle.textContent = "Kugelstoßen";
    }
    if (kraftStandweitsprung != null && kraftStandweitsprung.contains(evt.target)) {
        typ = "KRAFT"
        id = 7;
        detailsTitle.textContent = "Standweitsprung";
    }
    if (kraftGeraeteturnen != null && kraftGeraeteturnen.contains(evt.target)) {
        typ = "KRAFT"
        id = 8;
        detailsTitle.textContent = "Geräteturnen";
    }
    if (schnelligkeitLaufen != null && schnelligkeitLaufen.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 9;
        detailsTitle.textContent = "Laufen";
    }
    if (schnelligkeitSchwimmen != null && schnelligkeitSchwimmen.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 10;
        detailsTitle.textContent = "Schwimmen";
    }
    if (schnelligkeitRadfahren != null && schnelligkeitRadfahren.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 11;
        detailsTitle.textContent = "Radfahren";
    }
    if (schnelligkeitGeraeteturnen != null && schnelligkeitGeraeteturnen.contains(evt.target)) {
        typ = "SCHNELLIGKEIT"
        id = 12;
        detailsTitle.textContent = "Geräteturnen";
    }
    if (koordinationHochsprung != null && koordinationHochsprung.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 13;
        detailsTitle.textContent = "Hochsprung";
    }
    if (koordinationWeitsprung != null && koordinationWeitsprung.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 14;
        detailsTitle.textContent = "Weitsprung";
    }
    if (koordinationZonenweitsprung != null && koordinationZonenweitsprung.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 15;
        detailsTitle.textContent = "Zonenweitsprung";
    }
    if (koordinationDrehwurf != null && koordinationDrehwurf.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 16;
        detailsTitle.textContent = "Drehwurf";
    }
    if (koordinationSchleuderball != null && koordinationSchleuderball.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 17;
        detailsTitle.textContent = "Schleuderball";
    }
    if (koordinationSeilsprigen != null && koordinationSeilsprigen.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 18;
        detailsTitle.textContent = "Seilspringen";
    }
    if (koordinationGeraeteturnen != null && koordinationGeraeteturnen.contains(evt.target)) {
        typ = "KOORDINATION"
        id = 19;
        detailsTitle.textContent = "Geräteturnen";
    }

    axios.get("/athletes/exercises",
        {}).then(response => {
        if (response.status == 200) {
            for (let item of response.data) {
                if (item.id == id) {
                    createUebungskatalogDetailTable(item);
                }
            }
        }
    });
}

function createUebungskatalogDetailTable(typ) {
    let mainTable, table, helperTable, tableRow;
    let label = null;

    const detailedSection = document.getElementById("uebungskatalog-detail-values__main");
    document.getElementById("uebungskatalog-detail-values").style.visibility = "visible";

    let tableTemplate = document.getElementById("uebungskatalog-table-value");
    helperTable = document.importNode(tableTemplate.content, true);

    mainTable = helperTable.getElementById("uebungskatalog-table__main");
    table = helperTable.getElementById("uebungskatalog-table__body");

    const details = document.getElementById("uebungskatalog-table__header");

    for (let item of typ.rule) {
        if (item.label == label) {
            let tableRowTemplate = document.getElementById("tableRow");
            tableRow = document.importNode(tableRowTemplate.content, true);
            if (item.valueBronze != 0) {
                createTableRow(tableRow, item);
            }
        } else if (item.label != label) {
            item.label = label;
            details.textContent = "Details: " + label;

            let tableTemplate = document.getElementById("uebungskatalog-table-value");
            helperTable = document.importNode(tableTemplate.content, true);

            mainTable = helperTable.getElementById("uebungskatalog-table__main");
            table = helperTable.getElementById("uebungskatalog-table__body");

            let tableRowTemplate = document.getElementById("tableRow");
            tableRow = document.importNode(tableRowTemplate.content, true);
            createTableRow(tableRow, item)
        }
        table.appendChild(tableRow);
        mainTable.appendChild(table);
        console.log(mainTable);
        helperTable.getElementById("main-table-section").replaceChildren(mainTable);
    }
    detailedSection.innerHTML = "";
    detailedSection.appendChild(helperTable);
}

function convertTime(input) {
    let finalTime
    if (input.length % 2 == 0) {
        finalTime = input[0] + input[1] + ":" + input[2] + input[3];
    } else {
        finalTime = input[0] + ":" + input[1] + input[2];
    }
    return finalTime;
}

function createTableRow(tableRow, item) {
    let convert;

    tableRow.getElementById("age").textContent = String(item.fromAge) + " - " + String(item.toAge);
    tableRow.getElementById("gender").textContent = item.gender;
    tableRow.getElementById("metric").textContent = item.metric;
    if (item.metric == "MINUTES") {
        converter = convertTime(item.valueBronze.toString());
        tableRow.getElementById("bronze").textContent = converter;
        converter = convertTime(item.valueSilver.toString());
        tableRow.getElementById("silver").textContent = converter;
        converter = convertTime(item.valueGold.toString());
        tableRow.getElementById("gold").textContent = converter;
    } else {
        tableRow.getElementById("bronze").textContent = item.valueBronze;
        tableRow.getElementById("silver").textContent = item.valueSilver;
        tableRow.getElementById("gold").textContent = item.valueGold;
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
        const ExBtnAction = document.getElementById("create-exercise-action");
        ExBtnAction.addEventListener("click", () => {
            createExercisePopup("popup-exercise");
        });
        const einzelpruefKarteBtn = document.getElementById("export-pruefkarte");
        einzelpruefKarteBtn.addEventListener("click", () => {
            try {
                axios.get('athletes/einzelpruefkarte/' + playerCard.getAttribute("id"),  {

                }).then(response => {
                    if (response.status == 200) {
                        downloadFile(response.data, 'pruefkarte.pdf');

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
        createExerciseDropdownYear(player_id)
    }
}
function swimFunction (){
    try {
        const swimSelectValue = document.getElementById("swim-select").value;
        axios.patch('athletes/swimming-certificate/' + playerCard.getAttribute("id") + "/" + swimSelectValue, {
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
            const linkElem = document.createElement("link");
            linkElem.setAttribute("rel", "stylesheet");
            linkElem.setAttribute("href", "main.07544d9b.css");
            this.shadowRoot.appendChild(linkElem);
            const popUp = this;
            const overlay = this.shadowRoot.getElementById("exercise-overlay");
            const closeBtn = this.shadowRoot.getElementById("cancelExercise")
            const dateField = this.shadowRoot.getElementById("exercise-date");
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
            setExerciseKraftMetric(athleteId, this.shadowRoot);
            const exerciseId = document.getElementById("change-exercise-kraft").value
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

function createExerciseExistsPopUp() {
    _popupPin = true;
    const main = document.getElementById("main")
    const exerciseExists = document.createElement("exercise-exists-popup");
    main.appendChild(exerciseExists);
}
function createExercisePopup(id) {
    _popupPin = true;
    const main = document.getElementById("main")
    const exercise = document.createElement("exercise-popup");
    main.appendChild(exercise);
}

function setExerciseKraftMetric(playerId, shadow) {
    const uebungId = document.getElementById("change-exercise-kraft").value;
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
                const dropdownKraft = document.getElementById("change-exercise-kraft");
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

function createExerciseDropdownYear(player_id) {
    try {
        axios.get('/api/completedExercises/ByPlayerId/' + player_id).then(response => {
            if (response.status == 200) {
                console.log(response.data)
                const dropdownKraft = document.getElementById("change-exercise-year-kraft");
                dropdownKraft.innerHTML = "";
                let years = [];
                for (let item of response.data) {
                    const dropdownOption = document.createElement("option");
                    if (item.exerciseType == "Kraft")
                        dropdownOption.value = item.id;
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
}