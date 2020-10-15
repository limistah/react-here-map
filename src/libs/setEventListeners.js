export default (builder) => {
  const map = builder.map;

  // Automatically resize the map when the windows size changes.
  window.addEventListener('resize', () => map.getViewPort().resize(), false);
};
