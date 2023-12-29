import React, { useContext, useEffect } from 'react';
import { MapContext } from '../../../../contexts/map';

export interface IHMapPolylineProps {
  points: H.geo.IPoint[];
  options: H.map.Polyline.Options;
  setViewBounds: false;
}

export const HMapPolyline = (props: IHMapPolylineProps) => {
  const mapContext = useContext(MapContext);
  if (!mapContext.map) {
    throw new Error('HMap has to be initialized before adding Map Objects');
  }

  if (!Array.isArray(props.points)) {
    throw new Error(
      'points should be an array of objects containing lat and lng properties'
    );
  }
  useEffect(() => {
    const { points, options, setViewBounds } = props;
    // Initialize a LineString and add all the points to it:
    const lineString = new H.geo.LineString();
    points.forEach(function(point) {
      lineString.pushPoint(point);
    });

    // Initialize a polyLine with the lineString:
    const polyLine = new H.map.Polyline(lineString, options);

    // Add event listener to the object if intention of using the object is defined
    // initMapObjectEvents(polyLine, objectEvents, __options);

    // Add the polyLine to the map:
    mapContext.map?.addObject(polyLine);

    if (polyLine) {
      // Zoom the map to make sure the whole polyLine is visible:
      polyLine.setVisibility(setViewBounds);
    }
  }, [props.points]);

  return null;
};
