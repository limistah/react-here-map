/**
 * @type {string} Default version for the API
 */
const VERSION = 'v3/3.0';

export const mapTypes = [
  'normal.map',
  'normal.xbase',
  'normal.xbasenight',
  'normal.basen',
  'normal.basenight',
  'normal.mapnight',
  'normal.traffic',
  'normal.trafficnight',
  'normal.transit',
  'normal.panoram',
  'normal.panoramnight',
  'normal.labels',
  'normal.metaInfo',
  'satellite.xbase',
  'satellite.base',
  'satellite.map',
  'satellite.traffic',
  'satellite.panorama',
  'satellite.labels',
  'terrain.xbase',
  'terrain.base',
  'terrain.map',
  'terrain.traffic',
  'terrain.panorama',
  'terrain.labels',
  'incidents',
  'venues',
] as const;
export type MAP_TYPES = typeof mapTypes[number];

const MAP_TYPE: MAP_TYPES = 'normal.map';

const mapOptions = {
  zoom: 8,
  center: {
    lat: 6.5243793,
    lng: 3.3792057,
  },
};
const useEvents = false;
const interactive = false;
const includeUI = false;
const containerId = 'HERE_MAP_CONTAINER';

type mapEventTypes =
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

const mapEvents: Record<mapEventTypes, typeof noop> = {
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
