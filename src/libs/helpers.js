export function centerMap(map, animate, center) {
  map.setCenter(center, animate);
}

export function zoomMap(map, animate, zoom) {
  map.setZoom(zoom, animate);
}

export function recenterMap(map, animate) {
  map.setCenter(map.l.center, animate);
}

export function rezoomMap(map, animate) {
  map.setZoom(map.l.zoom, animate);
}

export function resetMap(map, animate, group) {
  group.removeAll();
  recenterMap(map, animate);
  rezoomMap(map, animate);
}

export function removeObjectFromGroup(object) {
  const group = object.getParentGroup();
  if (group) {
    group.removeObject(object);
  }
}

export function setCurrentLocation(map, animate) {
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      switch (result.state) {
        case 'granted':
        case 'prompt':
          getLocation(map, animate);
          break;
        case 'denied':
        default:
          break;
      }
    });
  }
}

function getLocation(map, animate) {
  navigator.geolocation.getCurrentPosition((location) => {
    if (
      map.l.center.lat !== location.coords.latitude ||
      map.l.center.lng !== location.coords.longitude
    ) {
      map.setCenter(
        {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        },
        animate
      );
      map.setZoom(7, animate);
    }
  });
}
