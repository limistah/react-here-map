export declare function HPlatform(options?: HPlatformTyping): JSX.Element;
export declare function HMap(options?: HMapTyping): JSX.Element;
export declare function HMapMarker(options?: HMapMarkerTyping): JSX.Element;
export declare function HMapPolyline(options?: HMapPolylineTyping): JSX.Element;
export declare function HMapCircle(options?: HMapCircleTyping): JSX.Element;
export declare function HMapRectangle(
  options?: HMapRectangleTyping
): JSX.Element;
export declare function HMapPolygon(options?: HMapPolygonTyping): JSX.Element;
export declare function HMapRoute(options?: HMapRouteTyping): JSX.Element;
export declare function HMapPlaces(options?: HMapPlacesTyping): JSX.Element;
export declare function HMapGeoCode(options?: HMapGeoCodeTyping): JSX.Element;
export declare function HMapLayer(options?: HMapLayerTyping): JSX.Element;
export declare function LatLng(setting: LatLng): void;

interface LatLng {
  lat: number;
  lng: number;
}

type HPlatformTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  version?: string;
  app_id: string;
  app_code: string;
  apikey?: string;
  mapType?: string;
  interactive?: boolean;
  useCIT?: boolean;
  useHTTPS?: boolean;
  useLocation?: boolean;
  includeUI?: boolean;
  language?: string;
  includePlaces?: boolean;
};

type HMapTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  mapOptions?: {
    center?: LatLng;
    zoom?: number;
  };
  mapEvents?: object;
};

type HMapMarkerTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  coords: LatLng;
  icon?: string;
  options?: object;
  type?: string;
  setViewBounds?: boolean;
  animated?: boolean;
};

type HMapPolylineTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  points: LatLng[];
  options?: object;
  setViewBounds?: boolean;
  animated?: boolean;
};

type HMapCircleTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  coords: LatLng;
  options?: object;
  radius?: number;
  setViewBounds?: boolean;
  animated?: boolean;
};

type HMapRectangleTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  points: LatLng[];
  options?: object;
  setViewBounds?: boolean;
  animated?: boolean;
};

type HMapPolygonTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  points: LatLng[];
  options?: object;
  setViewBounds?: boolean;
  animated?: boolean;
};

type HMapRouteTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  routeParams: {
    mode: string;
    waypoints: LatLng[] | LatLng;
    representation: string;
  };
  isoLine?: boolean;
  lineOptions?: object;
  markerOptions?: object;
  icons?:
    | string
    | {
        startIcon?: string;
        endIcon?: string;
        waypointIcon?: string;
        editIcon?: string;
      };
  edit?: boolean;
  renderDefaultLine?: boolean;
  animated?: boolean;
};

type HMapPlacesTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  library: string;
  query?: string;
  category?: string;
  placeClassName?: string;
  inputClassName?: string;
  containerStyle?: object;
  inputStyle?: object;
  itemContainerClass?: string;
  itemClass?: string;
  iconClass?: string;
  markerOptions?: object;
  markerIcon?: string;
  markerType?: string;
  multiMarker?: boolean;
};

type HMapGeoCodeTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  geoCodeParams: object;
  children?: object;
  type?: string;
};

type HMapLayerTyping = Pick<React.HTMLProps<HTMLElement>, any> & {
  mapLayerType: string;
};
