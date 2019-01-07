/**
 * @type {string} Default version for the API
 */
const VERSION = "v3/3.0/";
const MAP_TYPE = "normal.map";
const _test = true;
const mapTypes = {
  normal: {
    map: _test,
    traffic: _test,
    panorama: _test,
    transit: _test
  },
  satellite: {
    map: _test,
    traffic: _test,
    panorama: _test,
    transit: _test
  },
  terrain: {
    map: _test
  }
};

const mapEvents = [
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

export default {
  VERSION,
  mapTypes,
  mapEvents,
  MAP_TYPE
};
