import React, { useCallback, useEffect, useState } from 'react';
import { ILoadHMapOptions, loadHMap } from '../libs/loadHMap';
import { initHPlatform } from '../libs/initPlatform';
import { DefaultOptionsType } from '../libs/defaults';
import { PlatformContext } from '../../contexts/platform';

export interface IHPlatform extends ILoadHMapOptions {
  children: React.ReactNode | React.ReactNode[];
}

export interface IHPlatformState {
  options?: DefaultOptionsType;
  platform?: any;
  reInitMap?: () => void;
}

export const HPlatform = (props: IHPlatform) => {
  const loadMapCB = useCallback(() => {
    loadHMap(props).then((options: DefaultOptionsType) => {
      const platform = initHPlatform(options);
      setPlatformState((prevState: IHPlatformState) => ({
        ...prevState,
        platform,
        options,
      }));
    });
  }, [props]);
  const [platformState, setPlatformState] = useState<IHPlatformState>({
    reInitMap: loadMapCB,
    platform: {},
  });

  useEffect(() => {
    loadMapCB();
  }, [platformState.platform.A]);
  const { platform, options } = platformState;

  return (
    <PlatformContext.Provider value={platformState}>
      {platform?.A == 'api.here.com' &&
        (options?.app_code || options?.apikey) &&
        props.children}
    </PlatformContext.Provider>
  );
};
