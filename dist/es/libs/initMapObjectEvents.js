var initMapObjectEvents = function initMapObjectEvents(mapObject, objectEvents, platformOptions) {
  var useEvents = platformOptions.useEvents,
      interactive = platformOptions.interactive,
      mapEvents = platformOptions.mapEvents;

  if (useEvents && interactive && objectEvents) {
    for (var type in mapEvents) {
      if (mapEvents.hasOwnProperty(type)) {
        (function () {
          var objectEventCallback = objectEvents[type];

          if (objectEventCallback && typeof objectEventCallback === "function") {
            mapObject.addEventListener(type, function (evt) {
              objectEventCallback.apply(null, arguments);
            });
          }
        })();
      }
    }
  }
};

module.exports = initMapObjectEvents;