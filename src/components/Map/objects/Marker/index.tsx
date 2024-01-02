import { useCallback } from 'react';
import { initMapObjectEvents } from '../../../libs/initMapObjectEvents';
import { mapEvents } from '../../../libs/defaults';
import { BaseMapObject } from '../BaseMapObject';
import { IHMapState } from '../../Map';
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
  const initFn = useCallback(
    (mapContext: IHMapState) => {
      const { coords, options, events, icon } = props;
      const _options = { ...options };
      if (icon) _options.icon = new H.map.Icon(icon);

      // Create an icon, an object holding the latitude and longitude, and a marker:
      const marker = new H.map.Marker(coords, _options);

      mapContext?.map?.getViewModel().setLookAtData({
        bounds: marker.getGeometry(),
      });
      mapContext.map?.setZoom(4);
      // Add event listener to the object if intention of using the object is defined
      const { useEvents, interactive } = mapContext.options || {};
      initMapObjectEvents(marker, events, {
        interactive: Boolean(interactive),
        useEvents: Boolean(useEvents),
      });
      mapContext.map?.addObject(marker);
    },
    [props.coords]
  );

  return <BaseMapObject initializeDeps={props.coords} initializeFn={initFn} />;
};
