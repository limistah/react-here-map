"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _initMap = _interopRequireDefault(require("./initMap"));

var _initInteraction = _interopRequireDefault(require("./initInteraction"));

var _initDefaultUI = _interopRequireDefault(require("./initDefaultUI"));

var _initInteractionStyles = _interopRequireDefault(
  require("./initInteractionStyles")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

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
var _default = function _default(platform, options) {
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
    options: _objectSpread({}, options, {
      MAP_TYPE: _mapType
    }),
    platform: platform
  };

  if (container && build) {
    // Create a Map
    ret.map = (0, _initMap.default)(
      platform,
      container,
      mapOptions,
      mapTypes,
      _mapType
    );
    ret.interaction = (0, _initInteraction.default)(
      ret.map,
      interactive,
      useEvents,
      mapEvents
    );

    if (includeUI) {
      ret.ui = (0, _initDefaultUI.default)(
        platform,
        ret.map,
        includeUI,
        uiLang
      );
    } // Adds the grabbing to the document

    (0, _initInteractionStyles.default)();
  } else {
    ret.createMap = _initMap.default;
    ret.createPlatform = initPlatform;
    ret.createInteraction = _initInteraction.default;
    ret.createDefaultUI = _initDefaultUI.default;
    ret.createInteractionStyles = _initInteractionStyles.default;
  }

  return ret;
};

exports.default = _default;
