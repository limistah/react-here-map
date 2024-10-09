import { useContext, useEffect } from 'react';
import { MAP_TYPES } from '../../../libs/defaults';
import { MapContext } from '../../../../contexts/map';
import { validateMapType } from '../../../libs/validateMapType';
import * as dotProp from 'dot-prop';
import { PlatformContext } from '../../../../contexts/platform';

export interface IHMapLayerProps {
  type: MAP_TYPES;
}

export const HMapLayer = (props: IHMapLayerProps) => {
  const { type } = props;
  const mapContext = useContext(MapContext);
  const platformContext = useContext(PlatformContext);
  if (!mapContext.map) {
    throw new Error('A map Object must be a child of <HMap />');
  }
  validateMapType(type);

  useEffect(() => {
    const defaultLayers = platformContext.platform?.createDefaultLayers();
    const mapLayer = dotProp.getProperty(defaultLayers, type);
    if (mapLayer) {
      mapContext.map?.addLayer((mapLayer as unknown) as H.map.layer.Layer);
    } else {
      console.error(type, ' is not supported as a layer.');
    }
  }, [type]);

  return null;
};
