/**
 * @type {string} Default version for the API
 */
const VERSION = 'v3/3.0';
const MAP_TYPE = 'normal.map';
const _test = true;
const mapTypes = {
  normal: [
    'xbase',
    'xbasenight',
    'base',
    'basenight',
    'map',
    'mapnight',
    'traffic',
    'trafficnight',
    'transit',
    'panorama',
    'panoramanight',
    'labels',
    'metaInfo'
  ],
  satellite: ['xbase', 'base', 'map', 'traffic', 'panorama', 'labels'],
  terrain: ['xbase', 'base', 'map', 'traffic', 'panorama', 'labels'],
  incidents: _test,
  venues: _test
};
const languageOptions = {
  EN: 'en-US', //English
  GER: 'de-DE', //German
  SPA: 'es-ES', //Spanish
  FIN: 'fi-FI', //Finish
  ITA: 'it-IT', //Italian
  DUT: 'nl-NL', //Dutch
  POL: 'pl-PL', //Polish
  POR: 'pt-PT', //Portugese
  RUS: 'ru-RU', //Russian
  TUR: 'tr-TR', //Turkish
  CHI: 'zh-CN' //Chinese
};

const mapOptions = {
  zoom: 2,
  center: {
    lat: 0,
    lng: 0
  }
};
const useEvents = false;
const interactive = false;
const includeUI = false;
const includePlaces = false;

const _mapEvents = [
  'pointerdown',
  'pointerup',
  'pointermove',
  'pointerenter',
  'pointerleave',
  'pointercancel',
  'dragstart',
  'drag',
  'dragend',
  'tab',
  'dbltap'
];

const containerId = 'HERE_MAP_CONTAINER';
const defaultClassName = 'here-map-container';

const noop = () => {};
let mapEvents = {};
_mapEvents.map((name) => (mapEvents[name] = noop));

export default {
  VERSION,
  mapTypes,
  mapEvents,
  MAP_TYPE,
  mapOptions,
  interactive,
  includeUI,
  languageOptions,
  includePlaces,
  useEvents,
  containerId,
  defaultClassName
};
