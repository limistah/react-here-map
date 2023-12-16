import initMap from './initMap';
import initInteraction from './initInteraction';
import initDefaultUI from './initDefaultUI';
import initInteractionStyles from './initInteractionStyles';

import dotProp from 'dot-prop';
import { validateMapType } from './validateMapType';
import { MAP_TYPES } from './defaults';

export default (platform, container, mapOptions, mapType: MAP_TYPES) => {
  validateMapType(mapType);
  // Get all the default layers so we can set which to use based on the map type
  const defaultLayers = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  return new H.Map(container, dotProp.get(defaultLayers, mapType), mapOptions);
};

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
export const buildMap = (platform, options) => {
  // Get values from the options
  const {
    useEvents,
    mapEvents,
    interactive,
    includeUI,
    mapType,
    MAP_TYPE,
    mapTypes,
    mapOptions,
    uiLang,
    container,
    build,
  } = options;

  const _mapType = mapType || MAP_TYPE;

  let ret = { options: { ...options, MAP_TYPE: _mapType }, platform };

  if (container && build) {
    // Create a Map
    ret.map = initMap(platform, container, mapOptions, mapTypes, _mapType);
    ret.interaction = initInteraction(
      ret.map,
      interactive,
      useEvents,
      mapEvents
    );
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
};
