"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function Circle(props) {
  var _merge = (0, _lodash.default)(
      {
        setViewBounds: true
      },
      props
    ),
    radius = _merge.radius,
    map = _merge.map,
    coords = _merge.coords,
    options = _merge.options,
    setViewBounds = _merge.setViewBounds,
    platform = _merge.platform,
    ui = _merge.ui,
    __options = _merge.__options;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!coords.lat || !coords.lng) {
    throw new Error(
      "coords should be an object having 'lat' and 'lng' as props"
    );
  }

  if (!radius) {
    console.info("radius is not set, default radius of 1000 is used");
  }

  var circle = new H.map.Circle( // The central point of the circle
    coords, // The radius of the circle in meters
    radius || 1000,
    options
  ); // Add the marker to the map and center the map at the location of the marker:

  map.addObject(circle);

  if (setViewBounds) {
    map.setCenter(coords);
  } // There is no need to render something useful here, HereMap does that magically

  return _react.default.createElement("div", {
    style: {
      display: "none"
    }
  });
}

Circle.propTypes = {
  coords: _propTypes.default.object.isRequired,
  options: _propTypes.default.object,
  radius: _propTypes.default.number,
  setViewBounds: _propTypes.default.bool,
  map: _propTypes.default.object
};
var _default = Circle;
exports.default = _default;
