export default (function (options) {
  var app_id = options.app_id,
    apikey = options.apikey;
  if (!apikey || !app_id) {
    throw new Error("Options must include app_id and apiKey");
  }
  if (typeof H === "undefined" || !H.service) {
    throw new Error("Here Map JavaScripts is not loaded.");
  }
  return new H.service.Platform(options);
});