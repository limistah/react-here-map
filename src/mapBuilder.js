import init from "./libs/loadMap";
import initPlatform from "./libs/initPlatform";
import initMap from "./libs/initMap";
import initInteraction from "./libs/initInteraction";
import initDefaultUI from "./libs/initDefaultUI";
import initInteractionStyles from "./libs/initInteractionStyles";

/**
 * The whole library is bootstrapped after the initialization is done using the options
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {boolean} options.useEvents Should load map events
 * @property {object} options.mapEvents Map events implementation
 * @property {object} options.mapOptions Options needed to initialize the map
 * @property {boolean} options.interactive Adds interactivity to the MAP
 * @property {boolean} options.includeUI Add UI script to the MAP
 * @property {Node} options.container DOM Element to hold the MAP
 * @property {string} options.uiLang Language of the UI
 * @property {build} options.build Flag to tell if the MAP should be build immediately
 * @property {string} options.appId Here Map APP ID
 * @property {string} options.appCode Here Map APP code
 * @property {string} options.mapType The type of the map to load e.g // "normal.map"
 * @param {object} options Items necessary to run the library
 * @returns {object}
 */

export default async options => {
  const _options = await init(options);
  // Get values from the options
  const {
    appId,
    appCode,
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
    build
  } = _options;

  const _mapType = mapType || MAP_TYPE;
  let ret = {
    options: _options,
    createMap: initMap,
    createPlatform: initPlatform,
    createInteraction: initInteraction,
    createDefaultUI: initDefaultUI,
    createInteractionStyles: initInteractionStyles
  };
  if (container && build) {
    // Create the platform
    ret.platform = initPlatform(appId, appCode);
    // Create a Map
    ret.map = initMap(ret.platform, container, mapOptions, mapTypes, _mapType);
    ret.interaction = initInteraction(
      ret.map,
      interactive,
      useEvents,
      mapEvents
    );
    if (includeUI) {
      ret.ui = initDefaultUI(ret.platform, ret.map, includeUI, uiLang);
    }
    // Adds the grabbing to the document
    initInteractionStyles();
  }
  return ret;
};
