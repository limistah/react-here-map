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
import { initInteractionStyles } from './initInteractionStyles';

const initMap = (
  container: React.RefObject<HTMLDivElement>,
  mapLayer: any,
  mapOptions: IHMapOptions
): H.Map | null => {
  // Instantiate (and display) a map object:
  const map = container.current
    ? new H.Map(container.current, mapLayer, mapOptions)
    : null;
  map?.setCenter(mapOptions.center as H.geo.Point);
  return map;
};

export const initInteraction = (
  map: H.Map | null,
  interactive: boolean,
  useEvents: boolean,
  events: typeof mapEvents
): H.mapevents.Behavior | null => {
  const behavior =
    interactive && map
      ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
      : null;
  if (useEvents && interactive && map) {
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

  // Create the default UI components
  return H.ui.UI.createDefault(map, platform.createDefaultLayers(), uiLang);
};

export interface IBuildMapResult {
  map: H.Map | null;
  interaction: H.mapevents.Behavior | null;
  ui: H.ui.UI | null;
  options?: IHMapOptionsMerged & DefaultOptionsType & { mapType: MAP_TYPES };
}

export const buildMap = (
  platform: any,
  options: IHMapOptionsMerged & DefaultOptionsType
): IBuildMapResult => {
  // Get values from the options
  const {
    useEvents,
    mapEvents,
    interactive,
    includeUI,
    mapOptions,
    uiLang,
    container,
    build,
  } = options;

  const retObject: IBuildMapResult = {
    map: null,
    interaction: null,
    ui: null,
    options: { ...options, mapType: mapOptions.mapType || 'vector.normal.map' },
  };

  if (container && build && retObject.options) {
    validateMapType(retObject.options.mapType);
    // Get all the default layers so we can set which to use based on the map type
    const defaultLayers = platform.createDefaultLayers();

    const mapLayer = dotProp.getProperty(
      defaultLayers,
      retObject.options.mapType
    );
    // Create a Map
    retObject.map = mapLayer ? initMap(container, mapLayer, mapOptions) : null;
    while (interactive && !retObject.interaction) {
      retObject.interaction = initInteraction(
        retObject.map,
        interactive,
        useEvents,
        mapEvents
      );
      if (includeUI) {
        retObject.ui = initDefaultUI(
          platform,
          retObject.map,
          includeUI,
          uiLang
        );
      }
      // Adds the grabbing to the document
      initInteractionStyles();
    }
  }
  return retObject;
};
