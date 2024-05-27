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
import Chart from 'chart.js/auto';

let _currentActive = null;
let _currentActiveNav = null;
let _currentPopupOrigin = null;
let _currentActivePopup = null;
let _popupPin = false;
let _changeOptionPin = false;
let _addPlayer = false;
let tmp;
let _uebungskatalogCurrentActiv = null;

window.onload = (event) => {
    createMeineDSA();
};

function getAllPlayer() {
    const playerList = document.getElementById("player-list");

    while(playerList.hasChildNodes()) {
        playerList.removeChild(playerList.firstChild);
  }
       axios.get('/athletes').then(response => {
         for (let item of response.data) {
             const playerCard = document.createElement("player-card");

             playerCard.setAttribute("data-fname", item.firstName);
             playerCard.setAttribute("data-lname", item.lastName);
             playerCard.setAttribute("data-bd", item.dob);
             playerCard.setAttribute("data-gender", item.sex);
             playerCard.setAttribute("data-email", item.email);
             playerCard.setAttribute("id", item.id);

             playerList.appendChild(playerCard);
         }
     });
}

document.addEventListener("DOMContentLoaded", function() {
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
    if(item.detail.popupTyp == "change-option") {
        popup = document.getElementById("change-option__popup");
        fButton = document.getElementById("change-button");
        sButton = document.getElementById("delete-button");
    }
    else if(item.detail.popupTyp == "add-option") {
        popup = document.getElementById("add-option__popup");
        fButton = document.getElementById("add-button");
        sButton = document.getElementById("csv-button");
        eButton = document.getElementById("export-csv-button");
    }
    else if(item.detail.popupTyp == "filter-option") {
        popup = document.getElementById("filter-option__popup");
        fButton = document.getElementById("filter-aufsteigend-button");
        sButton = document.getElementById("filter-absteigend-button");
    }
    document.addEventListener("click", (clickEvent)=> {
        if (fButton && fButton.contains(clickEvent.target)) {
            if(item.detail.popupTyp == "change-option") {
                changeMeineAthleten(item.detail.id);
            }
            else if(item.detail.popupTyp == "add-option") {
                createProfilePopUp();
            }
            else if(item.detail.popupTyp == "filter-option") {
                filterPlayerUpscend();
            }
        }
        else if (sButton && sButton.contains(clickEvent.target)) {
            if (item.detail.popupTyp == "change-option") {
                deleteMeineAthleten(item.detail.id);
            }
            else if (item.detail.popupTyp == "add-option") {
                addPlayerWithCSV();
            }
            else if (item.detail.popupTyp == "filter-option") {
                filterPlayerDescend();
            }
        }
        else if (eButton && eButton.contains(clickEvent.target)) {
            exportPlayersCSV();
        }
        popup.remove();
        _changeOptionPin = false;
        _currentActivePopup = null;
        _currentPopupOrigin = null;
    }, {once: true, capture: item.detail.capture});
    document.addEventListener("wheel", (clickEvent)=> {
        popup.remove();
        _changeOptionPin = false;
        _currentActivePopup = null;
        _currentPopupOrigin = null;
    }, {once: true, capture: item.detail.capture});
}

function exportPlayersCSV() {
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
    if(inputFilter != null && inputFilter.contains(evt.target)) {
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
    for(let i = 0; i < currentPlayerList.length; i++) {
        filterByName(currentPlayerList[i], evt);
    }
}

function filterByName(playerCard, evt) {
    let fullName = playerCard.getAttributeNode("data-fname").value + " " + playerCard.getAttributeNode("data-lname").value;
    if(containsInOrder(fullName.toLowerCase(), (evt.target.value).toLowerCase())) {
        playerCard.style.display = "block";
    }
    else {
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
            axios.post('/athletes/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(function (response) {
                if(response.status == 200) {
                    getAllPlayer();
                }
            });
        }
    });
}

function createPopup(typ, evt, button, thisId) {
    let popUp;
    if(_changeOptionPin) {
        _currentActivePopup.remove();
        _currentActivePopup = null;
        _changeOptionPin = false;
    }
    if(typ == "change-option") {
        popUp = document.getElementById("change-option-popup").content;
    }
    else if(typ == "add-option") {
        popUp = document.getElementById("add-option-popup").content;
    }
    else if(typ == "filter-option") {
        popUp = document.getElementById("filter-option-popup").content;
    }

    if(_currentPopupOrigin != evt.target) {
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

        if(typ == "change-option") {
            popUp = document.getElementById("change-option__popup");
        }
        else if(typ == "add-option") {
            popUp = document.getElementById("add-option__popup");
        }
        else if(typ == "filter-option") {
            popUp = document.getElementById("filter-option__popup");
        }

        popUp.style.left = `${left}px`;
        popUp.style.top = `${top}px`;

        if(thisId != null) {
            const popupCreated = new CustomEvent("popupCreated", {
                detail: {
                    id: thisId,
                    popupTyp: typ,
                    capture: false
                }
            });
            document.dispatchEvent(popupCreated);
        }
        else if(typ == "add-option"){
            const popupCreated = new CustomEvent("popupCreated", {
                detail: {
                    popupTyp: typ,
                    capture: true
                }
            });
            document.dispatchEvent(popupCreated);
        }
        else if(typ == "filter-option"){
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
    }
    else {
        _currentPopupOrigin = null;
    }
}

function selectActiveNav(selectedNav) {
    if(_currentActiveNav == null) {
        _currentActiveNav = selectedNav;
        selectedNav.setAttribute("aria-pressed", true);
    }
    else {
        _currentActiveNav.setAttribute("aria-pressed", false);
        _currentActiveNav = selectedNav;
        selectedNav.setAttribute("aria-pressed", true);
    }
}

function expandNav() {
    const nav = document.getElementById("nav-menu");
    if(nav.getAttribute("aria-expanded") === "true") {
        nav.setAttribute("aria-expanded", "false")
    }
    else {
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
        axios.delete("/athletes/delete/" + id,
            {

            }).then(response => {
            if(response.status == 200) {
                playerCard.remove();
            }
        })
    }
    catch (e) {
        console.log(e);
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
        if(_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == ausdauer) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        }
        else {
            createUebungskatalogDetail("ausdauer", uebersicht);
            _uebungskatalogCurrentActiv = ausdauer;
        }
    }
    if (kraft != null && kraft.contains(evt.target)) {
        if(_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == kraft) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        }
        else {
            createUebungskatalogDetail("kraft", uebersicht);
            _uebungskatalogCurrentActiv = kraft;
        }
    }
    if (schnelligkeit != null && schnelligkeit.contains(evt.target)) {
        if(_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == schnelligkeit) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        }
        else {
            createUebungskatalogDetail("schnelligkeit", uebersicht);
            _uebungskatalogCurrentActiv = schnelligkeit;
        }
    }
    if (koordination != null && koordination.contains(evt.target)) {
        if(_uebungskatalogCurrentActiv != null && _uebungskatalogCurrentActiv == koordination) {
            document.getElementById("uebersicht-section").style.visibility = "hidden";
            _uebungskatalogCurrentActiv = null;
        }
        else {
            createUebungskatalogDetail("koordination", uebersicht);
            _uebungskatalogCurrentActiv = koordination;
        }
    }
}

function createUebungskatalogDetail(typ, uebersicht) {
    let detail;
    document.getElementById("uebersicht-section").style.visibility = "visible";
    if(typ == "ausdauer") {
        detail = document.getElementById("uebungskatalog-ausdauer-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Ausdauer";
    }
    else if(typ == "kraft") {
        detail = document.getElementById("uebungskatalog-kraft-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Kraft";
    }
    else if(typ == "schnelligkeit") {
        detail = document.getElementById("uebungskatalog-schnelligkeit-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Schnelligkeit";
    }
    else if(typ == "koordination") {
        detail = document.getElementById("uebungskatalog-koordination-kinder");
        document.getElementById("uebungskatalog-detail__title").textContent = "Koordination";
    }

    uebersicht.innerHTML = detail.innerHTML;
}

function selectActivePlayerCard(playerCardDom, playerCard) {
    const overview = document.getElementById("playerCard-detail");

    if(_currentActive != null) {
        _currentActive.setAttribute("active", false);
    }
    if(_currentActive == playerCardDom){
        playerCardDom.setAttribute("active", false);
        overview.setAttribute("hidden", "true");
        _currentActive = null;
    }
    else {
        overview.setAttribute("hidden", "false");
        _currentActive = playerCardDom;
        playerCardDom.setAttribute("active", true);
        passOverviewPlayerInfos(overview, playerCard);
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
            const shadowRoot = this.attachShadow({ mode: "open" });
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
                        if(response.status == 200) {
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
                }
                catch (e) {
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
            const shadowRoot = this.attachShadow({ mode: "open" });
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

            if(!_addPlayer) {
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
                            if(response.status == 200) {
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
                }
                catch (e) {
                    console.log(e);
                }
                _popupPin = false;
                popUp.remove();
            }
        }
    },
);
