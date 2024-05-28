// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"KIzB":[function(require,module,exports) {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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

var _currentActive = null;
var _currentActiveNav = null;
var _currentPopupOrigin = null;
var _currentActivePopup = null;
var _popupPin = false;
var _changeOptionPin = false;
var _addPlayer = false;
var tmp;
var _uebungskatalogCurrentActiv = null;
window.onload = function (event) {
  createMeineDSA();
};
function getAllPlayer() {
  var playerList = document.getElementById("player-list");
  while (playerList.hasChildNodes()) {
    playerList.removeChild(playerList.firstChild);
  }
  axios.get('/athletes').then(function (response) {
    var _iterator = _createForOfIteratorHelper(response.data),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        var playerCard = document.createElement("player-card");
        playerCard.setAttribute("data-fname", item.firstName);
        playerCard.setAttribute("data-lname", item.lastName);
        playerCard.setAttribute("data-bd", item.dob);
        playerCard.setAttribute("data-gender", item.sex);
        playerCard.setAttribute("data-email", item.email);
        playerCard.setAttribute("id", item.id);
        playerList.appendChild(playerCard);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  var meineDSA = document.querySelector("#nav-meine-dsa");
  meineDSA.addEventListener("click", createMeineDSA);
  var meineAthleten = document.querySelector("#nav-meine-athleten");
  meineAthleten.addEventListener("click", createMeineAthleten);
  var uebungskatalog = document.querySelector("#nav-uebungskatalog");
  uebungskatalog.addEventListener("click", createUebungskatalog);
  var expandNavButton = document.querySelector("#nav-expand-button");
  expandNavButton.addEventListener("click", expandNav);
  document.addEventListener("playerCreated", getAllPlayer);
  document.addEventListener("popupCreated", popupCreated);
});
var popupCreated = function popupCreated(item) {
  var popup;
  var fButton;
  var sButton;
  var eButton;
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
  }
  document.addEventListener("click", function (clickEvent) {
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
    } else if (eButton && eButton.contains(clickEvent.target)) {
      exportPlayersCSV();
    }
    popup.remove();
    _changeOptionPin = false;
    _currentActivePopup = null;
    _currentPopupOrigin = null;
  }, {
    once: true,
    capture: item.detail.capture
  });
  document.addEventListener("wheel", function (clickEvent) {
    popup.remove();
    _changeOptionPin = false;
    _currentActivePopup = null;
    _currentPopupOrigin = null;
  }, {
    once: true,
    capture: item.detail.capture
  });
};
function exportPlayersCSV() {
  axios.get('/athletes/export', {
    responseType: 'blob'
  }).then(function (response) {
    var url = window.URL.createObjectURL(new Blob([response.data], {
      type: 'text/csv'
    }));
    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'all-athletes-export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(function (error) {
    console.error('There was an error exporting the CSV:', error);
  });
}
function checkAction(evt) {
  var activeFilter = document.getElementById("active-filter-player");
  var closeFilter = document.getElementById("close-filter");
  var filterOption = document.getElementById("filter-option");
  var addPlayer = document.getElementById("add-player-popup");
  var inputFilter = document.getElementById("filter-by-name");
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
  var header = document.getElementById("player-section__header");
  tmp = header.innerHTML;
  header.innerHTML = document.getElementById("filter-player").innerHTML;
}
function closePlayerFilter() {
  var header = document.getElementById("player-section__header");
  header.innerHTML = tmp;
}
function filterPlayerByName(input) {
  input.addEventListener("input", updatePlayerList);
}
function updatePlayerList(evt) {
  var currentPlayerList = document.getElementById("player-list").childNodes;
  for (var i = 0; i < currentPlayerList.length; i++) {
    filterByName(currentPlayerList[i], evt);
  }
}
function filterByName(playerCard, evt) {
  var fullName = playerCard.getAttributeNode("data-fname").value + " " + playerCard.getAttributeNode("data-lname").value;
  if (containsInOrder(fullName.toLowerCase(), evt.target.value.toLowerCase())) {
    playerCard.style.display = "block";
  } else {
    playerCard.style.display = "none";
  }
}
function filterPlayerUpscend() {
  var _document$getElementB;
  var currentPlayerList = document.getElementById("player-list").childNodes;
  var updatedPlayerList = Array.from(currentPlayerList).sort(function (firstElement, lastElement) {
    var _firstElement$dataset;
    var nameComparison = firstElement.dataset.fname.localeCompare(lastElement.dataset.fname);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return ((_firstElement$dataset = firstElement.dataset.lname) === null || _firstElement$dataset === void 0 ? void 0 : _firstElement$dataset.localeCompare(lastElement.dataset.lname)) || -1;
  });
  (_document$getElementB = document.getElementById("player-list")).replaceChildren.apply(_document$getElementB, _toConsumableArray(updatedPlayerList));
}
function filterPlayerDescend() {
  var _document$getElementB2;
  var currentPlayerList = document.getElementById("player-list").childNodes;
  var updatedPlayerList = Array.from(currentPlayerList).sort(function (firstElement, lastElement) {
    var _lastElement$dataset$;
    var nameComparison = lastElement.dataset.fname.localeCompare(firstElement.dataset.fname);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return ((_lastElement$dataset$ = lastElement.dataset.lname) === null || _lastElement$dataset$ === void 0 ? void 0 : _lastElement$dataset$.localeCompare(firstElement.dataset.lname)) || 1;
  });
  (_document$getElementB2 = document.getElementById("player-list")).replaceChildren.apply(_document$getElementB2, _toConsumableArray(updatedPlayerList));
}
function containsInOrder(mainString, subString) {
  var startIndex = 0;
  while ((startIndex = mainString.indexOf(subString, startIndex)) !== -1) {
    for (var i = 0; i < subString.length; i++) {
      if (mainString[startIndex + i] !== subString[i]) {
        return false; // Order doesn't match, continue searching
      }
    }
    return true;
  }
  return false;
}
function addPlayerWithCSV() {
  var elem = document.getElementById("add-player-csv");
  elem.type = "file";
  elem.addEventListener("change", function () {
    if (elem.files.length == 1) {
      var formData = new FormData();
      formData.append("file", elem.files[0]);
      axios.post('/athletes/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        if (response.status == 200) {
          getAllPlayer();
        }
      });
    }
  });
}
function createPopup(typ, evt, button, thisId) {
  var popUp;
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
    var buttonRect = button.getBoundingClientRect();
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var left = buttonRect.left - 110;
    var top = buttonRect.top + buttonRect.height;
    if (left + popUp.offsetWidth > windowWidth) {
      left = windowWidth - popUp.offsetWidth;
    }
    if (top + popUp.offsetHeight > windowHeight) {
      top = windowHeight - popUp.offsetHeight;
    }
    var main = document.getElementById("main");
    main.appendChild(popUp.cloneNode(true));
    if (typ == "change-option") {
      popUp = document.getElementById("change-option__popup");
    } else if (typ == "add-option") {
      popUp = document.getElementById("add-option__popup");
    } else if (typ == "filter-option") {
      popUp = document.getElementById("filter-option__popup");
    }
    popUp.style.left = "".concat(left, "px");
    popUp.style.top = "".concat(top, "px");
    if (thisId != null) {
      var _popupCreated = new CustomEvent("popupCreated", {
        detail: {
          id: thisId,
          popupTyp: typ,
          capture: false
        }
      });
      document.dispatchEvent(_popupCreated);
    } else if (typ == "add-option") {
      var _popupCreated2 = new CustomEvent("popupCreated", {
        detail: {
          popupTyp: typ,
          capture: true
        }
      });
      document.dispatchEvent(_popupCreated2);
    } else if (typ == "filter-option") {
      var _popupCreated3 = new CustomEvent("popupCreated", {
        detail: {
          popupTyp: typ,
          capture: true
        }
      });
      document.dispatchEvent(_popupCreated3);
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
  var nav = document.getElementById("nav-menu");
  if (nav.getAttribute("aria-expanded") === "true") {
    nav.setAttribute("aria-expanded", "false");
  } else {
    nav.setAttribute("aria-expanded", "true");
  }
}
function createMeineDSA() {
  var main = document.querySelector("#main-view");
  main.innerHTML = document.querySelector("#meine-DSA").innerHTML;
  var activeNav = document.querySelector("#active-nav");
  activeNav.setAttribute("style", "transform: translate(0, -165px); visibility: visible");
  var meineDSA = document.querySelector("#nav-meine-dsa");
  selectActiveNav(meineDSA);
}
function createMeineAthleten() {
  var main = document.querySelector("#main-view");
  main.innerHTML = document.querySelector("#meine-Athleten").innerHTML;
  getAllPlayer();
  var activeNav = document.querySelector("#active-nav");
  activeNav.setAttribute("style", "transform: translate(0, -108px); visibility: visible");
  var meineAthleten = document.querySelector("#nav-meine-athleten");
  selectActiveNav(meineAthleten);
  var playerAction = document.getElementById("player-section__header");
  playerAction.addEventListener("click", function (evt) {
    checkAction(evt);
  });
  createAusdauerGraph();
}
function createAusdauerGraph() {}
function changeMeineAthleten(id) {
  _popupPin = true;
  var popUp = document.createElement("change-section-popup");
  var playerCard = document.getElementById(id);
  var fname = playerCard.getAttribute("data-fname");
  var nachname = playerCard.getAttribute("data-lname");
  var lname = playerCard.getAttribute("data-bd");
  var bd = playerCard.getAttribute("data-gender");
  var email = playerCard.getAttribute("data-email");
  popUp.setAttribute("data-fname", fname);
  popUp.setAttribute("data-lname", nachname);
  popUp.setAttribute("data-bd", lname);
  popUp.setAttribute("data-gender", bd);
  popUp.setAttribute("data-email", email);
  popUp.setAttribute("data-id", id);
  _addPlayer = false;
  var main = document.getElementById("main");
  main.appendChild(popUp);
}
function deleteMeineAthleten(id) {
  var playerCard = document.getElementById(id);
  try {
    axios.delete("/athletes/delete/" + id, {}).then(function (response) {
      if (response.status == 200) {
        playerCard.remove();
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createUebungskatalog() {
  var main = document.querySelector("#main-view");
  main.innerHTML = document.querySelector("#uebungskatalog-t").innerHTML;
  var activeNav = document.querySelector("#active-nav");
  activeNav.setAttribute("style", "transform: translate(0, -52px); visibility: visible");
  var uebungskatalog = document.querySelector("#nav-uebungskatalog");
  selectActiveNav(uebungskatalog);
  var uebungskatalogList = document.getElementById("uebungskatalog-list");
  uebungskatalogList.addEventListener("click", uebungskatalogAction);
}
function uebungskatalogAction(evt) {
  var ausdauer = document.getElementById("uebungskatalog-ausdauer-button");
  var kraft = document.getElementById("uebungskatalog-kraft-button");
  var schnelligkeit = document.getElementById("uebungskatalog-schnelligkeit-button");
  var koordination = document.getElementById("uebungskatalog-koordination-button");
  var uebersicht = document.getElementById("uebersicht-section-main");
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
  var detail;
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
  var ausdauerLaufen = document.getElementById("ausdauer-800-meter");
  var ausdauerDauerlaufen = document.getElementById("ausdauer-dauerlauf");
  var ausdauerSchwimmen = document.getElementById("ausdauer-schwimmen");
  var ausdauerRadfahren = document.getElementById("ausdauer-radfahren");
  var kraftWerfen = document.getElementById("kraft-werfen");
  var kraftKugelstoßen = document.getElementById("kraft-kugelstoßen");
  var kraftStandweitsprung = document.getElementById("kraft-standweitsprung");
  var kraftGeräteturnen = document.getElementById("kraft-geräteturnen");
  var schnelligkeitLaufen = document.getElementById("schnelligkeit-laufen");
  var schnelligkeitSchwimmen = document.getElementById("schnelligkeit-25m-schwimmen");
  var schnelligkeitRadfahren = document.getElementById("schnelligkeit-200m-radfahren");
  var schnelligkeitGeräteturnen = document.getElementById("schnelligkeit-geräteturnen");
  var koordinationHochsprung = document.getElementById("koordination-hochsprung");
  var koordinationWeitsprung = document.getElementById("koordination-Weitsprung");
  var koordinationZonenweitsprung = document.getElementById("koordination-Zonenweitsprung");
  var koordinationDrehwurf = document.getElementById("koordination-Drehwurf");
  var koordinationSchleuderball = document.getElementById("koordination-Schleuderball");
  var koordinationSeilsprigen = document.getElementById("koordination-Seilspringen");
  var koordinationGeräteturnen = document.getElementById("koordination-Geräteturnen");
  var detailsTitle = document.getElementById("uebungskatalog-detail-values__title");
  var typ, id;
  if (ausdauerLaufen != null && ausdauerLaufen.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 1;
    detailsTitle.textContent = "Laufen";
  }
  if (ausdauerDauerlaufen != null && ausdauerDauerlaufen.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 2;
    detailsTitle.textContent = "Dauerlaufen";
  }
  if (ausdauerSchwimmen != null && ausdauerSchwimmen.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 3;
    detailsTitle.textContent = "Schwimmen";
  }
  if (ausdauerRadfahren != null && ausdauerRadfahren.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 4;
    detailsTitle.textContent = "Radfahren";
  }
  if (kraftWerfen != null && kraftWerfen.contains(evt.target)) {
    typ = "KRAFT";
    id = 5;
    detailsTitle.textContent = "Werfen";
  }
  if (kraftKugelstoßen != null && kraftKugelstoßen.contains(evt.target)) {
    typ = "KRAFT";
    id = 6;
    detailsTitle.textContent = "Kugelstoßen";
  }
  if (kraftStandweitsprung != null && kraftStandweitsprung.contains(evt.target)) {
    typ = "KRAFT";
    id = 7;
    detailsTitle.textContent = "Standweitsprung";
  }
  if (kraftGeräteturnen != null && kraftGeräteturnen.contains(evt.target)) {
    typ = "KRAFT";
    id = 8;
    detailsTitle.textContent = "Geräteturnen";
  }
  if (schnelligkeitLaufen != null && schnelligkeitLaufen.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 9;
    detailsTitle.textContent = "Laufen";
  }
  if (schnelligkeitSchwimmen != null && schnelligkeitSchwimmen.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 10;
    detailsTitle.textContent = "Schwimmen";
  }
  if (schnelligkeitRadfahren != null && schnelligkeitRadfahren.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 11;
    detailsTitle.textContent = "Radfahren";
  }
  if (schnelligkeitGeräteturnen != null && schnelligkeitGeräteturnen.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 12;
    detailsTitle.textContent = "Geräteturnen";
  }
  if (koordinationHochsprung != null && koordinationHochsprung.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 13;
    detailsTitle.textContent = "Hochsprung";
  }
  if (koordinationWeitsprung != null && koordinationWeitsprung.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 14;
    detailsTitle.textContent = "Weitsprung";
  }
  if (koordinationZonenweitsprung != null && koordinationZonenweitsprung.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 15;
    detailsTitle.textContent = "Zonenweitsprung";
  }
  if (koordinationDrehwurf != null && koordinationDrehwurf.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 16;
    detailsTitle.textContent = "Drehwurf";
  }
  if (koordinationSchleuderball != null && koordinationSchleuderball.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 17;
    detailsTitle.textContent = "Schleuderball";
  }
  if (koordinationSeilsprigen != null && koordinationSeilsprigen.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 18;
    detailsTitle.textContent = "Seilspringen";
  }
  if (koordinationGeräteturnen != null && koordinationGeräteturnen.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 19;
    detailsTitle.textContent = "Geräteturnen";
  }
  axios.get("/athletes/exercises", {}).then(function (response) {
    if (response.status == 200) {
      var _iterator2 = _createForOfIteratorHelper(response.data),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          if (item.id == id) {
            createUebungskatalogDetailTable(item);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  });
}
function createUebungskatalogDetailTable(typ) {
  var mainTable, table, helperTable, tableRow;
  var label = null;
  var detailedSection = document.getElementById("uebungskatalog-detail-values__main");
  document.getElementById("uebungskatalog-detail-values").style.visibility = "visible";
  var tableTemplate = document.getElementById("uebungskatalog-table-value");
  helperTable = document.importNode(tableTemplate.content, true);
  mainTable = helperTable.getElementById("uebungskatalog-table__main");
  table = helperTable.getElementById("uebungskatalog-table__body");
  var details = document.getElementById("uebungskatalog-table__header");
  var _iterator3 = _createForOfIteratorHelper(typ.rule),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var item = _step3.value;
      if (item.label == label) {
        var tableRowTemplate = document.getElementById("tableRow");
        tableRow = document.importNode(tableRowTemplate.content, true);
        if (item.valueBronze != 0) {
          createTableRow(tableRow, item);
        }
      } else if (item.label != label) {
        item.label = label;
        details.textContent += label;
        var _tableTemplate = document.getElementById("uebungskatalog-table-value");
        helperTable = document.importNode(_tableTemplate.content, true);
        mainTable = helperTable.getElementById("uebungskatalog-table__main");
        table = helperTable.getElementById("uebungskatalog-table__body");
        var _tableRowTemplate = document.getElementById("tableRow");
        tableRow = document.importNode(_tableRowTemplate.content, true);
        createTableRow(tableRow, item);
      }
      table.appendChild(tableRow);
      mainTable.appendChild(table);
      console.log(mainTable);
      helperTable.getElementById("main-table-section").replaceChildren(mainTable);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  detailedSection.innerHTML = "";
  detailedSection.appendChild(helperTable);
}
function convertTime(input) {
  var finalTime;
  if (input.length % 2 == 0) {
    finalTime = input[0] + input[1] + ":" + input[2] + input[3];
  } else {
    finalTime = input[0] + ":" + input[1] + input[2];
  }
  return finalTime;
}
function createTableRow(tableRow, item) {
  var convert;
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
  var overview = document.getElementById("playerCard-detail");
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
  }
}
function passOverviewPlayerInfos(overview, playerCard) {
  document.getElementById("overview-player-name").textContent = playerCard.getAttribute("data-fname") + " " + playerCard.getAttribute("data-lname");
  document.getElementById("overview-player-bd").textContent = playerCard.getAttribute("data-bd");
  document.getElementById("overview-player-gender").textContent = playerCard.getAttribute("data-gender");
  document.getElementById("overview-player-email").textContent = playerCard.getAttribute("data-email");
}
function createProfilePopUp() {
  var main = document.getElementById("main");
  var createProfilePopUp = document.createElement("profil-add-popup");
  main.appendChild(createProfilePopUp);
  _addPlayer = true;
  _popupPin = true;
}
customElements.define("player-card", /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this2;
    _classCallCheck(this, _class);
    _this2 = _callSuper(this, _class);
    var template = document.getElementById("playerCard").content;
    var shadowRoot = _this2.attachShadow({
      mode: "open"
    });
    shadowRoot.appendChild(template.cloneNode(true));
    return _this2;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this3 = this;
      var shadowRoot = this.shadowRoot;
      var _this = this;
      var linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", "main.07544d9b.css");
      this.shadowRoot.appendChild(linkElem);
      var userNameShort = this.shadowRoot.querySelector('#user-name-short');
      userNameShort.textContent = this.getAttribute("data-fname")[0] + this.getAttribute("data-lname")[0];
      var userNameFull = this.shadowRoot.querySelector('#user-name-long');
      userNameFull.textContent = this.getAttribute("data-fname") + " " + this.getAttribute("data-lname");
      this.addEventListener("click", function (evt) {
        if (!_popupPin) {
          selectActivePlayerCard(_this3.shadowRoot.getElementById("playerCardDom"), _this3);
        }
      });
      var changeOption = this.shadowRoot.querySelector('#change-option-button');
      changeOption.addEventListener("click", function (evt) {
        evt.stopPropagation();
        var thisId = _this3.getAttribute("id");
        createPopup("change-option", evt, changeOption, thisId);
      });
      this.addEventListener("playerChanged", function (item) {
        _this3.setAttribute("data-fname", item.detail.vorname);
        _this3.setAttribute("data-lname", item.detail.nachname);
        _this3.setAttribute("data-bd", item.detail.geburtstag);
        _this3.setAttribute("data-gender", item.detail.geschlecht);
        _this3.setAttribute("data-email", item.detail.email);
        var userNameShort = _this3.shadowRoot.querySelector('#user-name-short');
        userNameShort.textContent = _this3.getAttribute("data-fname")[0] + _this3.getAttribute("data-lname")[0];
        var userNameFull = _this3.shadowRoot.querySelector('#user-name-long');
        userNameFull.textContent = _this3.getAttribute("data-fname") + " " + _this3.getAttribute("data-lname");
      });
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
customElements.define("profil-add-popup", /*#__PURE__*/function (_HTMLElement2) {
  function _class2() {
    var _this4;
    _classCallCheck(this, _class2);
    _this4 = _callSuper(this, _class2);
    var template = document.getElementById("change-section-popup").content;
    var shadowRoot = _this4.attachShadow({
      mode: "open"
    });
    shadowRoot.appendChild(template.cloneNode(true));
    return _this4;
  }
  _inherits(_class2, _HTMLElement2);
  return _createClass(_class2, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var shadowRoot = this.shadowRoot;
      var popUp = this;
      var linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", "main.07544d9b.css");
      shadowRoot.appendChild(linkElem);
      var popUpIdentifier = shadowRoot.querySelector("#popUp-identifier");
      popUpIdentifier.textContent = "Profil Anlegen";
      shadowRoot.querySelector('#cancelChange').onclick = function closePopUp() {
        _popupPin = false;
        popUp.remove();
      };
      shadowRoot.querySelector('#sendDataButton').onclick = function packData() {
        var thisVorname = shadowRoot.querySelector('#change-section-name').value;
        var thisNachname = shadowRoot.querySelector('#change-section-lastname').value;
        var thisGeburtstag = shadowRoot.querySelector('#change-section-birthday').value;
        var thisGeschlecht = shadowRoot.querySelector('#change-section-gender').value;
        var thisEmail = shadowRoot.querySelector('#change-section-username').value;
        var thisPasswort = shadowRoot.querySelector('#change-section-password').value;
        try {
          axios.post('/athletes/register', {
            firstName: thisVorname,
            lastName: thisNachname,
            dob: thisGeburtstag,
            sex: thisGeschlecht,
            password: thisPasswort,
            email: thisEmail
          }).then(function (response) {
            if (response.status == 200) {
              var playerCreated = new CustomEvent("playerCreated", {
                bubbles: true,
                composed: true,
                detail: {
                  vorname: thisVorname,
                  nachname: thisNachname,
                  geburtstag: thisGeburtstag,
                  geschlecht: thisGeschlecht,
                  email: thisEmail
                }
              });
              document.dispatchEvent(playerCreated);
            }
          });
        } catch (e) {}
        _popupPin = false;
        popUp.remove();
      };
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

// Hier beginnt der Code Snippet für die Webkomponente: Change-section-popup.
customElements.define("change-section-popup", /*#__PURE__*/function (_HTMLElement3) {
  function _class3() {
    var _this5;
    _classCallCheck(this, _class3);
    _this5 = _callSuper(this, _class3);
    var template = document.getElementById("change-section-popup").content;
    var shadowRoot = _this5.attachShadow({
      mode: "open"
    });
    shadowRoot.appendChild(template.cloneNode(true));
    return _this5;
  }
  _inherits(_class3, _HTMLElement3);
  return _createClass(_class3, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", "main.07544d9b.css");
      var shadowRoot = this.shadowRoot;
      var popUp = this;
      shadowRoot.appendChild(linkElem);
      var inputfield = shadowRoot.querySelector("#change-section-name");
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
        var passwordField = shadowRoot.querySelector("#add-player-password");
        passwordField.setAttribute("hidden", "true");
        var usernameField = shadowRoot.querySelector("#add-player-username");
        usernameField.style.gridColumn = 'span 2';
      }
      shadowRoot.querySelector('#cancelChange').onclick = function closePopUp() {
        _popupPin = false;
        popUp.remove();
      };
      shadowRoot.querySelector('#sendDataButton').onclick = function packData() {
        var thisVorname = shadowRoot.querySelector('#change-section-name').value;
        var thisNachname = shadowRoot.querySelector('#change-section-lastname').value;
        var thisGeburtstag = shadowRoot.querySelector('#change-section-birthday').value;
        var thisGeschlecht = shadowRoot.querySelector('#change-section-gender').value;
        var thisEmail = shadowRoot.querySelector('#change-section-username').value;
        var thisId = inputfield.getAttribute("data-id");
        try {
          axios.put("/athletes/update/" + thisId, {
            vorname: thisVorname,
            nachname: thisNachname,
            geburtstag: thisGeburtstag,
            geschlecht: thisGeschlecht,
            email: thisEmail,
            id: thisId
          }).then(function (response) {
            if (response.status == 200) {
              var playerCard = document.getElementById(thisId);
              var playerChanged = new CustomEvent("playerChanged", {
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
          });
        } catch (e) {
          console.log(e);
        }
        _popupPin = false;
        popUp.remove();
      };
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
},{}]},{},["KIzB"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map