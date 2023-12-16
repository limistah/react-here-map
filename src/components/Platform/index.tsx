import React, { ReactNode, useEffect, useState } from 'react';
import { ILoadHMapOptions, loadHMap } from '../libs/loadHMap';
import { initHPlatform } from '../libs/initPlatform';
import { DefaultOptionsType } from '../libs/defaults';
import { PlatformContext } from '../../contexts/platform';

export interface IHPlatform {
  children: React.ReactNode | React.ReactNode[];
  options: ILoadHMapOptions;
}

export interface IHPlatformState {
  options?: DefaultOptionsType;
  platform?: any;
  reInitMap?: () => void;
}

export const HPlatform = (props: IHPlatform) => {
  // Reload the map resources if the options changes
  useEffect(() => {
    loadHMap(props.options).then((options: DefaultOptionsType) => {
      setPlatformState({
        ...platformState,
        options,
      });
    });
  }, [props.options]);

  const initilizePlatform = () => {
    const platform = initHPlatform(platformState.options);
    setPlatformState((prevState: IHPlatformState) => ({
      ...prevState,
      platform,
    }));
  };

  const [platformState, setPlatformState] = useState<IHPlatformState>({
    reInitMap: initilizePlatform,
    platform: {},
  });

  useEffect(() => {
    // initialize the platform when the js files are loaded the options are updated
    platformState.options && initilizePlatform();
  }, [platformState.options]);

  const { platform, options } = platformState;

  return (
    <PlatformContext.Provider value={platformState}>
      {platform?.A == 'api.here.com' &&
        (options?.app_code || options?.apikey) &&
        props.children}
    </PlatformContext.Provider>
  );
};

// Use this to create A Here Map Platform
export const useHPlatform = (
  platformOptions: ILoadHMapOptions,
  children?: React.ReactNode | ReactNode[]
) => {
  return <HPlatform options={platformOptions}>{children}</HPlatform>;
};
