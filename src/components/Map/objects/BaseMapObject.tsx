import React, { useContext, useEffect } from 'react';
import { MapContext } from '../../../contexts/map';
import { IHMapState } from '../Map';
import { initMapObjectEvents } from '../../libs/initMapObjectEvents';
import { mapEvents } from '../../libs/defaults';

type Object = H.map.Circle | H.map.Marker | H.map.Polyline | H.map.Polygon;

interface Props {
  initializeFn: (ctx: IHMapState) => Object;
  initializeDeps: any;
  events: typeof mapEvents;
  zoom?: number;
}

export const BaseMapObject = ({
  initializeFn,
  initializeDeps,
  events,
  zoom,
}: Props) => {
  const mapContext = useContext(MapContext);
  if (!mapContext.map) {
    throw new Error('A map Object must be a child of HMap');
  }

  useEffect(() => {
    const object = initializeFn(mapContext);
    mapContext?.map?.getViewModel().setLookAtData({
      bounds: object.getGeometry(),
    });
    mapContext.map?.setZoom(zoom || 4);
    // Add event listener to the object if intention of using the object is defined
    const { useEvents, interactive } = mapContext.options || {};
    initMapObjectEvents(object, events, {
      interactive: Boolean(interactive),
      useEvents: Boolean(useEvents),
    });
    mapContext.map?.addObject(object);
  }, [initializeDeps]);

  return null;
};
