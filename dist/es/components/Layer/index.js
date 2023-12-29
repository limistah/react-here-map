import PropTypes from "prop-types";
import dotProp from "dot-prop";
import validateMapType from "../../libs/validateMapType";
function Traffic(props) {
  var platform = props.platform,
    map = props.map,
    mapLayerType = props.mapLayerType,
    mapTypes = props.__options.mapTypes;
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }
  validateMapType(mapTypes, mapLayerType);
  var defaultLayers = platform.createDefaultLayers();
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