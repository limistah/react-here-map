import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";
import initMapObjectEvents from "../../../libs/initMapObjectEvents";
function Polygon(props) {
  var _merge = merge({
      setViewBounds: true
    }, props),
    points = _merge.points,
    map = _merge.map,
    setViewBounds = _merge.setViewBounds,
    options = _merge.options,
    objectEvents = _merge.objectEvents,
    platform = _merge.platform,
    ui = _merge.ui,
    __options = _merge.__options;
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }
  if (!Array.isArray(points)) {
    throw new Error("points should be an array of number to use in drawing the points");
  }
  var lineString = {};
  var firstEl = points[0];
  if (typeof firstEl === "string" && firstEl.split(",").length === 2) {
    lineString = new H.geo.LineString();
    points.forEach(function (coords) {
      lineString.pushLatLngAlt.apply(lineString, coords.split(","));
    });
  } else {
    lineString = new H.geo.LineString(points, "values lat lng alt");
  }

  // Initialize a LineString and add all the points to it:
  var polygon = new H.map.Polygon(lineString, options);

  // Add event listener to the object if intention of using the object is defined
  initMapObjectEvents(polygon, objectEvents, __options);

  // Add the polyLine to the map:
  map.addObject(polygon);
  if (setViewBounds) {
    // Zoom the map to make sure the whole polygon is visible:
    map.setViewBounds(polygon.getBounds());
  }

  // There is no need to render something useful here, HereMap does that magically
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none"
    }
  });
}
Polygon.propTypes = {
  points: PropTypes.array.isRequired,
  options: PropTypes.object,
  map: PropTypes.object,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object
};
export default Polygon;