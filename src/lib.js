import init from "./loadMap";
import initPlatform from "./libs/initPlatform";
import initMap from "./libs/initMap";
import initInteraction from "./libs/initInteraction";
import initDefaultUI from "./libs/initDefaultUI";
import initInteractionStyles from "./libs/initInteractionStyles";

/**
 * The whole library is bootstrapped after the initialization is done using the options
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.useEvents Should load map events
 * @property {object} options.events Map events implementation
 * @property {string} options.appId Here Map APP ID
 * @property {string} options.appCode Here Map APP code
 * @property {string} options.mapType The type of the map to load e.g // "normal.map"
 * @param {object} options Items necessary to run the library
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
    container
  } = _options;

  const _mapType = mapType || MAP_TYPE;
  // Create the platform
  const platform = initPlatform(appId, appCode);
  // Create a Map
  const map = initMap(platform, container, mapOptions, mapTypes, _mapType);
  const interaction = initInteraction(map, interactive, useEvents, mapEvents);

  const ui = initDefaultUI(platform, map, includeUI);
  // Adds the grabbing to the document
  initInteractionStyles();
  return {
    options: _options,
    platform,
    map,
    interaction,
    ui,
    createMap: initMap,
    createPlatform: initPlatform,
    createInteraction: initInteraction
  };
};
