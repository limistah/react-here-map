import { useCallback } from 'react';
import { initMapObjectEvents } from '../../../libs/initMapObjectEvents';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';
import { IHMapState } from '../../Map';
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
  const initFn = useCallback(
    (mapContext: IHMapState) => {
      const { points, options, events } = props;
      // Initialize a LineString and add all the points to it:
      const lineString = new H.geo.LineString();
      points.forEach(function(point) {
        lineString.pushPoint(point);
      });

      // Initialize a polyLine with the lineString:
      const polyLine = new H.map.Polyline(lineString, options);
      mapContext?.map?.getViewModel().setLookAtData({
        bounds: polyLine.getBoundingBox(),
      });
      mapContext.map?.setZoom(4);
      // Add event listener to the object if intention of using the object is defined
      const { useEvents, interactive } = mapContext.options || {};
      initMapObjectEvents(polyLine, events, {
        interactive: Boolean(interactive),
        useEvents: Boolean(useEvents),
      });
      mapContext.map?.addObject(polyLine);
    },
    [props.points]
  );

  return <BaseMapObject initializeDeps={props.points} initializeFn={initFn} />;
};
