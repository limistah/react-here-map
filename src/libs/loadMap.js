import merge from "lodash.merge";
import hereMapJS from "@limistah/here-map-js";
import defaults from "./defaults";

// Merges the option with the defaults to create a unison and make required values available
const optionMerger = options => merge(defaults, options);

/**
 * Script initialization, bootstraps needed utils for successful running of the library
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.useEvents Should load map events
 * @property {object} options.events Map events implementation
 * @property {string} options.appId Here Map APP ID
 * @property {string} options.appCode Here Map APP code
 * @param {object} options Items necessary to run the library
 */
const initializer = options => {
  const _options = optionMerger(options || {});
  console.log(_options);
  const { VERSION, version, interactive, includeUI } = _options;

  // Returns async loading of the component
  // First load the core, to save us reference error if all of the libraries are loaded asynchronously due to race conditions
  return hereMapJS({
    includeUI,
    interactive,
    version: version || VERSION
  }).then(() => _options);
};

export default initializer;
