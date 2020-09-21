import PropTypes from "prop-types";
import dotProp from "dot-prop";
import validateMapType from "../../libs/validateMapType";

function Traffic(props) {
  const {
    platform,
    map,
    mapLayerType,
    __options: { mapTypes }
  } = props;
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }
  validateMapType(mapTypes, mapLayerType);
  const defaultLayers = platform.createDefaultLayers();
  map.addLayer(dotProp.get(defaultLayers, mapLayerType));
  return null;
}

Traffic.propTypes = {
  platform: PropTypes.object,
  __options: PropTypes.object,
  mapLayerType: PropTypes.string.isRequired,
  map: PropTypes.object
};

export default Traffic;
