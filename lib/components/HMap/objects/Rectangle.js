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

function Rectangle(props) {
  var _merge = (0, _lodash.default)(
      {
        setViewBounds: true
      },
      props
    ),
    map = _merge.map,
    points = _merge.points,
    options = _merge.options,
    setViewBounds = _merge.setViewBounds,
    platform = _merge.platform,
    ui = _merge.ui,
    __options = _merge.__options;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!points || points.length !== 4) {
    throw new Error("points should be an array of four items");
  } // Get a bounding box

  var boundingBox = new H.geo.Rect(points[0], points[1], points[2], points[3]); // Create an rectangle

  var rectangle = new H.map.Rect(boundingBox, options); // Add a rectangle to the map

  map.addObject(rectangle);

  if (setViewBounds) {
    // Zoom the map to make sure the whole rectangle is visible:
    map.setViewBounds(rectangle.getBounds());
  } // There is no need to render something useful here, HereMap does that magically

  return _react.default.createElement("div", {
    style: {
      display: "none"
    }
  });
}

Rectangle.propTypes = {
  options: _propTypes.default.object,
  points: _propTypes.default.array.isRequired,
  map: _propTypes.default.object
};
var _default = Rectangle;
exports.default = _default;
