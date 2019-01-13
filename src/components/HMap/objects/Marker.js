import React from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";

function Marker(props) {
  const { icon, map, coords, type, setViewBounds } = merge(
    { setViewBounds: true },
    props
  );
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!coords.lat || !coords.lng) {
    throw new Error(
      "coords should be an object having 'lat' and 'lng' as props"
    );
  }

  if (!icon) {
    throw new Error("icon is not set, Marker will not be rendered");
  }

  let mapIcon = {};
  if (type && type === "DomIcon") {
    // Displays a DOM Icon
    mapIcon = new H.map.DomIcon(icon);
  } else {
    // Displays a static icon
    mapIcon = new H.map.Icon(icon);
  }

  // Create an icon, an object holding the latitude and longitude, and a marker:
  const marker = new H.map.Marker(coords, { icon: mapIcon });

  // Add the marker to the map and center the map at the location of the marker:
  map.addObject(marker);
  if (setViewBounds) {
    map.setCenter(coords);
  }

  // There is no need to render something useful here, HereMap does that magically
  return <div style={{ display: "none" }} />;
}

Marker.propTypes = {
  coords: PropTypes.object.isRequired,
  icon: PropTypes.any.isRequired,
  type: PropTypes.string,
  map: PropTypes.object
};

export default Marker;
