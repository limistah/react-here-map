export default (map, interaction, callback) => {
  const MOUSE_BUTTONS = {
    LEFT: 1,
    MIDDLE: 2,
    RIGHT: 3
  };

  map.addEventListener(
    'tap',
    (e) => {
      if (e.originalEvent.which === MOUSE_BUTTONS.LEFT) {
        var coords = map.screenToGeo(
          e.currentPointer.viewportX,
          e.currentPointer.viewportY
        );

        callback('add', { lat: coords.lat, lng: coords.lng }, e);
      } else if (
        e.originalEvent.which === MOUSE_BUTTONS.RIGHT &&
        e.target instanceof H.map.Marker
      ) {
        var coords = e.target.getGeometry();

        callback('remove', { lat: coords.lat, lng: coords.lng }, e);
      } else if (e.originalEvent.which === MOUSE_BUTTONS.MIDDLE) {
        // Could allow some custom event (set by user)
      }
    },
    false
  );

  // Disable the default draggability of the underlying map
  // and calculate the offset between mouse and target's position
  // when starting to drag a marker object:
  map.addEventListener(
    'dragstart',
    (e) => {
      if (e.target instanceof H.map.Marker) {
        var coords = e.target.getGeometry();
        var targetPosition = map.geoToScreen(coords);

        e.target.offset = new H.math.Point(
          e.currentPointer.viewportX - targetPosition.x,
          e.currentPointer.viewportY - targetPosition.y
        );

        interaction.disable();

        callback('dragstart', { lat: coords.lat, lng: coords.lng }, e);
      }
    },
    false
  );

  // Re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener(
    'dragend',
    (e) => {
      if (e.target instanceof H.map.Marker) {
        var coords = e.target.getGeometry();

        interaction.enable();

        callback('dragend', { lat: coords.lat, lng: coords.lng }, e);
      }
    },
    false
  );

  // Listen to the drag event and move the position of the marker
  // as necessary
  map.addEventListener(
    'drag',
    (e) => {
      if (e.target instanceof H.map.Marker) {
        e.target.setGeometry(
          map.screenToGeo(
            e.currentPointer.viewportX - e.target.offset.x,
            e.currentPointer.viewportY - e.target.offset.y
          )
        );
      }
    },
    false
  );
};
