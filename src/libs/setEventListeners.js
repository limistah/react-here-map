export default (builder) => {
  window.addEventListener('resize', () => builder.map.getViewPort().resize());
  builder.map.addEventListener('tap', function (evt) {
    var coord = builder.map.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY
    );
    console.log(coord.lat, coord.lng);
  });
};
