// Add interactivity if set from the options
// interactive and useEvents must be true to use map events
const changeCursorToGrab = () => {};

export default (map, interactive, useEvents, mapEvents) => {
  let behavior = interactive
    ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    : null;
  if (useEvents && interactive) {
    for (const type in mapEvents) {
      if (mapEvents.hasOwnProperty(type)) {
        const callback = mapEvents[type];
        map.addEventListener(type, evt => {
          // switch (evt.type) {
          //   case "pointerenter":
          //     console.log("Entering");
          //   case "pointerleave":
          //     console.log("Leaving");
          //   case "pointermove":
          //     console.log("Moving");
          // }
          callback();
        });
      }
    }
  }
  return behavior;
};
