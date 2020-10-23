export default (builder) => {
  // Set changes to UI or Map style or placement
  var zoomUI = builder.ui.getControl('zoom');
  zoomUI.setAlignment('right-bottom');
};
