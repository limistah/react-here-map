/**
 * @type {string} Default version for the API
 */
const VERSION = "v3/3.0";
const MAP_TYPE = "normal.map";
const _test = true;
const mapTypes = {
  normal: [
    "xbase",
    "xbasenight",
    "base",
    "basenight",
    "map",
    "mapnight",
    "traffic",
    "trafficnight",
    "transit",
    "panorama",
    "panoramanight",
    "labels",
    "metaInfo"
  ],
  satellite: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  terrain: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  incidents: _test,
  venues: _test
};

const mapOptions = {
  zoom: 8,
  center: {
    lat: 6.5243793,
    lng: 3.3792057
  }
};
const useEvents = false;
const interactive = false;
const includeUI = false;
const containerId = "HERE_MAP_CONTAINER";

const _mapEvents = [
  "pointerdown",
  "pointerup",
  "pointermove",
  "pointerenter",
  "pointerleave",
  "pointercancel",
  "dragstart",
  "drag",
  "dragend",
  "tab",
  "dbltap"
];

const defaultClassName = "here-map-container";

const includePlaces = false;

// Function that does really nothing, still it is a function, and has its right!
const noop = () => {};
let mapEvents = {};
_mapEvents.map(name => (mapEvents[name] = noop));

export default {
  VERSION,
  mapTypes,
  mapEvents,
  MAP_TYPE,
  mapOptions,
  interactive,
  includeUI,
  includePlaces,
  useEvents,
  containerId,
  defaultClassName
};
