import scriptjs from "scriptjs";
import merge from "merge";
import defaults from "./defaults";

const { VERSION, mapTypes, mapEvents, MAP_TYPE } = defaults;
// Function that does really nothing, still it is a function, and has its right!
const noop = () => {};

/**
 *
 * @param {string} version Version of the api to use, defaults to > v3
 */
const buildScriptURLs = (version = VERSION) => [
  `http://js.api.here.com/${version}/mapsjs-service.js`, // Service
  `http://js.api.here.com/${version}/mapsjs-mapevents.js` // Events
];

// Holds event names already mapped to a noop function
let mappedEvents = {};

mapEvents.map(name => (mappedEvents[name] = noop));

const optionMerger = options =>
  merge(options, {
    version: VERSION,
    useEvents: false,
    events: {},
    mapTypes,
    mapType: MAP_TYPE
  });

/**
 * Script initialization, bootstraps needed utils for successful running of the library
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.useEvents Should load map events
 * @property {object} options.events Map events implementation
 * @property {string} options.appId Here Map APP ID
 * @property {string} options.appCode Here Map APP code
 * @param {object} options Items necessary to run the library
 * @param {function} doneLoading Callled after the scripts has been loaded
 */
const initializer = (options, doneLoading = noop) => {
  const _options = optionMerger(options || {});
  const { version, appId, appCode, useEvents } = _options;
  // Checks of option is not set.
  if (!appId || !appCode) {
    throw new Error("Options should contain appId and appCode");
  }
  const urls = buildScriptURLs(version || VERSION);

  const coreURL = `http://js.api.here.com/${version}/mapsjs-core.js`;
  // First let us remove the events if it is not needed. PERFORMANCE!!!
  !useEvents ? urls.splice(2, 1) : null;
  // Returns async loading of the component
  scriptjs(coreURL, () => scriptjs(urls, doneLoading.bind(null, _options)));
};

export default initializer;
