import { mapEventTypes, mapEvents } from './defaults';

export const initInteraction = (
  map: H.Map,
  interactive: boolean,
  useEvents: boolean,
  events: typeof mapEvents
) => {
  let behavior = interactive
    ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
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
