import React from "react";
import PropTypes from "prop-types";
import dotProp from "dot-prop";

function Traffic(props) {
  const {
    platform,
    map,
    __options: { MAP_TYPE }
  } = props;
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }
  const defaultLayers = platform.createDefaultLayers();
  for (const key in defaultLayers) {
    if (defaultLayers.hasOwnProperty(key)) {
      const element = defaultLayers[key];
      console.log({ keys: JSON.stringify(Object.keys(element)), key });
    }
  }
  // console.log({ l: MAP_TYPE, defaultLayers });
  // map.addLayer(dotProp.get(defaultLayers, MAP_TYPE).traffic);
  return null;
}

Traffic.propTypes = {
  platform: PropTypes.object,
  map: PropTypes.object
};

export default Traffic;
