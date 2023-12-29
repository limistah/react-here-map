var initMapObjectEvents = function initMapObjectEvents(mapObject, objectEvents, platformOptions) {
  var useEvents = platformOptions.useEvents,
    interactive = platformOptions.interactive,
    mapEvents = platformOptions.mapEvents;
  if (useEvents && interactive && objectEvents) {
    var _loop = function _loop() {
      if (mapEvents.hasOwnProperty(type)) {
        var objectEventCallback = objectEvents[type];
        if (objectEventCallback && typeof objectEventCallback === "function") {
          mapObject.addEventListener(type, function (evt) {
            objectEventCallback.apply(null, arguments);
          });
        }
      }
    };
    for (var type in mapEvents) {
      _loop();
    }
  }
};
module.exports = initMapObjectEvents;