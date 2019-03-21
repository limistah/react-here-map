"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dotProp = _interopRequireDefault(require("dot-prop"));

var _validateMapType = _interopRequireDefault(
  require("../../libs/validateMapType")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function Traffic(props) {
  var platform = props.platform,
    map = props.map,
    mapLayerType = props.mapLayerType,
    mapTypes = props.__options.mapTypes;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  (0, _validateMapType.default)(mapTypes, mapLayerType);
  var defaultLayers = platform.createDefaultLayers();
  map.addLayer(_dotProp.default.get(defaultLayers, mapLayerType));
  return null;
}

Traffic.propTypes = {
  platform: _propTypes.default.object,
  __options: _propTypes.default.object,
  mapLayerType: _propTypes.default.string.isRequired,
  map: _propTypes.default.object
};
var _default = Traffic;
exports.default = _default;
