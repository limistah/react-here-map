import defaults from './defaults';

export default (platform, map, includeUI, language) => {
  if (!includeUI) {
    throw new Error('"includeUI" must be set to true to initialize default UI');
  }

  // Create the UI component with the specified language with English as fallback
  return H.ui.UI.createDefault(
    map,
    platform.createDefaultLayers(),
    defaults.languageOptions[language] || defaults.languageOptions.EN
  );
};
