export default (mapTypes, mapType) => {
  const items = mapType.split('.');
  const mainType = mapTypes[items[0]];
  // Some of the types are array, and should have the second element in the split type to be an item in it
  const _test = Array.isArray(mainType) && mainType.includes(items[1]);
  const __test = mainType === true;
  if (!_test && !__test) {
    throw new Error(
      '"mapType" should be one from https://developer.here.com/documentation/maps/topics/map-types.html in dot notation'
    );
  }
};
