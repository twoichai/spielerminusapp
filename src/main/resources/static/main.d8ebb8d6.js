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
var _currentTableId;
var _currentTableMetric;
var _currentTableInEdit;
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
  var thirdButton;
  var forthButton;
  var fithtButton;
  var sixthButton;
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
function filterPlayerLastNameAscend() {
  var _document$getElementB3;
  var currentPlayerList = document.getElementById("player-list").childNodes;
  var updatedPlayerList = Array.from(currentPlayerList).sort(function (firstElement, lastElement) {
    var _firstElement$dataset2;
    var nameComparison = firstElement.dataset.lname.localeCompare(lastElement.dataset.lname);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return ((_firstElement$dataset2 = firstElement.dataset.fname) === null || _firstElement$dataset2 === void 0 ? void 0 : _firstElement$dataset2.localeCompare(lastElement.dataset.fname)) || -1;
  });
  (_document$getElementB3 = document.getElementById("player-list")).replaceChildren.apply(_document$getElementB3, _toConsumableArray(updatedPlayerList));
}
function filterPlayerLastNameDescend() {
  var _document$getElementB4;
  var currentPlayerList = document.getElementById("player-list").childNodes;
  var updatedPlayerList = Array.from(currentPlayerList).sort(function (firstElement, lastElement) {
    var _lastElement$dataset$2;
    var nameComparison = lastElement.dataset.lname.localeCompare(firstElement.dataset.lname);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return ((_lastElement$dataset$2 = lastElement.dataset.fname) === null || _lastElement$dataset$2 === void 0 ? void 0 : _lastElement$dataset$2.localeCompare(firstElement.dataset.fname)) || 1;
  });
  (_document$getElementB4 = document.getElementById("player-list")).replaceChildren.apply(_document$getElementB4, _toConsumableArray(updatedPlayerList));
}
function filterPlayerBirthdayAscend() {
  var _document$getElementB5;
  var currentPlayerList = document.getElementById("player-list").childNodes;
  var updatedPlayerList = Array.from(currentPlayerList).sort(function (firstElement, lastElement) {
    var _firstElement$dataset3;
    var dateComparison = firstElement.dataset.bd.localeCompare(lastElement.dataset.bd);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return ((_firstElement$dataset3 = firstElement.dataset.fname) === null || _firstElement$dataset3 === void 0 ? void 0 : _firstElement$dataset3.localeCompare(lastElement.dataset.fname)) || -1;
  });
  (_document$getElementB5 = document.getElementById("player-list")).replaceChildren.apply(_document$getElementB5, _toConsumableArray(updatedPlayerList));
}
function filterPlayerBirthdayDescend() {
  var _document$getElementB6;
  var currentPlayerList = document.getElementById("player-list").children;
  var updatedPlayerList = Array.from(currentPlayerList).sort(function (firstElement, lastElement) {
    var dateComparison = lastElement.dataset.bd.localeCompare(firstElement.dataset.bd);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return lastElement.dataset.fname.localeCompare(firstElement.dataset.fname);
  });
  (_document$getElementB6 = document.getElementById("player-list")).replaceChildren.apply(_document$getElementB6, _toConsumableArray(updatedPlayerList));
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
function selectActiveUebungskatalog(list, element) {
  var _iterator2 = _createForOfIteratorHelper(list),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var item = _step2.value;
      if (item.nodeType != Node.TEXT_NODE) {
        var helper = item.querySelector(".uebungskatalog-list__button");
        if (element != helper || element == _uebungskatalogCurrentActiv) {
          helper.setAttribute("data-active", "false");
        } else {
          element.setAttribute("data-active", true);
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function uebungskatalogAction(evt) {
  var ausdauer = document.getElementById("uebungskatalog-ausdauer-button");
  var kraft = document.getElementById("uebungskatalog-kraft-button");
  var schnelligkeit = document.getElementById("uebungskatalog-schnelligkeit-button");
  var koordination = document.getElementById("uebungskatalog-koordination-button");
  var uebersicht = document.getElementById("uebersicht-section-main");
  var details = document.getElementById("uebungskatalog-detail-values");
  var list = document.getElementById("uebungskatalog-list");
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
  var kraftKugelstossen = document.getElementById("kraft-kugelstossen");
  var kraftStandweitsprung = document.getElementById("kraft-standweitsprung");
  var kraftGeraeteturnen = document.getElementById("kraft-geraeteturnen");
  var schnelligkeitLaufen = document.getElementById("schnelligkeit-laufen");
  var schnelligkeitSchwimmen = document.getElementById("schnelligkeit-25m-schwimmen");
  var schnelligkeitRadfahren = document.getElementById("schnelligkeit-200m-radfahren");
  var schnelligkeitGeraeteturnen = document.getElementById("schnelligkeit-geraeteturnen");
  var koordinationHochsprung = document.getElementById("koordination-hochsprung");
  var koordinationWeitsprung = document.getElementById("koordination-Weitsprung");
  var koordinationZonenweitsprung = document.getElementById("koordination-Zonenweitsprung");
  var koordinationDrehwurf = document.getElementById("koordination-Drehwurf");
  var koordinationSchleuderball = document.getElementById("koordination-Schleuderball");
  var koordinationSeilsprigen = document.getElementById("koordination-Seilspringen");
  var koordinationGeraeteturnen = document.getElementById("koordination-Geraeteturnen");
  var detailsTitle = document.getElementById("uebungskatalog-detail-values__title");
  var list = document.getElementById("uebungskatalog-details-list");
  /*const changePopup = document.createElement("change-table-popup");*/

  var typ, id;
  if (ausdauerLaufen != null && ausdauerLaufen.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 1;
    detailsTitle.textContent = "Laufen";
    selectActiveUebungskatalog(list.childNodes, ausdauerLaufen);
    /*changePopup.getElementById("change-table-exercise-value").textContent = "800-Meter Laufen"*/
  }
  if (ausdauerDauerlaufen != null && ausdauerDauerlaufen.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 2;
    detailsTitle.textContent = "Dauerlaufen";
    selectActiveUebungskatalog(list.childNodes, ausdauerDauerlaufen);
  }
  if (ausdauerSchwimmen != null && ausdauerSchwimmen.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 3;
    detailsTitle.textContent = "Schwimmen";
    selectActiveUebungskatalog(list.childNodes, ausdauerSchwimmen);
  }
  if (ausdauerRadfahren != null && ausdauerRadfahren.contains(evt.target)) {
    typ = "AUSDAUER";
    id = 4;
    detailsTitle.textContent = "Radfahren";
    selectActiveUebungskatalog(list.childNodes, ausdauerRadfahren);
  }
  if (kraftWerfen != null && kraftWerfen.contains(evt.target)) {
    typ = "KRAFT";
    id = 5;
    detailsTitle.textContent = "Werfen";
    selectActiveUebungskatalog(list.childNodes, kraftWerfen);
  }
  if (kraftKugelstossen != null && kraftKugelstossen.contains(evt.target)) {
    typ = "KRAFT";
    id = 6;
    detailsTitle.textContent = "Kugelstoßen";
    selectActiveUebungskatalog(list.childNodes, kraftKugelstossen);
  }
  if (kraftStandweitsprung != null && kraftStandweitsprung.contains(evt.target)) {
    typ = "KRAFT";
    id = 7;
    detailsTitle.textContent = "Standweitsprung";
    selectActiveUebungskatalog(list.childNodes, kraftStandweitsprung);
  }
  if (kraftGeraeteturnen != null && kraftGeraeteturnen.contains(evt.target)) {
    typ = "KRAFT";
    id = 8;
    detailsTitle.textContent = "Geräteturnen";
    selectActiveUebungskatalog(list.childNodes, kraftGeraeteturnen);
  }
  if (schnelligkeitLaufen != null && schnelligkeitLaufen.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 9;
    detailsTitle.textContent = "Laufen";
    selectActiveUebungskatalog(list.childNodes, schnelligkeitLaufen);
  }
  if (schnelligkeitSchwimmen != null && schnelligkeitSchwimmen.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 10;
    detailsTitle.textContent = "Schwimmen";
    selectActiveUebungskatalog(list.childNodes, schnelligkeitSchwimmen);
  }
  if (schnelligkeitRadfahren != null && schnelligkeitRadfahren.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 11;
    detailsTitle.textContent = "Radfahren";
    selectActiveUebungskatalog(list.childNodes, schnelligkeitRadfahren);
  }
  if (schnelligkeitGeraeteturnen != null && schnelligkeitGeraeteturnen.contains(evt.target)) {
    typ = "SCHNELLIGKEIT";
    id = 12;
    detailsTitle.textContent = "Geräteturnen";
    selectActiveUebungskatalog(list.childNodes, schnelligkeitGeraeteturnen);
  }
  if (koordinationHochsprung != null && koordinationHochsprung.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 13;
    detailsTitle.textContent = "Hochsprung";
    selectActiveUebungskatalog(list.childNodes, koordinationHochsprung);
  }
  if (koordinationWeitsprung != null && koordinationWeitsprung.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 14;
    detailsTitle.textContent = "Weitsprung";
    selectActiveUebungskatalog(list.childNodes, koordinationWeitsprung);
  }
  if (koordinationZonenweitsprung != null && koordinationZonenweitsprung.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 15;
    detailsTitle.textContent = "Zonenweitsprung";
    selectActiveUebungskatalog(list.childNodes, koordinationZonenweitsprung);
  }
  if (koordinationDrehwurf != null && koordinationDrehwurf.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 16;
    detailsTitle.textContent = "Drehwurf";
    selectActiveUebungskatalog(list.childNodes, koordinationDrehwurf);
  }
  if (koordinationSchleuderball != null && koordinationSchleuderball.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 17;
    detailsTitle.textContent = "Schleuderball";
    selectActiveUebungskatalog(list.childNodes, koordinationSchleuderball);
  }
  if (koordinationSeilsprigen != null && koordinationSeilsprigen.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 18;
    detailsTitle.textContent = "Seilspringen";
    selectActiveUebungskatalog(list.childNodes, koordinationSeilsprigen);
  }
  if (koordinationGeraeteturnen != null && koordinationGeraeteturnen.contains(evt.target)) {
    typ = "KOORDINATION";
    id = 19;
    detailsTitle.textContent = "Geräteturnen";
    selectActiveUebungskatalog(list.childNodes, koordinationGeraeteturnen);
  }
  axios.get("/athletes/exercises", {}).then(function (response) {
    if (response.status == 200) {
      var _iterator3 = _createForOfIteratorHelper(response.data),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;
          if (item.id == id) {
            createUebungskatalogDetailTable(item);
            _currentTableInEdit = id;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  });
}
function createUebungskatalogDetailTable(typ) {
  var tableMain, tableBody, table, tableRow, helperTable, helperButton;
  var checker = false;
  helperButton = document.getElementById("tableChangeButton");
  var tableChangeButton = document.importNode(helperButton.content, true);
  var showTable = document.createElement("div");
  showTable.setAttribute("id", "main-table-with-data");
  var label = 1;
  var counter = 0;
  var counterSecond = 0;
  var metric = typ.rule.metric;
  var detailedSection = document.getElementById("uebungskatalog-detail-values__main");
  document.getElementById("uebungskatalog-detail-values").style.display = "block";
  var _iterator4 = _createForOfIteratorHelper(typ.rule),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var item = _step4.value;
      counter++;
      if (item.label == label) {
        var tableRowTemplate = document.getElementById("tableRow");
        tableRow = document.importNode(tableRowTemplate.content, true);
        createTableRow(tableRow, item);
        if (counter % 2 == 0) {
          tableRow.querySelector(".row").setAttribute("class", "white-background");
        }
        tableBody.appendChild(tableRow);
        tableMain.appendChild(tableBody);
        table.getElementById("main-table-section").appendChild(tableMain);
        checker = true;
      } else if (item.label != label) {
        if (checker == true) {
          helperTable = table.cloneNode(true);
          showTable.appendChild(helperTable);
          if (metric != "POINTS") {
            helperButton = tableChangeButton.cloneNode(true);
            showTable.appendChild(helperButton);
          }
          checker = false;
        }
        var tableTemplate = document.getElementById("uebungskatalog-table-value");
        table = document.importNode(tableTemplate.content, true);
        table.querySelector(".uebungskatalog-table__wrapper").setAttribute("id", item.id);
        tableChangeButton.querySelector(".change-section__save-button").setAttribute("data-id", item.id);
        _currentTableMetric = item.metric;
        tableChangeButton.querySelector(".change-section__save-button").setAttribute("id", counterSecond + 200);
        counterSecond++;
        console.log(item.label);
        label = item.label;
        table.getElementById("uebungskatalog-table__header").textContent = label;
        if (label != null) {
          table.getElementById("uebungskatalog-table__details").style.display = "flex";
        }
        tableMain = table.getElementById("uebungskatalog-table__main");
        tableBody = table.getElementById("uebungskatalog-table__body");
        var _tableRowTemplate = document.getElementById("tableRow");
        tableRow = document.importNode(_tableRowTemplate.content, true);
        createTableRow(tableRow, item);
        if (counter % 2 == 0) {
          tableRow.querySelector(".row").setAttribute("class", "white-background");
        }
        tableBody.appendChild(tableRow);
        tableMain.appendChild(tableBody);
        table.getElementById("main-table-section").appendChild(tableMain);
        checker = true;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  if (checker) {
    helperTable = table.cloneNode(true);
    showTable.appendChild(helperTable);
    if (metric != "POINTS") {
      helperButton = tableChangeButton.cloneNode(true);
      showTable.appendChild(helperButton);
    }
  }
  detailedSection.innerHTML = "";
  showTable.addEventListener("click", checkTableAction);
  detailedSection.appendChild(showTable);
}
function checkTableAction(evt) {
  var fButton, sButton, tButton, ftButton;
  fButton = document.getElementById("200");
  sButton = document.getElementById("201");
  tButton = document.getElementById("202");
  ftButton = document.getElementById("203");
  if (fButton != null && fButton.contains(evt.target)) {
    createTablePopup(fButton);
  }
  if (sButton != null && sButton.contains(evt.target)) {
    createTablePopup(sButton);
  }
  if (tButton != null && tButton.contains(evt.target)) {
    createTablePopup(tButton);
  }
  if (ftButton != null && ftButton.contains(evt.target)) {
    createTablePopup(ftButton);
  }
}
function createTablePopup(button) {
  var id = button.getAttribute("data-id");
  var table = document.getElementById(id);
  var body = table.querySelector("#main-table-section");
  var popup = document.createElement("change-table-popup");
  var main = document.getElementById("main");
  _currentTableId = button.getAttribute("data-id");
  _popupPin = true;
  main.appendChild(popup);
  popup.setAttribute("data-id", id);
}
function convertTime(input, metric) {
  var finalTime;
  if (metric == "MINUTEN") {
    if (input.length % 2 == 0) {
      finalTime = input[0] + input[1] + ":" + input[2] + input[3];
    } else {
      finalTime = input[0] + ":" + input[1] + input[2];
    }
  }
  if (metric == "METER") {
    if (input.length % 2 == 0) {
      finalTime = input[0] + input[1] + "," + input[2] + input[3];
    } else {
      finalTime = input[0] + "," + input[1] + input[2];
    }
  }
  if (metric == "SEKUNDEN") {
    if (input.length % 2 == 0) {
      finalTime = input[0] + "," + input[1];
    } else {
      finalTime = input[0] + input[1] + "," + input[2];
    }
  }
  if (metric == "ANZAHL" || metric == "PUNKTE" || metric == "CENTIMETER" || metric == "DEZISEKUNDEN" || metric == "GESAMTPUNKTE") {
    return input;
  }
  return finalTime;
}
function createTableRow(tableRow, item) {
  var convert;
  tableRow.getElementById("age").textContent = String(item.fromAge) + " - " + String(item.toAge);
  tableRow.getElementById("gender").textContent = item.gender;
  tableRow.getElementById("metric").textContent = item.metric;
  tableRow.querySelector(".row").setAttribute("data-set-id", item.id);
  if (item.valueBronze > 0) {
    converter = convertTime(item.valueBronze.toString(), item.metric);
    tableRow.getElementById("bronze").textContent = converter;
    converter = convertTime(item.valueSilver.toString(), item.metric);
    tableRow.getElementById("silver").textContent = converter;
    converter = convertTime(item.valueGold.toString(), item.metric);
    tableRow.getElementById("gold").textContent = converter;
  } else {
    tableRow.getElementById("bronze").textContent = "";
    tableRow.getElementById("silver").textContent = "";
    tableRow.getElementById("gold").textContent = "";
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
            email: thisEmail,
            role: "ATHLETE"
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
        } catch (e) {
          console.log(e);
        }
        _popupPin = false;
        popUp.remove();
      };
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
customElements.define("change-table-popup", /*#__PURE__*/function (_HTMLElement3) {
  function _class3() {
    var _this5;
    _classCallCheck(this, _class3);
    _this5 = _callSuper(this, _class3);
    var template = document.getElementById("change-table-popup").content;
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
      var _this6 = this;
      var shadowRoot = this.shadowRoot;
      var popUp = this;
      var linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", "main.07544d9b.css");
      shadowRoot.appendChild(linkElem);
      fillUpContent(shadowRoot, "6 - 7");
      shadowRoot.querySelector('#cancel-change').onclick = function closePopUp() {
        _popupPin = false;
        popUp.remove();
      };
      fillUpContent(shadowRoot, "6 - 7", "M");
      shadowRoot.querySelector('#change-table-gender').addEventListener("change", function (evt) {
        var selectedAgeOption = shadowRoot.querySelector("#change-table-age").value;
        _this6.setAttribute("data-id", fillUpContent(shadowRoot, selectedAgeOption, evt.target.value));
      });
      shadowRoot.querySelector('#change-table-age').addEventListener("change", function (evt) {
        var selectedGenderOption = shadowRoot.querySelector('#change-table-gender').value;
        _this6.setAttribute("data-id", fillUpContent(shadowRoot, evt.target.value, selectedGenderOption));
      });
      shadowRoot.querySelector('#send-table-button').addEventListener("click", function (evt) {
        var id = _this6.getAttribute("data-id");
        var thisValueBronze = shadowRoot.querySelector('#change-table-bronze-value').value;
        var thisValueSilver = shadowRoot.querySelector('#change-table-silver-value').value;
        var thisValueGold = shadowRoot.querySelector('#change-table-gold-value').value;
        var thisMetric = shadowRoot.querySelector('#change-table-metric').value;
        console.log(checkInputField(shadowRoot));
        if (checkInputField(shadowRoot)) {
          thisValueBronze = reOrder(thisValueBronze);
          thisValueSilver = reOrder(thisValueSilver);
          thisValueGold = reOrder(thisValueGold);
          {
            try {
              axios.put("/rules/update/" + id, {
                valueGold: thisValueGold,
                valueSilver: thisValueSilver,
                valueBronze: thisValueBronze
              }).then(function (response) {
                if (response.status == 200) {
                  popUp.remove();
                  axios.get("/athletes/exercises", {}).then(function (response) {
                    if (response.status == 200) {
                      var _iterator5 = _createForOfIteratorHelper(response.data),
                        _step5;
                      try {
                        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                          var item = _step5.value;
                          if (item.id == _currentTableInEdit) {
                            createUebungskatalogDetailTable(item);
                          }
                        }
                      } catch (err) {
                        _iterator5.e(err);
                      } finally {
                        _iterator5.f();
                      }
                    }
                  });
                }
              });
            } catch (e) {
              alert(e);
            }
          }
        } else {
          alert("Die Werte wurden nicht an der Einheit angepasst: Minuten: tt:tt | Meter: m,mm | Alles andere: wwww");
        }
      });
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
function fillUpContent(popup, age, gender) {
  var tableMetric = popup.querySelector("#table-metric");
  var tableBronze = popup.querySelector("#change-table-bronze-value");
  var tableSilver = popup.querySelector("#change-table-silver-value");
  var tableGold = popup.querySelector("#change-table-gold-value");
  var table = document.getElementById(_currentTableId).querySelector("#uebungskatalog-table__body");
  tableMetric.setAttribute("value", _currentTableMetric);
  tableMetric.textContent = _currentTableMetric;
  return fillUpTableAge(table, gender, age, tableBronze, tableSilver, tableGold);
}
function fillUpTableAge(table, gender, age, tableBronze, tableSilver, tableGold) {
  var tableRowAge, helper;
  tableBronze.setAttribute("value", "");
  tableSilver.setAttribute("value", "");
  tableGold.setAttribute("value", "");
  var _iterator6 = _createForOfIteratorHelper(table.childNodes),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var item = _step6.value;
      var option = document.createElement("option");
      if (item.nodeType != Node.TEXT_NODE) {
        helper = item.childNodes[3].textContent;
        if (helper == gender) {
          tableRowAge = item.childNodes[1].textContent;
          if (tableRowAge == age) {
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
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
}
function reOrder(str) {
  var word = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] != ':' && str[i] != ',') {
      word += str[i];
    }
  }
  console.log(word);
  return word;
}
function checkInputField(popup) {
  var bronzeValue = popup.querySelector('#change-table-bronze-value').value;
  var silverValue = popup.querySelector('#change-table-silver-value').value;
  var goldValue = popup.querySelector('#change-table-gold-value').value;
  var metric = popup.querySelector('#change-table-metric').value;
  if (metric == "ANZAHL" || metric == "PUNKTE" || metric === "CENTIMETER" || metric == "DEZISEKUNDEN" || metric == "GESAMTPUNKTE") {
    if (containsOnlyDigits(bronzeValue) && containsOnlyDigits(silverValue) && containsOnlyDigits(goldValue)) {
      if (firstIsNumber(bronzeValue) && firstIsNumber(silverValue) && firstIsNumber(goldValue)) {
        if (bronzeValue.length <= 4 && silverValue.length <= 4 && goldValue.length <= 4) return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  if (metric == "MINUTEN") {
    if (firstIsNumber(bronzeValue) && firstIsNumber(silverValue) && firstIsNumber(goldValue)) {
      console.log("first");
      if (containsOnlyDigits(reOrder(bronzeValue)) && containsOnlyDigits(reOrder(silverValue)) && containsOnlyDigits(reOrder(goldValue))) {
        console.log("contains");
        if (reOrder(bronzeValue).length < 5 && reOrder(silverValue).length < 5 && reOrder(goldValue).length < 5) {
          console.log("bronze");
          return true;
        }
      }
    }
  }
  if (metric == "METER") {
    if (firstIsNumber(bronzeValue) && firstIsNumber(silverValue) && firstIsNumber(goldValue)) {
      if (containsOnlyDigits(reOrder(bronzeValue)) && containsOnlyDigits(reOrder(silverValue)) && containsOnlyDigits(reOrder(goldValue))) {
        if (reOrder(bronzeValue).length < 4 && reOrder(silverValue).length < 4 && reOrder(goldValue).length < 4) {
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
  if (containsOnlyDigits(str[0]) && str[0] > 0) {
    return true;
  } else {
    return false;
  }
}
function convertTime(input, metric) {
  var finalTime;
  if (metric == "MINUTEN") {
    if (input.length % 2 == 0) {
      finalTime = input[0] + input[1] + ":" + input[2] + input[3];
    } else {
      finalTime = input[0] + ":" + input[1] + input[2];
    }
  }
  if (metric == "METER") {
    if (input.length % 2 == 0) {
      finalTime = input[0] + input[1] + "," + input[2] + input[3];
    } else {
      finalTime = input[0] + "," + input[1] + input[2];
    }
  }
  if (metric == "SEKUNDEN") {
    if (input.length % 2 == 0) {
      finalTime = input[0] + "," + input[1];
    } else {
      finalTime = input[0] + input[1] + "," + input[2];
    }
  }
  if (metric == "ANZAHL" || metric == "PUNKTE" || metric == "CENTIMETER" || metric == "DEZISEKUNDEN" || metric == "GESAMTPUNKTE") {
    return input;
  }
  return finalTime;
}

// Hier beginnt der Code Snippet für die Webkomponente: Change-section-popup.
customElements.define("change-section-popup", /*#__PURE__*/function (_HTMLElement4) {
  function _class4() {
    var _this7;
    _classCallCheck(this, _class4);
    _this7 = _callSuper(this, _class4);
    var template = document.getElementById("change-section-popup").content;
    var shadowRoot = _this7.attachShadow({
      mode: "open"
    });
    shadowRoot.appendChild(template.cloneNode(true));
    return _this7;
  }
  _inherits(_class4, _HTMLElement4);
  return _createClass(_class4, [{
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
          axios.put('/athletes/update/' + thisId, {
            id: thisId,
            firstName: thisVorname,
            lastName: thisNachname,
            dob: thisGeburtstag,
            sex: thisGeschlecht,
            email: thisEmail
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