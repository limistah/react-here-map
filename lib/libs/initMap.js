"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotProp = _interopRequireDefault(require("dot-prop"));

var _validateMapType = _interopRequireDefault(require("./validateMapType"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = function _default(
  platform,
  container,
  mapOptions,
  mapTypes,
  mapType
) {
  (0, _validateMapType.default)(mapTypes, mapType); // Get all the default layers so we can set which to use based on the map type

  var defaultLayers = platform.createDefaultLayers(); // Instantiate (and display) a map object:

  return new H.Map(
    container,
    _dotProp.default.get(defaultLayers, mapType),
    mapOptions
  );
};

exports.default = _default;
