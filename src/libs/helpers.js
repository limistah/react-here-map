export function recenterMap(map, animate) {
  map.setCenter(map.l.center, animate);
}

export function rezoomMap(map, animate) {
  map.setZoom(map.l.zoom, animate);
}

export function resetMap(map, group, animate) {
  group.removeAll();
  recenterMap(map, animate);
  rezoomMap(map, animate);
}
