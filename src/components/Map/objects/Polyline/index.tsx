import { useCallback } from 'react';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';
import React from 'react';

export interface IHMapPolylineProps {
  points: H.geo.IPoint[];
  options?: H.map.Polyline.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
}

export const HMapPolyline = (props: IHMapPolylineProps) => {
  if (!Array.isArray(props.points)) {
    throw new Error(
      'points should be an array of objects containing lat and lng properties'
    );
  }
  const initFn = useCallback(() => {
    const { points, options } = props;
    // Initialize a LineString and add all the points to it:
    const lineString = new H.geo.LineString();
    points.forEach(function(point) {
      lineString.pushPoint(point);
    });

    // Initialize a polyLine with the lineString:
    return new H.map.Polyline(lineString, options);
  }, [props.points]);

  return (
    <BaseMapObject
      initializeDeps={props.points}
      initializeFn={initFn}
      events={props.events}
    />
  );
};
