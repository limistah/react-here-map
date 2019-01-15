export default options => {
  const { appId, appCode } = options;
  if (!appId || !appCode) {
    throw new Error("Options must include appId and appCode");
  }
  if (typeof H === "undefined" || !H.service) {
    throw new Error("Here Map JavaScripts is not loaded.");
  }
  return new H.service.Platform(options);
};
