import { MAP_TYPES, mapTypes } from './defaults';

export const validateMapType = (mapType: MAP_TYPES) => {
  if (!mapTypes.includes(mapType)) {
    throw new Error(
      'mapType Should be one from https://developer.here.com/documentation/maps/topics/map-types.html in dot notation'
    );
  }
};
