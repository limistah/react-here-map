import defaults from './defaults';

export default (platform, map, language) => {
  // Create the UI component with the specified language with English as fallback
  return H.ui.UI.createDefault(
    map,
    platform.createDefaultLayers(),
    defaults.languageOptions[language] || defaults.languageOptions.EN
  );
};
