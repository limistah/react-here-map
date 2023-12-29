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

export interface IHMapOptions {
  center: { lat: number; lng: number };
  mapType?: MAP_TYPES;
}

export type IHMapOptionsMerged = IHMapPropsRequired &
  IHMapOptions & { container: React.RefObject<HTMLDivElement> | null };

export interface IHMapState extends IBuildMapResult {}

export const HMap = (props: IHMapProps) => {
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
        interactive: props.interactive,
        useEvents: props.useEvents,
      },
      props.options
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

  // @ts-ignore
  const h = window.H;

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
          {typeof h === 'undefined' && !options && loading}
          {typeof h === 'object' && options && children}
        </div>
      </MapContext.Provider>
    )
  );
};
