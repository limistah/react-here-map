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

function PolyLine(props) {
  var _merge = (0, _lodash.default)(
      {
        setViewBounds: true
      },
      props
    ),
    points = _merge.points,
    options = _merge.options,
    map = _merge.map,
    setViewBounds = _merge.setViewBounds,
    platform = _merge.platform,
    ui = _merge.ui,
    __options = _merge.__options;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!Array.isArray(points)) {
    throw new Error(
      "points should be an array of objects containing lat and lng properties"
    );
  } // Initialize a LineString and add all the points to it:

  var lineString = new H.geo.LineString();
  points.forEach(function(point) {
    lineString.pushPoint(point);
  }); // Initialize a polyLine with the lineString:

  var polyLine = new H.map.Polyline(lineString, options); // Add the polyLine to the map:

  map.addObject(polyLine);

  if (setViewBounds) {
    // Zoom the map to make sure the whole polyLine is visible:
    map.setViewBounds(polyLine.getBounds());
  } // There is no need to render something useful here, HereMap does that magically

  return _react.default.createElement("div", {
    style: {
      display: "none"
    }
  });
}

PolyLine.propTypes = {
  points: _propTypes.default.array.isRequired,
  options: _propTypes.default.object,
  map: _propTypes.default.object,
  setViewBounds: _propTypes.default.bool
};
var _default = PolyLine;
exports.default = _default;
