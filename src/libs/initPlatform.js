export default (options) => {
  const { app_id, apikey } = options;
  if (!apikey || !app_id) {
    throw new Error("Options must include app_id and apiKey");
  }
  if (typeof H === "undefined" || !H.service) {
    throw new Error("Here Map JavaScripts is not loaded.");
  }
  return new H.service.Platform(options);
};
