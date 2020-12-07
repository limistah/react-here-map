/**
 * @param {object} map The map object to add the eventlisteners to.
 */
export default (map) => {
  // Automatically resize the map when the window size changes.
  window.addEventListener('resize', () => map.getViewPort().resize(), false);
};
