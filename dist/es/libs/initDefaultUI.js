export default (function (platform, map, includeUI, uiLang) {
  if (!includeUI) {
    throw new Error("includeUI must be set to true to initialize default UI");
  } // Create the default UI components


  return H.ui.UI.createDefault(map, platform.createDefaultLayers(), uiLang);
});