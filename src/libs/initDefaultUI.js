import defaults from './defaults';

export default (platform, map, includeUI, language) => {
  if (!includeUI) {
    throw new Error('"includeUI" must be set to true to initialize default UI');
  }

  // Defaults UI to English when no language is specified, specified language doesn't exist or specified language doesn't have UI localization
  if (!language || !defaults.languageOptions[language]) {
    return H.ui.UI.createDefault(
      map,
      platform.createDefaultLayers(),
      defaults.languageOptions.EN
    );
  }

  // Create the UI component with the specified language
  return H.ui.UI.createDefault(
    map,
    platform.createDefaultLayers(),
    defaults.languageOptions[language]
  );
};
