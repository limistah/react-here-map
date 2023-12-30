import { useContext, useEffect } from 'react';
import { MapContext } from '../../../../contexts/map';
import { initMapObjectEvents } from '../../../libs/initMapObjectEvents';
import { mapEvents } from '../../../libs/defaults';

export interface IHMapPolylineProps {
  points: H.geo.IPoint[];
  options?: H.map.Polyline.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
}

export const HMapPolyline = (props: IHMapPolylineProps) => {
  const mapContext = useContext(MapContext);
  if (!mapContext.map) {
    throw new Error('HMapPolyline must be a child of HMap');
  }

  if (!Array.isArray(props.points)) {
    throw new Error(
      'points should be an array of objects containing lat and lng properties'
    );
  }
  useEffect(() => {
    console.log(props);
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
  }, [props.points]);

  return null;
};
