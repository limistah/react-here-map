This section demonstrates how to use an event with either `HMap` component or a
map object.

### HMap Event Handling

No additional prop is required aside from those requiredby `HMap`. Below is a
working code for a `pointerup` event:

To use an event, you have to pass interactive to the `HPlatform` and pass in
`useEvents` and `mapEvents` props to the `HMap` like this:

```js
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  interactive // Required for events
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    useEvents // Required for events
    mapEvents={{ pointerdown: e => console.log("Map Pointer Down", e) }} // event handlers
  />
</HPlatform>;
```

### Map Object event handling

All map object handles events the same way. Since all map objects are direct
children of `HMap` and receives `HPlatform` information, `useEvents` props in
the `HMap` tells the map objects to initialize events. So, a single `useEvents`
props is sufficient for all the children. In case that only a map object is
expected to handle events, `useEvents` can be passed to the object which will
initialize events defined for that object and not on the rest of the other
sibling objects of the same `HMap` parent.

#### Usage

```js
import HPlatform, {
  HMap,
  HMapCircle,
  HMapMarker,
  HMapPolygon,
  HMapPolyLine,
  HMapRectangle
} from "react-here-map";


const rectanglePoints = [51.5072, 0, 48.8567, 2.3508];
const rectangleOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#E8FA75",
    lineWidth: 8
  }
};
const circleCoords = { lat: 52.3667, lng: 4.9 };
const circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.6)", // Color of the perimeter
    lineWidth: 2,
    fillColor: "rgba(0, 128, 0, 0.7)" // Color of the circle
  }
};

const polyLinePoints = [
  { lat: 52.5167, lng: 13.3833 },
  { lat: 50.0833, lng: 14.4167 },
  { lat: 52.2333, lng: 21.0167 }
];

const polygonPoints = [45.4667, 9.1833, 0, 48.1333, 11.566, 0, 50.08, 8.24, 0];
const polygonOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#829",
    lineWidth: 8
  }
};

const markerCoords = { lat: 48.2, lng: 16.3667 };

const markerIcon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includeUI
  interactive // Required for events
  includePlaces
>
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    useEvents // Required for events
    mapEvents={{ pointerdown: e => console.log("Map Pointer Down", e) }} // event handlers
    mapOptions={{
      center: { lat: 51, lng: 7 },
      zoom: 5,
      pixelRatio: window.devicePixelRatio || 1
    }}
  >
    <HMapCircle
      coords={circleCoords}
      radius={198000}
      options={circleOptions}
      objectEvents={{ pointerdown: e => console.log("Circle Pointer Down", e) }}
    />
    <HMapRectangle
      points={rectanglePoints}
      options={rectangleOptions}
      objectEvents={{
        pointerdown: e => console.log("Rectangle Pointer Down", e)
      }}
    />
    <HMapPolyLine
      points={polyLinePoints}
      objectEvents={{
        pointerdown: e => console.log("Polyline Pointer Down", e)
      }}
    />
    <HMapPolygon
      points={polygonPoints}
      options={polygonOptions}
      objectEvents={{
        pointerdown: e => console.log("Polygon Pointer Down", e)
      }}
    />
    <HMapMarker
      coords={markerCoords}
      icon={markerIcon}
      objectEvents={{ pointerdown: e => console.log("Marker Pointer Down", e) }}
    />
  </HMap>
</HPlatform>;
```
