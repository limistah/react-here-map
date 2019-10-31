export default (function (options) {
  var app_id = options.app_id,
      app_code = options.app_code;

  if (!app_id || !app_code) {
    throw new Error("Options must include appId and appCode");
  }

  if (typeof H === "undefined" || !H.service) {
    throw new Error("Here Map JavaScripts is not loaded.");
  }

  return new H.service.Platform(options);
});