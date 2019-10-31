/**
 * @param {object} platform Platform object to use for initialization.
 */
export default (function (platform, type) {
  if (!platform || platform.A != "api.here.com") {
    throw new Error("Platform should be of Here Map's Platform");
  }

  var placesService = platform.getPlacesService();

  switch (type) {
    case "around":
      return new H.places.Around(placesService);
      break;

    case "categories":
      return new H.places.Categories(placesService);
      break;

    case "explore":
      return new H.places.Explore(placesService);
      break;

    case "here":
      return new H.places.Here(placesService);
      break;

    case "lookup":
      return new H.places.Lookup(placesService);
      break;

    case "suggest":
      return new H.places.Suggest(placesService);
      break;

    case "search":
    default:
      return new H.places.Search(placesService);
      break;
  }
});