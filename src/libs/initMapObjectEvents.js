const initMapObjectEvents = (mapObject, objectEvents, platformOptions) => {
  const { useEvents, interactive, mapEvents } = platformOptions;
  if (useEvents && interactive && objectEvents) {
    for (const type in mapEvents) {
      if (Object.prototype.hasOwnProperty.call(mapEvents, type)) {
        const objectEventCallback = objectEvents[type];
        if (objectEventCallback && typeof objectEventCallback === 'function') {
          mapObject.addEventListener(type, function (evt) {
            objectEventCallback.apply(null, arguments);
          });
        }
      }
    }
  }
};

export default initMapObjectEvents;
