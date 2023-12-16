import React, { useContext, useEffect, useRef, useState } from 'react';
import { defaultOptions } from '../libs/defaults';
import { PlatformContext } from '../../contexts/platform';
import { MapContext } from '../../contexts/map';
import merge from 'lodash.merge';

export interface IHMapProps {
  loadingEl: React.ReactNode;
  style: React.CSSProperties;
  container: React.RefObject<HTMLDivElement>;
  children: React.ReactNode | React.ReactNode[];
  options: {};
}

export interface IHMapState {}

export const HMap = (props: IHMapProps) => {
  // const Platform = useHPlatform()
  const platformState = useContext(PlatformContext);

  const containerRef = props.container || useRef<HTMLDivElement>();

  const [mapState, setMapState] = useState<IHMapState>({});

  useEffect(() => {
    const mergedOptions = merge(
      {
        container,
        build: true,
      },
      props.options
    );
    const buildResult = buildMap(platformState.platform, mergedOptions);

    setMapState(buildResult);
  }, [props]);

  const { style, loadingEl, container, children } = props;
  // const { options } = this.state.builder;

  const options = {};

  const LoadingComponent = () => {
    return <div>Loading</div>;
  };

  const loading = loadingEl || <LoadingComponent />;

  // @ts-ignore
  const h = window.H;

  return (
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
  );
};
