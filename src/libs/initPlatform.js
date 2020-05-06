export default (options) => {
  const { app_id, app_code, apikey } = options;
  if ((!app_id || !app_code) && !apikey) {
    throw new Error("Options must include appId and appCode OR an apiKey");
  }
  if (typeof H === "undefined" || !H.service) {
    throw new Error("Here Map JavaScripts is not loaded.");
  }
  return new H.service.Platform(options);
};
