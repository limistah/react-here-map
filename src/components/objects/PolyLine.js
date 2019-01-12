import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";

function PolyLine(props) {
  const { points, style, map, setViewBounds } = merge(
    { setViewBounds: true },
    props
  );
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!Array.isArray(points)) {
    throw new Error(
      "points should be an array of objects containing lat and lng properties"
    );
  }
  // Initialize a LineString and add all the points to it:
  var lineString = new H.geo.LineString();
  points.forEach(function(point) {
    lineString.pushPoint(point);
  });

  // Initialize a polyLine with the lineString:
  var polyLine = new H.map.Polyline(lineString, { style });

  // Add the polyLine to the map:
  map.addObject(polyLine);

  if (setViewBounds) {
    // Zoom the map to make sure the whole polyLine is visible:
    map.setViewBounds(polyLine.getBounds());
  }

  // There is no need to render something useful here, HereMap does that magically
  return <div style={{ display: "none" }} />;
}

PolyLine.propTypes = {
  points: PropTypes.array.isRequired,
  style: PropTypes.object,
  map: PropTypes.object,
  setViewBounds: PropTypes.bool
};

export default PolyLine;
