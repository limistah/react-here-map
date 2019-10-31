/**
 * @type {string} Default version for the API
 */
var VERSION = "v3/3.0";
var MAP_TYPE = "normal.map";
var _test = true;
var mapTypes = {
  normal: ["xbase", "xbasenight", "base", "basenight", "map", "mapnight", "traffic", "trafficnight", "transit", "panorama", "panoramanight", "labels", "metaInfo"],
  satellite: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  terrain: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  incidents: _test,
  venues: _test
};
var mapOptions = {
  zoom: 8,
  center: {
    lat: 6.5243793,
    lng: 3.3792057
  }
};
var useEvents = false;
var interactive = false;
var includeUI = false;
var containerId = "HERE_MAP_CONTAINER";
var _mapEvents = ["pointerdown", "pointerup", "pointermove", "pointerenter", "pointerleave", "pointercancel", "dragstart", "drag", "dragend", "tab", "dbltap"];
var defaultClassName = "here-map-container";
var includePlaces = false; // Function that does really nothing, still it is a function, and has its right!

var noop = function noop() {};

var mapEvents = {};

_mapEvents.map(function (name) {
  return mapEvents[name] = noop;
});

export default {
  VERSION: VERSION,
  mapTypes: mapTypes,
  mapEvents: mapEvents,
  MAP_TYPE: MAP_TYPE,
  mapOptions: mapOptions,
  interactive: interactive,
  includeUI: includeUI,
  includePlaces: includePlaces,
  useEvents: useEvents,
  containerId: containerId,
  defaultClassName: defaultClassName
};