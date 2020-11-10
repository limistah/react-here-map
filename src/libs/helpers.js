export function resetMap(map, group, animate) {
  removeObjectFromGroup(group);
  centerMap(map, undefined, animate);
  zoomMap(map, undefined, animate);
}

export function removeObjectFromGroup(object) {
  if (object && object instanceof H.map.Object) {
    const parent = object.getParentGroup();
    if (parent) {
      parent.removeObject(object);
    }
  }
}

export function centerMap(map, center, animate) {
  if (map && map instanceof H.Map && typeof animate === 'boolean') {
    if (center && center.lat && center.lng) {
      // Center map to defined center
      map.setCenter(center, animate);
    } else {
      // Center map to last defined center
      map.setCenter(map.l.center, animate);
    }
  }
}

export function zoomMap(map, zoom, animate) {
  if (map && map instanceof H.Map && typeof animate === 'boolean') {
    if (zoom) {
      // Zoom map to defined zoom level
      map.setZoom(zoom, animate);
    } else {
      // Zoom map to last defined zoom level
      map.setZoom(map.l.zoom, animate);
    }
  }
}

export function setCurrentLocation(map, animate) {
  if (navigator.permissions && map instanceof H.Map) {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      switch (result.state) {
        case 'granted':
        case 'prompt':
          setLocation(map, animate);
          break;
        case 'denied':
        default:
          break;
      }
    });
  }
}

function setLocation(map, animate) {
  navigator.geolocation.getCurrentPosition((location) => {
    const currentLocation = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    };
    const currentCenter = { lat: map.l.center.lat, lng: map.l.center.lng };

    // Center and zoom map on currentLocation when it is not already
    if (currentLocation !== currentCenter) {
      centerMap(map, currentLocation, animate);
      zoomMap(map, 7, animate);
    }
  });
}
