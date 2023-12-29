function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import initMap from "./initMap";
import initInteraction from "./initInteraction";
import initDefaultUI from "./initDefaultUI";
import initInteractionStyles from "./initInteractionStyles";

/**
 * The whole library is bootstrapped after the initialization is done using the options
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.VERSION Default version Defaults to v3
 * @property {object} options.mapEvents Map events implementation
 * @property {object} options.mapOptions Options needed to initialize the map
 * @property {object} options.platformOptions Options needed to initialize the map
 * @property {boolean} options.interactive Adds interactivity to the MAP
 * @property {boolean} options.useEvents Adds event handling to the map
 * @property {boolean} options.includeUI Add UI script to the MAP
 * @property {boolean} options.build Determines if the map should be built
 * @property {Node} options.container DOM Element to hold the MAP
 * @property {string} options.uiLang Language of the UI
 * @property {build} options.build Flag to tell if the MAP should be build immediately
 * @property {string} options.appId Here Map APP ID
 * @property {string} options.appCode Here Map APP code
 * @property {string} options.mapType The type of the map to load e.g // "normal.map"
 * @property {string} options.MAP_TYPE Default map type to load "normal.map"
 * @param {object} options Items necessary to run the library
 * @returns {object}
 */
export default (function (platform, options) {
  // Get values from the options
  var useEvents = options.useEvents,
    mapEvents = options.mapEvents,
    interactive = options.interactive,
    includeUI = options.includeUI,
    mapType = options.mapType,
    MAP_TYPE = options.MAP_TYPE,
    mapTypes = options.mapTypes,
    mapOptions = options.mapOptions,
    uiLang = options.uiLang,
    container = options.container,
    build = options.build;
  var _mapType = mapType || MAP_TYPE;
  var ret = {
    options: _objectSpread(_objectSpread({}, options), {}, {
      MAP_TYPE: _mapType
    }),
    platform: platform
  };
  if (container && build) {
    // Create a Map
    ret.map = initMap(platform, container, mapOptions, mapTypes, _mapType);
    ret.interaction = initInteraction(ret.map, interactive, useEvents, mapEvents);
    if (includeUI) {
      ret.ui = initDefaultUI(platform, ret.map, includeUI, uiLang);
    }
    // Adds the grabbing to the document
    initInteractionStyles();
  } else {
    ret.createMap = initMap;
    ret.createPlatform = initPlatform;
    ret.createInteraction = initInteraction;
    ret.createDefaultUI = initDefaultUI;
    ret.createInteractionStyles = initInteractionStyles;
  }
  return ret;
});