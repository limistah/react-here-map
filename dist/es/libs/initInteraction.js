// Add interactivity if set from the options
// interactive and useEvents must be true to use map events
var changeCursorToGrab = function changeCursorToGrab() {};
export default (function (map, interactive, useEvents, mapEvents) {
  var behavior = interactive ? new H.mapevents.Behavior(new H.mapevents.MapEvents(map)) : null;
  if (useEvents && interactive) {
    var _loop = function _loop() {
      if (mapEvents.hasOwnProperty(type)) {
        var callback = mapEvents[type];
        if (callback && typeof callback === "function") {
          map.addEventListener(type, function (evt) {
            callback.apply(null, arguments);
          });
        }
      }
    };
    for (var type in mapEvents) {
      _loop();
    }
  }
  return behavior;
});