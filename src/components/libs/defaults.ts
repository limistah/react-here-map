/**
 * @type {string} Default version for the API
 */
const VERSION = 'v3/3.1';

export const mapTypes = [
         'raster.normal.map',
         'raster.normal.xbase',
         'raster.normal.xbasenight',
         'raster.normal.basen',
         'raster.normal.basenight',
         'raster.normal.mapnight',
         'raster.normal.traffic',
         'raster.normal.trafficnight',
         'raster.normal.transit',
         'raster.normal.panoram',
         'raster.normal.panoramnight',
         'raster.normal.labels',
         'raster.normal.metaInfo',
         'raster.satellite.xbase',
         'raster.satellite.base',
         'raster.satellite.map',
         'raster.satellite.traffic',
         'raster.satellite.panorama',
         'raster.satellite.labels',
         'raster.terrain.xbase',
         'raster.terrain.base',
         'raster.terrain.map',
         'raster.terrain.traffic',
         'raster.terrain.panorama',
         'raster.terrain.labels',
         'raster.incidents',
         'raster.venues',
         'vector.normal.map',
         'vector.normal.xbase',
         'vector.normal.xbasenight',
         'vector.normal.basen',
         'vector.normal.basenight',
         'vector.normal.mapnight',
         'vector.normal.traffic',
         'vector.normal.trafficnight',
         'vector.normal.transit',
         'vector.normal.panoram',
         'vector.normal.panoramnight',
         'vector.normal.labels',
         'vector.normal.metaInfo',
         'vector.satellite.xbase',
         'vector.satellite.base',
         'vector.satellite.map',
         'vector.satellite.traffic',
         'vector.satellite.panorama',
         'vector.satellite.labels',
         'vector.terrain.xbase',
         'vector.terrain.base',
         'vector.terrain.map',
         'vector.terrain.traffic',
         'vector.terrain.panorama',
         'vector.terrain.labels',
         'vector.incidents',
         'vector.venues',
       ] as const;
export type MAP_TYPES = typeof mapTypes[number];

const MAP_TYPE: MAP_TYPES = 'vector.normal.map';

const mapOptions = {
  zoom: 8,
  center: {
    lat: 6.5243793,
    lng: 3.3792057,
  },
  mapType: MAP_TYPE,
};
const useEvents = false;
const interactive = false;
const includeUI = false;
const containerId = 'HERE_MAP_CONTAINER';

export type mapEventTypes =
  | 'pointerdown'
  | 'pointerup'
  | 'pointermove'
  | 'pointerenter'
  | 'pointerleave'
  | 'pointercancel'
  | 'dragstart'
  | 'drag'
  | 'dragend'
  | 'tab'
  | 'dbltap';

const defaultClassName = 'here-map-container';

const includePlaces = false;

// Function that does really nothing, still it is a function, and has its right!
const noop = () => {};

export const mapEvents: Record<mapEventTypes, typeof noop> = {
  pointercancel: noop,
  drag: noop,
  dragend: noop,
  tab: noop,
  dbltap: noop,
  pointerdown: noop,
  pointerenter: noop,
  pointerleave: noop,
  pointermove: noop,
  pointerup: noop,
  dragstart: noop,
};

export type DefaultOptionsType = typeof defaultOptions;

export const defaultOptions = {
  VERSION,
  mapEvents,
  MAP_TYPE,
  mapTypes,
  mapOptions,
  interactive,
  includeUI,
  includePlaces,
  useEvents,
  containerId,
  defaultClassName,
  app_id: '',
  app_code: '',
  apikey: '',
};
