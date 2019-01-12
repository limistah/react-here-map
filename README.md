# @limistah/react-here-map

React components for displaying and working with Here Map
It simplifies the use of the Here Map JavaScript API by incorporating them into React as components that can be imported and easily rendered with easy configuration and modifications

## Installation

`npm i --save @limistah/react-here-map`

## Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import HMap, { HMapPolyLine } from "@limistah/react-here-map";

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
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    appId={APP_ID}
    appCode={APP_CODE}
  >
    <HMapPolyLine points={points} />
  </HMap>,
  document.getElementById("app")
);
```

## Components

1. HMap - Default export from this module, should be used as a parent for other components
2. HMapPolyLine - Draws a polyline on the map
3. HMapPolygon - Draws a polygon on the map
4. HMapMarker - Puts a marker on the map

## Usage

### HMap

Displays a Map

```js
<HMap
  style={{
    height: "400px",
    width: "800px"
  }}
  appId={APP_ID}
  appCode={APP_CODE}
  mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
/>
```

### HMapPolyLine

Draws a polyline on the map

```js
const points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 }
];

<HMap
  style={{
    height: "400px",
    width: "800px"
  }}
  appId={APP_ID}
  appCode={APP_CODE}
  mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
>
  <HMapPolyLine points={points} />
</HMap>;
```

### HMapPolygon

Draws a polygon on the map

```js
const points = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];

const polygonOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#829",
    lineWidth: 8
  }
};

<HMap
  style={{
    height: "400px",
    width: "800px"
  }}
  appId={APP_ID}
  appCode={APP_CODE}
  mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
>
  <HMapPolygon
    points={polygonPoints}
    options={polygonOptions}
    setViewBounds="true"
  />
</HMap>;
```

### HMapMarker

Puts a marker on the map

```js
const coords = [{ lat: 52.5309825, lng: 13.3845921 }];
const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';
<HMap
  style={{
    height: "400px",
    width: "800px"
  }}
  appId={APP_ID}
  appCode={APP_CODE}
  mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
>
  <HMapMarker coords={coords} icon={icon} />
</HMap>;
```
