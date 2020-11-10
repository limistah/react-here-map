// Add interactivity if set from the options
// interactive and useEvents must be true to use map events
// const changeCursorToGrab = () => {};

export default (map, interactive, useEvents, mapEvents) => {
  const behavior = interactive
    ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    : null;
  if (useEvents && interactive) {
    for (const type in mapEvents) {
      if (Object.prototype.hasOwnProperty.call(mapEvents, type)) {
        const callback = mapEvents[type];
        if (callback && typeof callback === 'function') {
          map.addEventListener(type, function (evt) {
            callback.apply(null, arguments);
          });
        }
      }
    }
  }
  return behavior;
};
