# react-here-map

React components for displaying and working with Here Map.
It simplifies the use of the Here Map JavaScript API through incorporating them into React as components, which can be imported and easily rendered with easy configuration and modifications.

## Installation

`npm i --save react-here-map`

## General Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

const points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 }
];

ReactDOM.render(
  <HPlatform
    app_id="YOUR_APP_ID"
    app_code="YOUR_APP_CODE"
    useCIT={true}
    useHTTPS={true}
    includeUI={true}
    includePlaces={true}
  >
    <HMap
      style={{
        height: "400px",
        width: "800px"
      }}
      mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 }, zoom: 10 }}
    >
      <HMapPolyLine points={points} />
    </HMap>
  </HPlatform>,
  document.getElementById("app")
);
```

## Components

1. **[HPlatform](#HPlatform)** - Platform initializer. All major components should be its child.
1. **[HMap](#hmap)** - Default export from this module, should be used as a parent for other components
1. **[HMapPolyLine](#hmappolyline)** - Draws a polyline on the map. A direct child of the map
1. **[HMapPolygon](#hmappolygon)** - Draws a polygon on the map. A direct child of the map
1. **[HMapMarker](#hmapmarker)** - Puts a marker on the map. A direct child of the map
1. **[HMapCircle](#hmapcircle)** - Draws a circle on the map. A direct child of the map
1. **[HMapRectangle](#hmaprectangle)** - Draws a rectangle on the map. A direct child of the map
1. **[HMapGeoCode](#hmapgeocode)** - Turns a physical address to a point on the map
1. **[HMapRoute](#hmaproute)** - Defines a route to locate two points. A direct child of the map
1. **[HMapLayer](#hmaplayer)** - Adds additional informational layer on the map. A direct child of the map

## Usage in details

### HPlatform

A container for all of the components in this library. Generates a platform that are injected into all of its direct children.

```js
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  {/*Children come in here*/}
</HPlatform>
```

All direct children of `HPlatform` component receives:

- **platform** A reference to H.service.platform [Docs](https://developer.here.com/documentation/maps/topics_api/h-service-platform.html)
- **options** A reference to the options used to bootstrap the scripts. [See here](https://www.npmjs.com/package/here-map-js):

#### props

Props were determined by the options required for initializing the platform.

- **version** PropTypes.string - One of the supported version. Defaults to `'v3/3.0'`
- **app_id** PropTypes.string.isRequired - Application ID from account dashboard
- **app_code** PropTypes.string.isRequired - Application Code from account dashboard
- **mapType** PropTypes.string - One of the above types accessed as a dot prop. Default `'normal.map'`
- **interactive** PropTypes.bool - Makes the map react to events. Needed for event handling
- **includeUI** PropTypes.bool - Add the UI controls
- **includePlaces** PropTypes.bool - Add the module for working with places
- **useCIT** PropTypes.boolean - Default to `true`
- **useHTTPS** PropTypes.boolean - Load the library using HTTPS. Default to `true`

### HMap

Displays a Map for the types passed as props or default `normal.map`

Map types

```js
{
  normal: ["map", "traffic", "panorama", "transit", "base", "xbase", "labels"],
  satellite: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  terrain: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  incidents: true
}
```

All direct children of `HMap` component receives:

- **map** A reference to the map object used to create the visual map. [Docs](https://developer.here.com/documentation/maps/topics_api/h-map.html)
- **platform** A reference to H.service.platform [Docs](https://developer.here.com/documentation/maps/topics_api/h-service-platform.html)
- **ui** A reference to the ui object that does inclusion of ui elements. [Docs](https://developer.here.com/documentation/maps/topics_api/h-ui-intro.html)
- **\_\_options** A reference to the options merged with writable defaults used in bootsrapping the map and its items

_In any case you wish to render a supported component of this library outside the context of the map, make sure to render in a place where the above props can be passed explicitly to avoid nasty, unfriendly errors._

_In some cases as we will soon see, there is an option for passing a custom component with more enhancements (defined by the programmer), these props are received as first class directly from the containing parent and not from HMap, but still holds same object's reference_

#### props

- **mapEvents** PropTypes.object - [officially supported events](https://developer.here.com/documentation/maps/topics/events.html)
- **mapOptions** PropTypes.object - [officially supported options](https://developer.here.com/documentation/maps/topics_api/h-map-options.html)

```js
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  />
</HPlatform>
```

### HMapPolyLine

Draws a polyline on the map

#### Props

- **points**: PropTypes.array.isRequired - Array of objects containing lat and lng
- **options**: PropTypes.object - [Officially supported options](https://developer.here.com/documentation/maps/topics_api/h-map-polyline-options.html)
- **setViewBounds**: PropTypes.bool - Makes the line centered in the container. Default `true`

#### Usage

```js
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";
const points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 }
];

<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapPolyLine points={points} />
  </HMap>
  ;
</HPlatform>;
```

### HMapPolygon

Draws a polygon on the map

#### Props

- **points**: PropTypes.array.isRequired - Array containing points or an array of lat,lng string separated by comma.
- **options**: PropTypes.object - options for the polygon. [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-spatial-options.html#h-map-spatial-options)

#### Usage

```js
import HPlatform, { HMap, HMapPolygon } from "react-here-map";
const points = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];
// const points = ['52,13']
const polygonOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#829",
    lineWidth: 8
  }
};
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapPolygon
      points={polygonPoints}
      options={polygonOptions}
      setViewBounds="true"
    />
  </HMap>
</HPlatform>;
```

### HMapMarker

Puts a marker on the map

#### Props

- **coords**: PropTypes.object.isRequired Object with lat and lng for the marker
- **icon**: PropTypes.any.isRequired Icon for the marker
- **options** PropTypes.object [Officially documented Options](https://developer.here.com/documentation/maps/topics_api/h-map-marker-options.html)
- **type**: PropTypes.string One of `undefined` | `DOM`. Default `undefined`
- **setViewBounds**: PropTypes.bool Centers the map with the marker. Default `true`

### Usage

```js
import HPlatform, { HMap, HMapMarker } from "react-here-map";
const coords = [{ lat: 52.5309825, lng: 13.3845921 }];
const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapMarker coords={coords} icon={icon} />
  </HMap>
</HPlatform>;
```

### HMapCircle

Puts a circle on the map

#### Props

- **coords**: PropTypes.object.isRequired - Object with lat and lng for the circle center point on the map
- **options**: PropTypes.object - Options for the circle. [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-circle-options.html)
- **radius**: PropTypes.number - How large should one edge of the circle to the center point
- **setViewBounds**: PropTypes.bool - Centers the map with the circle. Default `true`

#### Usage

```js
import HPlatform, { HMap, HMapCircle } from "react-here-map";

const coords = [{ lat: 52.5309825, lng: 13.3845921 }];

const circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.6)", // Color of the perimeter
    lineWidth: 2,
    fillColor: "rgba(0, 128, 0, 0.7)" // Color of the circle
  }
};
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapCircle coords={cords} radius={10000} options={circleOptions} />
  </HMap>
</HPlatform>;
```

### HMapRectangle

Puts a rectangle on the map

#### Props

- **points**: PropTypes.array.isRequired - Four element array of point defining the boundaries of the rectangle
- **options**: PropTypes.object - Options for the rectangle. [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-spatial-options.html#h-map-spatial-options)
- **setViewBounds**: PropTypes.bool - Centers the map with the circle. Default `true`

#### Usage

```js
import HPlatform, { HMap, HMapRectangle } from "react-here-map";

const points = [53.1, 13.1, 43.1, 40.1];
const rectangleOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#E8FA75",
    lineWidth: 8
  }
};
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapRectangle points={points} options={rectangleOptions} />
  </HMap>
</HPlatform>;
```

### HMapGeoCode

> This uses React Hooks. Ensure that your react installation supports The Hooks API

#### Props

- **geoCodeParams**: PropTypes.object - Depends on the type being used. [Default params](https://developer.here.com/documentation/geocoder/topics/resource-geocode.html) to be used when reverse and landmark are falsy, [reverse params](https://developer.here.com/documentation/geocoder/topics/resource-reverse-geocode.html) to be used when reverse is set to true, [landmark params ](https://developer.here.com/documentation/geocoder/topics/resource-search.html) to be used when landmark is set to true
- **children**: PropTypes.element.isRequired - React Element that receives `map, platform, lat, lng` as props
- **reverse**: PropTypes.bool - Should implement reverse geo coding
- **landmark**: PropTypes.bool - Should implement landmark geo coding

#### Usage

##### Address to positions

Converts an address to a position on the map

```js
import HPlatform, {
  HMap,
  HMapGeoCode,
  HMapMarker
} from "react-here-map";

const geoCodeParams = {
  searchText: "200 S Mathilda Ave, Sunnyvale, CA"
};
// Can render any map element, make sure to pass map and platform as props to the children to avoid unwarranted behavior
const GeoMarker = ({ map, platform, ui, lat, lng }) => (
  <HMapMarker
    coords={{ lat, lng }}
    map={map}
    platform={platform}
    key={key}
    icon={icon}
  />
);
// Child of HMapGeoCode receives same params as above.
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapGeoCode geoCodeParams={geoCodeParams}>
      <GeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

##### Position to address(es)

Converts an position to address(es) on the map

```js
import HPlatform, { HMap } from "react-here-map";
// Create the parameters for the reverse geocoding request:
const reverseGeoCodingParameters = {
  prox: "52.5309,13.3847,150",
  mode: "retrieveAddresses",
  maxresults: 1
};
// Can render any map element, make sure to pass map and platform as props to the children to avoid unwarranted behavior
const ReverseGeoMarker = ({ map, platform, ui, lat, lng, location, key }) => {
  ui.addBubble(
    new H.ui.InfoBubble(
      { lat, lng },
      { content: location.Location.Address.Label }
    )
  );
  return null;
};

// Child of HMapGeoCode receives same params as above.
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapGeoCode geoCodeParams={reverseGeoCodingParameters} reverse={true}>
      <ReverseGeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

##### Landmark Point

Locate landmark positions on the map

```js
import HPlatform, { HMap } from "react-here-map";

const LandmarkGeoMarker = ({
  map,
  platform,
  ui,
  lat,
  lng,
  location,
  key,
  _location
}) => {
  ui.addBubble(new H.ui.InfoBubble({ lat, lng }, { content: _location.Name }));
  return null;
};
// Create the parameters for the landmark search request:
const landmarkSearchParameters = {
  searchText: "TXL"
};

// Child of HMapGeoCode receives same params as above.
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapGeoCode geoCodeParams={landmarkSearchParameters} landmark={true}>
      <ReverseGeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

### HMapRoute

> This uses React Hooks. Ensure that your react installation supports Hooks API

#### Displaying route on the Map Using normal line

Shows path to between two points based on params

#### Props

- **routeParams**: PropTypes.object - [Officially documented route params](https://developer.here.com/documentation/routing/topics/resource-parameters-common.html)
- **lineOptions**: PropTypes.object - [Officially supported poly line options](https://developer.here.com/documentation/maps/topics_api/h-map-polyline-options.html)
- **icon**: PropTypes.any - Icon to be used for the marker
- **markerOptions**: PropTypes.object - [Officially supported marker Options](https://developer.here.com/documentation/maps/topics_api/h-map-marker-options.html)
- **children**: PropTypes.element - React element that receives `map, platform, ui, route, key, routeShape` as props
- **renderDefaultLine**: PropTypes.bool - Should use default renderer instead of a custom renderer as children
- **isoLine**: PropTypes.bool - Use IsoLine instead of a Polyline

#### Usages

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
      <HMapPolyLine points={routeShape} map={map} setViewBounds={true} />
      <HMapMarker
        coords={startMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds={false}
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

// 1. Using a custom renderer

<HMapRoute
  routeParams={routeParams}
  icon={icon}
  defaultDisplay={false}
  lineOptions={routeLineOptions}
>
  <RouteMarker />
</HMapRoute>;

// Using default renderer, no children/child is required
<HMapRoute
  routeParams={routeParams}
  icon={icon}
  defaultDisplay={true}
  lineOptions={routeLineOptions}
/>;
```

#### Displaying route on the Map Using iso line

```js
import HPlatform, {
  HMap,
  HMapPolygon,
  HMapRoute
} from "react-here-map";
// Create the parameters for the reverse geocoding request:
const isoRoutingParams = {
  mode: "fastest;car;",
  start: "geo!52.5,13.4",
  range: "900",
  rangetype: "time"
};

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
        setViewBounds={true}
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

// Using default display
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    interactive={true}
    includeUI={true}
  >
    <HMapRoute
      routeParams={isoRoutingParams}
      icon={icon}
      isoLine={true}
      defaultDisplay={true}
      lineOptions={routeLineOptions}
    />
  </HMap>
  ; // Using a custom display
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    interactive={true}
    includeUI={true}
  >
    <HMapRoute
      routeParams={isoRoutingParams}
      icon={icon}
      defaultDisplay={false}
      isoLine={true}
      lineOptions={routeLineOptions}
    >
      <RouteMarkerIso />
    </HMapRoute>
  </HMap>
</HPlatform>;
```

### HMapLayer

Adds a layer to the map.

Individual layer holds different information

#### props

**mapLayerType**: PropTypes.string.isRequired In a dot prop form e.g `mapLayerType="incidents", mapLayerType="normal.traffic"`

```js
{
  normal: [
    "xbase",
    "xbasenight",
    "base",
    "basenight",
    "map",
    "mapnight",
    "traffic",
    "trafficnight",
    "transit",
    "panorama",
    "panoramanight",
    "labels",
    "metaInfo"
  ],
  satellite: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  terrain: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  incidents: true
}
```

#### Usage

```js
import HPlatform, { HMap, HMapLayer } from "react-here-map";
<HPlatform
  app_id="YOUR_APP_ID"
  app_code="YOUR_APP_CODE"
  useCIT={true}
  useHTTPS={true}
  includeUI={true}
  includePlaces={true}
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapLayer mapLayerType="normal.trafficnight" />
  </HMap>
  ;
</HPlatform>;
```
