import dotProp from 'dot-prop';
import validateMapType from './validateMapType';

export default (
  platform,
  container,
  mapOptions,
  mapType,
  mapTypes,
  language
) => {
  validateMapType(mapType, mapTypes);

  // Create default layers and set specified language (no or unkown language will default to English)
  const defaultLayers = platform.createDefaultLayers({
    lg: language
  });

  // Instantiate (and display) a map object:
  return new H.Map(container, dotProp.get(defaultLayers, mapType), mapOptions);
};
