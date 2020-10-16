import { removeObjectFromGroup } from './helpers';

export default (map, interaction, callbacks) => {
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

        callbacks.addMarker?.({ lat: coords.lat, lng: coords.lng });
      } else if (
        e.originalEvent.which === MOUSE_BUTTONS.RIGHT &&
        e.target instanceof H.map.Marker
      ) {
        var coords = e.target.getGeometry();
        removeObjectFromGroup(e.target);

        callbacks.removeMarker?.({ lat: coords.lat, lng: coords.lng });
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

        callbacks.dragstart?.({ lat: coords.lat, lng: coords.lng });
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

        callbacks.dragend?.({ lat: coords.lat, lng: coords.lng });
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
