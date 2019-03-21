"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hereMapJs = _interopRequireDefault(require("@limistah/here-map-js"));

var _defaults = _interopRequireDefault(require("./defaults"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Merges the option with the defaults to create a unison and make required values available
var optionMerger = function optionMerger(options) {
  return (0, _lodash.default)(_defaults.default, options);
};
/**
 * Script initialization, bootstraps needed utils for successful running of the library
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.interactive Adds interactive scripts
 * @property {object} options.includeUI Should add the UI scripts
 * @property {string} options.includePlaces Include the places script
 * @param {object} options Items necessary to run the library
 */

var initializer = function initializer(options) {
  var _options = optionMerger(options || {});

  var VERSION = _options.VERSION,
    version = _options.version,
    interactive = _options.interactive,
    includeUI = _options.includeUI,
    includePlaces = _options.includePlaces; // Returns async loading of the component
  // First load the core, to save us reference error if all of the libraries are loaded asynchronously due to race conditions

  return (0, _hereMapJs.default)({
    includeUI: includeUI,
    includePlaces: includePlaces,
    interactive: interactive,
    version: version || VERSION
  }).then(function() {
    return _options;
  });
};

var _default = initializer;
exports.default = _default;
