import hereMapJS from '@limistah/here-map-js';
import { DefaultOptionsType, defaultOptions } from './defaults';
import merge from 'lodash.merge';

// Merges the option with the defaults to create a unison and make required values available
const optionMerger = (options: ILoadHMapOptions) =>
  merge(defaultOptions, options);

export interface ILoadHMapOptions {
  version?: string; // Version of the api to load. Defaults to v3
  interactive?: boolean; // Adds interactive scripts
  includeUI?: boolean; // Should add the UI scripts
  includePlaces?: boolean; // Include the places script
}

export const loadHMap = async (
  options: ILoadHMapOptions = {
    includePlaces: false,
    includeUI: false,
    interactive: false,
    version: 'v3/3.0',
  }
): Promise<DefaultOptionsType> => {
  const mergedOptions = optionMerger(options);
  const {
    VERSION,
    version,
    interactive,
    includeUI,
    includePlaces,
  } = mergedOptions;
  // Returns async loading of the component
  // First load the core, to save us reference error if all of the libraries are loaded asynchronously due to race conditions
  return hereMapJS({
    includeUI,
    includePlaces,
    interactive,
    version: version || VERSION,
  }).then(() => mergedOptions);
};
