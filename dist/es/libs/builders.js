function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import loadMap from "./loadMap";
import initPlatform from "./initPlatform";
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

  var buildMap = function buildMap() {
    if (container && build) {
      // Create a Map
      ret.map = initMap(platform, container, mapOptions, mapTypes, _mapType);
      ret.interaction = initInteraction(ret.map, interactive, useEvents, mapEvents);

      if (includeUI) {
        ret.ui = initDefaultUI(ret.platform, ret.map, includeUI, uiLang);
      } // Adds the grabbing to the document


      initInteractionStyles();
    } else {
      ret.createMap = initMap, ret.createPlatform = initPlatform, ret.createInteraction = initInteraction, ret.createDefaultUI = initDefaultUI, ret.createInteractionStyles = initInteractionStyles;
    }

    return ret;
  };

  return {
    buildMap: buildMap
  };
});