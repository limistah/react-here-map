import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";
import initMapObjectEvents from "../../../libs/initMapObjectEvents";

function PolyLine(props) {
  var _merge = merge({
    setViewBounds: true
  }, props),
      points = _merge.points,
      options = _merge.options,
      map = _merge.map,
      setViewBounds = _merge.setViewBounds,
      objectEvents = _merge.objectEvents,
      platform = _merge.platform,
      ui = _merge.ui,
      __options = _merge.__options;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!Array.isArray(points)) {
    throw new Error("points should be an array of objects containing lat and lng properties");
  } // Initialize a LineString and add all the points to it:


  var lineString = new H.geo.LineString();
  points.forEach(function (point) {
    lineString.pushPoint(point);
  }); // Initialize a polyLine with the lineString:

  var polyLine = new H.map.Polyline(lineString, options); // Add event listener to the object if intention of using the object is defined

  initMapObjectEvents(polyLine, objectEvents, __options); // Add the polyLine to the map:

  map.addObject(polyLine);

  if (setViewBounds) {
    // Zoom the map to make sure the whole polyLine is visible:
    map.setViewBounds(polyLine.getBounds());
  } // There is no need to render something useful here, HereMap does that magically


  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none"
    }
  });
}

PolyLine.propTypes = {
  points: PropTypes.array.isRequired,
  options: PropTypes.object,
  map: PropTypes.object,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object
};
export default PolyLine;