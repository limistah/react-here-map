import PropTypes from 'prop-types';
import dotProp from 'dot-prop';
import validateMapType from '../../libs/validateMapType';

function Layer(props) {
  const {
    mapLayerType,
    platform,
    map,
    __options: { mapTypes }
  } = props;

  if (!H || !H.map || !map) {
    throw new Error('HMap has to be initialized before adding Map Objects');
  }

  validateMapType(mapTypes, mapLayerType);
  const defaultLayers = platform.createDefaultLayers();
  map.addLayer(dotProp.get(defaultLayers, mapLayerType));
  return null;
}

Traffic.propTypes = {
  mapLayerType: PropTypes.string.isRequired,
  platform: PropTypes.object,
  map: PropTypes.object,
  __options: PropTypes.object
};

export default Layer;
