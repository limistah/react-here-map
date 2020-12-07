/**
 * @param {object} platform Platform object used for initialization.
 * @param {object} type The places library to be used (around, categories, explore, here, lookup, suggest or search).
 */
export default (platform, type) => {
  try {
    const placesService = platform.getPlacesService();

    switch (type) {
      case 'around':
        return new H.places.Around(placesService);
      case 'categories':
        return new H.places.Categories(placesService);
      case 'explore':
        return new H.places.Explore(placesService);
      case 'here':
        return new H.places.Here(placesService);
      case 'lookup':
        return new H.places.Lookup(placesService);
      case 'suggest':
        return new H.places.Suggest(placesService);
      case 'search':
      default:
        return new H.places.Search(placesService);
    }
  } catch (e) {
    throw new Error("Platform should be of Here Map's Platform");
  }
};
