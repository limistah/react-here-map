import { DefaultOptionsType, mapEventTypes, mapEvents } from './defaults';

export const initMapObjectEvents = (
  mapObject: H.map.Object,
  objectEvents: typeof mapEvents,
  platformOptions: Pick<DefaultOptionsType, 'useEvents' | 'interactive'>
) => {
  const { useEvents, interactive } = platformOptions;
  console.log(objectEvents);
  if (useEvents && interactive && objectEvents) {
    for (const type in objectEvents) {
      if (objectEvents.hasOwnProperty(type)) {
        const callback = objectEvents[type as mapEventTypes];
        if (callback && typeof callback === 'function') {
          mapObject.addEventListener(type, callback);
        }
      }
    }
  }
};
