import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";
import initMapObjectEvents from "../../../libs/initMapObjectEvents";

function Circle(props) {
  var _merge = merge({
    setViewBounds: true
  }, props),
      radius = _merge.radius,
      map = _merge.map,
      coords = _merge.coords,
      options = _merge.options,
      setViewBounds = _merge.setViewBounds,
      objectEvents = _merge.objectEvents,
      platform = _merge.platform,
      ui = _merge.ui,
      __options = _merge.__options;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!coords.lat || !coords.lng) {
    throw new Error("coords should be an object having 'lat' and 'lng' as props");
  }

  if (!radius) {
    console.info("radius is not set, default radius of 1000 is used");
  }

  var circle = new H.map.Circle( // The central point of the circle
  coords, // The radius of the circle in meters
  radius || 1000, options); // Add event listener to the object if intention of using the object is defined

  initMapObjectEvents(circle, objectEvents, __options); // Add the marker to the map and center the map at the location of the marker:

  map.addObject(circle);

  if (setViewBounds) {
    map.setCenter(coords);
  } // There is no need to render something useful here, HereMap does that magically


  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "none"
    }
  });
}

Circle.propTypes = {
  coords: PropTypes.object.isRequired,
  options: PropTypes.object,
  radius: PropTypes.number,
  setViewBounds: PropTypes.bool,
  map: PropTypes.object,
  objectEvents: PropTypes.object
};
export default Circle;