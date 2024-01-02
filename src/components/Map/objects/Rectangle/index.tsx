import { useContext, useEffect } from 'react';
import { MapContext } from '../../../../contexts/map';
import { initMapObjectEvents } from '../../../libs/initMapObjectEvents';
import { mapEvents } from '../../../libs/defaults';

export interface IHMapRectangleProps {
  points: number[];
  options?: H.map.Spatial.Options;
  setViewBounds: boolean;
  events: typeof mapEvents;
}

export const HMapRectangle = (props: IHMapRectangleProps) => {
  const mapContext = useContext(MapContext);
  if (!mapContext.map) {
    throw new Error('HMapRectangle must be a decendant of HMap');
  }

  if (!Array.isArray(props.points)) {
    throw new Error(
      'points should be an array of objects containing lat and lng properties'
    );
  }
  useEffect(() => {
    const { points, options, events } = props;
    // Get a bounding box
    const boundingBox = new H.geo.Rect(
      points[0],
      points[1],
      points[2],
      points[3]
    );
    // Initialize a LineString and add all the points to it:
    const rectangle = new H.map.Rect(boundingBox, options);
    
    mapContext?.map?.getViewModel().setLookAtData({
      bounds: rectangle.getBoundingBox(),
    });
    mapContext.map?.setZoom(4);
    // Add event listener to the object if intention of using the object is defined
    const { useEvents, interactive } = mapContext.options || {};
    initMapObjectEvents(rectangle, events, {
      interactive: Boolean(interactive),
      useEvents: Boolean(useEvents),
    });
    mapContext.map?.addObject(rectangle);
  }, [props.points]);

  return null;
};
