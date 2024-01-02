import { useCallback } from 'react';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';
import React from 'react';

export interface IHMapMarkerProps {
  coords: H.geo.IPoint;
  options?: H.map.Marker.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
  icon?: string | HTMLImageElement | HTMLCanvasElement;
}

export const HMapMarker = (props: IHMapMarkerProps) => {
  if (!props.coords.lng || !props.coords.lat) {
    throw new Error(
      "coords should be an object having 'lat' and 'lng' as props"
    );
  }
  const initFn = useCallback(() => {
    const { coords, options, icon } = props;
    const _options = { ...options };
    if (icon) _options.icon = new H.map.Icon(icon);
    return new H.map.Marker(coords, _options);
  }, [props.coords]);

  return (
    <BaseMapObject
      initializeDeps={props.coords}
      initializeFn={initFn}
      events={props.events}
    />
  );
};
