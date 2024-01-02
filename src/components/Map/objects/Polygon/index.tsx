import { useCallback } from 'react';
import { initMapObjectEvents } from '../../../libs/initMapObjectEvents';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';
import { IHMapState } from '../../Map';
import React from 'react';

export interface IHMapPolygonProps {
  points: number[] | [string];
  options?: H.map.Polyline.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
}

export const HMapPolygon = (props: IHMapPolygonProps) => {
  if (!Array.isArray(props.points)) {
    throw new Error(
      'points should be an array of objects containing lat and lng properties'
    );
  }
  const initFn = useCallback(
    (mapContext: IHMapState) => {
      const { points, options, events } = props;

      let lineString: H.geo.LineString;
      const firstEl = points[0];
      if (typeof firstEl === 'string' && firstEl.split(',').length === 2) {
        lineString = new H.geo.LineString();
        const p = points as string[];
        p.forEach(function(coords: string) {
          const c = coords.split(',').map(c => Number(c));
          // c has to be lat, lng, alt
          lineString.pushLatLngAlt.apply(lineString, [c[0], c[1], c[2]]);
        });
      } else {
        lineString = new H.geo.LineString(points as number[]);
      }

      // Initialize a LineString and add all the points to it:
      return new H.map.Polygon(lineString, options);
    },
    [props.points]
  );

  return (
    <BaseMapObject
      initializeDeps={props.points}
      initializeFn={initFn}
      events={props.events}
    />
  );
};
