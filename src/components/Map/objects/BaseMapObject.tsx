import React, { useContext, useEffect } from 'react';
import { MapContext } from '../../../contexts/map';
import { IHMapState } from '../Map';

export const BaseMapObject = ({
  initializeFn,
  initializeDeps,
}: {
  initializeFn: (ctx: IHMapState) => void;
  initializeDeps: any;
}) => {
  const mapContext = useContext(MapContext);
  if (!mapContext.map) {
    throw new Error('HMapPolyline must be a child of HMap');
  }

  useEffect(() => {
    initializeFn(mapContext);
  }, [initializeDeps]);

  return null;
};
