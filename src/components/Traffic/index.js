import React from "react";
import PropTypes from "prop-types";

function Traffic(props) {
  const { platform, map } = props;
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }
  map.addLayer(platform.createDefaultLayers().incidents);
  return null;
}

Traffic.propTypes = {
  platform: PropTypes.object,
  map: PropTypes.object
};

export default Traffic;
