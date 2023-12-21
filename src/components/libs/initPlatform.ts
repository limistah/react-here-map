import { DefaultOptionsType } from './defaults';

export const initHPlatform = (options?: DefaultOptionsType) => {
  const { app_id, app_code, apikey } = options || {};
  if ((!app_id || !app_code) && !apikey) {
    throw new Error('Options must include appId and appCode OR an apiKey');
  }
  // @ts-ignore
  const h = window.H;
  if (typeof h === 'undefined' || !h.service) {
    throw new Error('Here Map JavaScript files are not loaded.');
  }
  return new h.service.Platform({ apikey });
};
