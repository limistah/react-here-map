> This uses React Hooks. Ensure that your react installation supports Hooks API

##### Displaying route on the Map Using normal line

Shows path to between two points based on params

##### Props

- **routeParams**: PropTypes.object -
  [Officially documented route params](https://developer.here.com/documentation/routing/topics/resource-parameters-common.html)
- **lineOptions**: PropTypes.object -
  [Officially supported poly line options](https://developer.here.com/documentation/maps/topics_api/h-map-polyline-options.html)
- **icon**: PropTypes.any - Icon to be used for the marker
- **markerOptions**: PropTypes.object -
  [Officially supported marker Options](https://developer.here.com/documentation/maps/topics_api/h-map-marker-options.html)
- **children**: PropTypes.element - React element that receives
  `map, platform, ui, route, key, routeShape` as props
- **renderDefaultLine**: PropTypes.bool - Should use default renderer instead of
  a custom renderer as children
- **isoLine**: PropTypes.bool - Use IsoLine instead of a Polyline

##### Usages

###### Using the default renderer

```js
import HPlatform, {
  HMap,
  HMapRoute,
  HMapMarker,
  HMapPolyLine
} from "react-here-map";

// Create the parameters for the routing request:
var routeParams = {
  // The routing mode:
  mode: "fastest;car",
  // The start point of the route:
  waypoint0: "geo!50.1120423728813,8.68340740740811",
  // The end point of the route:
  waypoint1: "geo!52.5309916298853,13.3846220493377",
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  representation: "display"
};
const routeLineOptions = {
  style: { strokeColor: "blue", lineWidth: 10 },
  arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 }
};

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

// Handles manipulation of the path between the two points
const RouteMarker = ({ map, platform, ui, route, key, routeShape }) => {
  // Retrieve the mapped positions of the requested waypoints:
  const startPoint = route.waypoint[0].mappedPosition;
  const endPoint = route.waypoint[1].mappedPosition;

  // Create a marker for the start point:
  const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
  // Create a marker for the end point:
  const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };

  return (
    <React.Fragment>
      <HMapPolyLine points={routeShape} map={map} setViewBounds />
      <HMapMarker
        coords={startMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds
      />
      <HMapMarker
        coords={endMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds={false}
      />
    </React.Fragment>
  );
};

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapRoute
      routeParams={routeParams}
      icon={icon}
      defaultDisplay
      lineOptions={routeLineOptions}
    />
  </HMap>
</HPlatform>;
```

###### Using a custom renderer

```js
import HPlatform, {
  HMap,
  HMapRoute,
  HMapMarker,
  HMapPolyLine
} from "react-here-map";

// Create the parameters for the routing request:
var routeParams = {
  // The routing mode:
  mode: "fastest;car",
  // The start point of the route:
  waypoint0: "geo!50.1120423728813,8.68340740740811",
  // The end point of the route:
  waypoint1: "geo!52.5309916298853,13.3846220493377",
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  representation: "display"
};
const routeLineOptions = {
  style: { strokeColor: "blue", lineWidth: 10 },
  arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 }
};

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

// Handles manipulation of the path between the two points
const RouteMarker = ({ map, platform, ui, route, key, routeShape }) => {
  // Retrieve the mapped positions of the requested waypoints:
  const startPoint = route.waypoint[0].mappedPosition;
  const endPoint = route.waypoint[1].mappedPosition;

  // Create a marker for the start point:
  const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
  // Create a marker for the end point:
  const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };

  return (
    <React.Fragment>
      <HMapPolyLine points={routeShape} map={map} setViewBounds />
      <HMapMarker
        coords={startMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds
      />
      <HMapMarker
        coords={endMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds
      />
    </React.Fragment>
  );
};

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapRoute
      routeParams={routeParams}
      icon={icon}
      defaultDisplay
      lineOptions={routeLineOptions}
    >
      <RouteMarker />
    </HMapRoute>
  </HMap>
</HPlatform>;
```

#### Displaying route on the Map Using iso line

###### Using the default renderer

```js
import HPlatform, { HMap, HMapPolygon, HMapRoute } from "react-here-map";
// Create the parameters for the reverse geocoding request:
const isoRoutingParams = {
  mode: "fastest;car;",
  start: "geo!52.5,13.4",
  range: "900",
  rangetype: "time"
};

const routeLineOptions = {
  style: { strokeColor: "blue", lineWidth: 10 },
  arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 }
};
const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

const RouteMarkerIso = ({
  map,
  platform,
  ui,
  route,
  routeShape,
  center,
  component
}) => {
  return (
    <React.Fragment>
      <Polygon
        points={routeShape}
        options={polygonOptions}
        setViewBounds
        map={map}
        platform={platform}
      />
      <Marker
        coords={center}
        map={map}
        platform={platform}
        icon={icon}
        options={markerOptions}
        setViewBounds={false}
      />
    </React.Fragment>
  );
};

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    interactive
    includeUI
  >
    <HMapRoute
      routeParams={isoRoutingParams}
      icon={icon}
      isoLine
      defaultDisplay
      lineOptions={routeLineOptions}
    />
  </HMap>
</HPlatform>;
```

###### Using a custom renderer

```js
import HPlatform, { HMap, HMapPolygon, HMapRoute } from "react-here-map";
// Create the parameters for the reverse geocoding request:
const isoRoutingParams = {
  mode: "fastest;car;",
  start: "geo!52.5,13.4",
  range: "900",
  rangetype: "time"
};

const routeLineOptions = {
  style: { strokeColor: "blue", lineWidth: 10 },
  arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 }
};
const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';
const RouteMarkerIso = ({
  map,
  platform,
  ui,
  route,
  routeShape,
  center,
  component
}) => {
  return (
    <React.Fragment>
      <Polygon
        points={routeShape}
        options={polygonOptions}
        setViewBounds
        map={map}
        platform={platform}
      />
      <Marker
        coords={center}
        map={map}
        platform={platform}
        icon={icon}
        options={markerOptions}
        setViewBounds={false}
      />
    </React.Fragment>
  );
};

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    interactive
    includeUI
  >
    <HMapRoute
      routeParams={isoRoutingParams}
      icon={icon}
      defaultDisplay={false}
      isoLine
      lineOptions={routeLineOptions}
    >
      <RouteMarkerIso />
    </HMapRoute>
  </HMap>
</HPlatform>;
```
