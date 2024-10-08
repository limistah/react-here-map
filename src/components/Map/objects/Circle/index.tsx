import { useCallback } from 'react';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';

import React from 'react';

export interface IHMapCircleProps {
  coords: H.geo.IPoint;
  options?: H.map.Circle.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
  radius: number;
  zoom?: number;
}


export const HMapCircle = (props: IHMapCircleProps) => {
  const { coords, options, radius, events, zoom } = props;

  if (!coords.lng || !coords.lat) {
    throw new Error(
      "coords should be an object having 'lat' and 'lng' as props"
    );
  }

  if (!props.radius) {
    console.info('radius is not set, default radius of 1000 is used');
  }
  const initFn = useCallback(() => {
    const circle = new H.map.Circle(coords, radius || 1000, options);
    return circle;
  }, [coords]);

  return (
    <BaseMapObject
      initializeDeps={coords}
      initializeFn={initFn}
      events={events}
      zoom={zoom}
    />
  );
};
