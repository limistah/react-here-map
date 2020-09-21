import hereMapJS from '@limistah/here-map-js'
import defaults from './defaults'
import merge from 'lodash.merge'

// Merges the option with the defaults to create a unison and make required values available
const optionMerger = (options) => merge(defaults, options)

/**
 * Script initialization, bootstraps needed utils for successful running of the library
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.interactive Adds interactive scripts
 * @property {object} options.includeUI Should add the UI scripts
 * @property {string} options.includePlaces Include the places script
 * @param {object} options Items necessary to run the library
 */
const initializer = (options) => {
  const _options = optionMerger(options || {})
  const { VERSION, version, interactive, includeUI, includePlaces } = _options
  // Returns async loading of the component
  // First load the core, to save us reference error if all of the libraries are loaded asynchronously due to race conditions
  return hereMapJS({
    includeUI,
    includePlaces,
    interactive,
    version: version || VERSION
  }).then(() => _options)
}

export default initializer
