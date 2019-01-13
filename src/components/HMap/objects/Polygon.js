import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";

function PolyLine(props) {
  const { points, map, setViewBounds, options } = merge(
    { setViewBounds: true },
    props
  );
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!Array.isArray(points)) {
    throw new Error(
      "points should be an array of number to use in drawing the points"
    );
  }

  const lineString = new H.geo.LineString(points, "values lat lng alt");

  // Initialize a LineString and add all the points to it:
  const polygon = new H.map.Polygon(lineString, options);

  // Add the polyLine to the map:
  map.addObject(polygon);

  if (setViewBounds) {
    // Zoom the map to make sure the whole polygon is visible:
    map.setViewBounds(polygon.getBounds());
  }

  // There is no need to render something useful here, HereMap does that magically
  return <div style={{ display: "none" }} />;
}

PolyLine.propTypes = {
  points: PropTypes.array.isRequired,
  options: PropTypes.object,
  map: PropTypes.object,
  setViewBounds: PropTypes.bool
};

export default PolyLine;
