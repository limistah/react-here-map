/**
 * @param {object} mapObject The object to add the events to.
 * @param {object} objectEvents The events to be added to the object.
 * @param {object} platformOptions A reference to the options for the map and platform
 */
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
