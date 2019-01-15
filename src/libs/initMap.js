import dotProp from "dot-prop";
import validateMapType from "./validateMapType";

export default (platform, container, mapOptions, mapTypes, mapType) => {
  validateMapType(mapTypes, mapType);
  // Get all the default layers so we can set which to use based on the map type
  const defaultLayers = platform.createDefaultLayers();
  console.log(mapType);
  // Instantiate (and display) a map object:
  return new H.Map(container, dotProp.get(defaultLayers, mapType), mapOptions);
};
