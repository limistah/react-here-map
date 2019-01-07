import init from "./init";
import dotProp from "dot-prop";

let platform;

const lib = function({ appId, appCode, useEvents, events, mapType, mapTypes }) {
  if (!dotProp.has(mapTypes, mapType)) {
    throw new Error(
      "mapType Should be one from https://developer.here.com/documentation/maps/topics/map-types.html in dot notation"
    );
  }
  const __cords__ = { lat: 0, lng: 0 };
  navigator.geolocation.getCurrentPosition(p => {
    __cords__.lat = p.coords.latitude;
    __cords__.lng = p.coords.longitude;
    new H.Map(
      document.getElementById("mapContainer"),
      dotProp.get(defaultLayers, mapType),
      {
        zoom: 10,
        center: __cords__
      }
    );
  });

  platform = new H.service.Platform({
    app_id: appId,
    app_code: appCode
  });
  var defaultLayers = platform.createDefaultLayers();
  // Instantiate (and display) a map object:
  // var map =
};

/**
 * The whole library is bootstrapped after the initialization is done using the options
 * @property {string} options.version Version of the api to load. Defaults to v3
 * @property {string} options.useEvents Should load map events
 * @property {object} options.events Map events implementation
 * @property {string} options.appId Here Map APP ID
 * @property {string} options.appCode Here Map APP code
 * @property {string} options.mapType The type of the map to load e.g // "normal.map"
 * @param {object} options Items necessary to run the library
 */
const library = options => init(options, lib);

export default library;
