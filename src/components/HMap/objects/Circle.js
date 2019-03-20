import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";

function Circle(props) {
  const {
    radius,
    map,
    coords,
    options,
    setViewBounds,
    platform,
    ui,
    __options
  } = merge({ setViewBounds: true }, props);
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

  const circle = new H.map.Circle(
    // The central point of the circle
    coords,
    // The radius of the circle in meters
    radius || 1000,
    options
  );

  // Add the marker to the map and center the map at the location of the marker:
  map.addObject(circle);
  if (setViewBounds) {
    map.setCenter(coords);
  }

  // There is no need to render something useful here, HereMap does that magically
  return <div style={{ display: "none" }} />;
}

Circle.propTypes = {
  coords: PropTypes.object.isRequired,
  options: PropTypes.object,
  radius: PropTypes.number,
  setViewBounds: PropTypes.bool,
  map: PropTypes.object
};

export default Circle;
