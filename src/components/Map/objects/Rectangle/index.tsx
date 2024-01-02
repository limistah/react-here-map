import React, { useCallback } from 'react';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';

export interface IHMapRectangleProps {
  points: number[];
  options?: H.map.Spatial.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
}

export const HMapRectangle = (props: IHMapRectangleProps) => {
  if (!Array.isArray(props.points)) {
    throw new Error(
      'points should be an array of objects containing lat and lng properties'
    );
  }
  const initFn = useCallback(() => {
    const { points, options } = props;
    // Get a bounding box
    const boundingBox = new H.geo.Rect(
      points[0],
      points[1],
      points[2],
      points[3]
    );
    // Initialize a LineString and add all the points to it:
    return new H.map.Rect(boundingBox, options);
  }, [props.points]);

  return (
    <BaseMapObject
      initializeDeps={props.points}
      initializeFn={initFn}
      events={props.events}
    />
  );
};
