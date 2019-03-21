"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(platform, map, includeUI, uiLang) {
  if (!includeUI) {
    throw new Error("includeUI must be set to true to initialize default UI");
  } // Create the default UI components

  return H.ui.UI.createDefault(map, platform.createDefaultLayers(), uiLang);
};

exports.default = _default;
