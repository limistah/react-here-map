import dotProp from "dot-prop";

export default (mapTypes, mapType) => {
  if (!dotProp.has(mapTypes, mapType)) {
    throw new Error(
      "mapType Should be one from https://developer.here.com/documentation/maps/topics/map-types.html in dot notation"
    );
  }
};
