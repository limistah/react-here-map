export default (appId, appCode) => {
  if (!appId || !appCode) {
    throw new Error("Options must include appId and appCode");
  }
  if (typeof H === "undefined" || !H.service) {
    throw new Error("Here Map JavaScripts is not loaded.");
  }
  return new H.service.Platform({
    app_id: appId,
    app_code: appCode,
    useCIT: true
  });
};
