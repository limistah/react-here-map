import React, { useContext, useEffect, useRef, useState } from 'react';
import { MAP_TYPES, defaultOptions } from '../libs/defaults';
import { PlatformContext } from '../../contexts/platform';
import { MapContext } from '../../contexts/map';
import merge from 'lodash.merge';
import { IBuildMapResult, buildMap } from '../libs/buildMap';

export interface IHMapProps {
  loadingEl?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  options?: IHMapOptions;
  uiLang?: string;
  ref?: React.RefObject<HTMLDivElement> | null;
  build?: boolean;
  interactive?: boolean;
  useEvents?: boolean;
}

export type IHMapPropsRequired = Omit<
  IHMapProps,
  'loadingEl' | 'style' | 'children' | 'options' | 'ref'
>;

export type IHMapOptions = H.Map.Options & {
  mapType?: MAP_TYPES;
};

export type IHMapOptionsMerged = IHMapPropsRequired & {
  container: React.RefObject<HTMLDivElement> | null;
};

export interface IHMapState extends IBuildMapResult {}

export const HMap = (props: IHMapProps) => {
  // props.options?.center
  // const Platform = useHPlatform()
  const platformState = useContext(PlatformContext);

  const [mapState, setMapState] = useState<IHMapState>({
    map: null,
    ui: null,
    options: undefined,
    interaction: null,
  });

  const containerRef = props.ref || useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mergedOptions = merge(
      {
        container: containerRef,
        build: true,
      },
      platformState.options,
      {
        mapOptions: {
          ...platformState.options?.mapOptions,
          ...props.options,
        },
      },
      {
        interactive: props.interactive,
        useEvents: props.useEvents,
      }
    );

    const buildResult = buildMap(platformState.platform, mergedOptions);

    setMapState(buildResult);
  }, []);

  const { style, loadingEl, children } = props;
  // const { options } = this.state.builder;

  const options = {};

  const LoadingComponent = () => {
    return <div>Loading</div>;
  };

  const loading = loadingEl || <LoadingComponent />;

  return (
    // only render map provider when there is a platform state
    platformState.platform && (
      <MapContext.Provider value={mapState}>
        <div
          id={defaultOptions.containerId}
          className={defaultOptions.defaultClassName}
          style={style}
          ref={containerRef}
        >
          {typeof H === 'undefined' && !options && loading}
          {typeof H === 'object' && mapState.map && options && children}
        </div>
      </MapContext.Provider>
    )
  );
};
