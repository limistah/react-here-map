// import initInteraction from './initInteraction';
// import initDefaultUI from './initDefaultUI';
// import initInteractionStyles from './initInteractionStyles';

import * as dotProp from 'dot-prop';
import {
  DefaultOptionsType,
  MAP_TYPES,
  mapEventTypes,
  mapEvents,
} from './defaults';
import { IHMapOptions, IHMapOptionsMerged } from '../Map';
import { validateMapType } from './validateMapType';

const initMap = (
  container: React.RefObject<HTMLDivElement>,
  mapLayer: any,
  mapOptions: IHMapOptions
) => {
  // @ts-ignore
  const h = window.H;

  // Instantiate (and display) a map object:
  return (
    container.current && new h.Map(container.current, mapLayer, mapOptions)
  );
};

export const initInteraction = (
  map: any,
  interactive: boolean,
  useEvents: boolean,
  events: typeof mapEvents
) => {
  console.log(interactive, useEvents, map);
  // @ts-ignore
  const h = window.H;
  const behavior = interactive
    ? new h.mapevents.Behavior(new h.mapevents.MapEvents(map))
    : null;
  if (useEvents && interactive) {
    for (const type in events) {
      if (events.hasOwnProperty(type)) {
        const callback = events[type as mapEventTypes];
        if (callback && typeof callback === 'function') {
          map.addEventListener(type, callback);
        }
      }
    }
  }
  return behavior;
};

export const initDefaultUI = (
  platform: any,
  map: any,
  includeUI: boolean,
  uiLang?: string
) => {
  if (!includeUI) {
    throw new Error('includeUI must be set to true to initialize default UI');
  }

  // @ts-ignore
  const h = window.H;
  // Create the default UI components
  return h.ui.UI.createDefault(map, platform.createDefaultLayers(), uiLang);
};

export const buildMap = (
  platform: any,
  options: IHMapOptionsMerged & DefaultOptionsType
) => {
  // Get values from the options
  const {
    useEvents,
    mapEvents,
    interactive,
    // includeUI,
    mapType,
    mapOptions,
    // uiLang,
    container,
    build,
  } = options;

  const retObject: {
    map?: any;
    interaction?: any;
    ui?: any;
    options: typeof options & { mapType: MAP_TYPES };
  } = {
    options: { ...options, mapType: mapType || 'vector.normal.map' },
  };

  if (container && build) {
    validateMapType(retObject.options.mapType);
    // Get all the default layers so we can set which to use based on the map type
    const defaultLayers = platform.createDefaultLayers();

    const mapLayer = dotProp.getProperty(
      defaultLayers,
      retObject.options.mapType
    );
    // Create a Map
    retObject.map = mapLayer && initMap(container, mapLayer, mapOptions);
    while (interactive && !retObject.interaction) {
      retObject.interaction = initInteraction(
        retObject.map,
        interactive,
        useEvents,
        mapEvents
      );
      // if (includeUI) {
      //   retObject.ui = initDefaultUI(platform, retObject.map, includeUI, uiLang);
      // }
      // Adds the grabbing to the document
      // initInteractionStyles();
    }
  } else {
    // ret.createMap = initMap;
    // ret.createPlatform = initPlatform;
    // ret.createInteraction = initInteraction;
    // ret.createDefaultUI = initDefaultUI;
    // ret.createInteractionStyles = initInteractionStyles;
  }
  return retObject;
};
