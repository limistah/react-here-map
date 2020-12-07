/**
 * @param {string} mapType The maptype to be validated.
 * @param {Array} mapTypes All available maptypes.
 */
export default (mapType, mapTypes) => {
  try {
    const [type, layer] = mapType.split('.');
    const foundMapType = mapTypes[type];
    const mapTypeIsValid =
      Array.isArray(foundMapType) && foundMapType.includes(layer);

    if (!mapTypeIsValid) throw new Error();
  } catch (e) {
    throw new Error(
      '"mapType" should be one from https://developer.here.com/documentation/maps/topics/map-types.html in dot notation'
    );
  }
};
