/* eslint-disable camelcase */
/**
 * @param {object} options Items necessary to run the library
 * @property {string} options.app_id App ID from the users HERE account
 * @property {string} options.app_code App Code from the users HERE account
 * @property {string} options.apikey API key from the users HERE account
 */
export default (options) => {
  const { app_id, app_code, apikey } = options;
  if ((!app_id || !app_code) && !apikey) {
    throw new Error('Options must include appid and appcode OR apikey');
  }
  if (typeof H === 'undefined' || !H.service) {
    throw new Error('Here Map JavaScripts is not loaded.');
  }
  return new H.service.Platform(options);
};
