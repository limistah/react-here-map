<div align="center">
 <h1>🗺️ { <strong>React HERE Map</strong> } 🗺️</h1>

[![npm](https://img.shields.io/npm/dt/react-here-map?color=red&label=NPM%20downloads)](https://www.npmjs.com/package/react-here-map)
[![npm](https://img.shields.io/npm/v/react-here-map?color=red&label=NPM%20package)](https://www.npmjs.com/package/react-here-map)<br>
[![contributions welcome](https://img.shields.io/badge/Contributions%3F-welcome!-brightgreen.svg)](https://github.com/limistah/react-here-map/pulls)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)](https://github.com/limistah/react-here-map/graphs/contributors)
[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)<br><br>
[![](https://img.shields.io/badge/🍔-Hamburger-yellow)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

</div>

React library for rendering and working with
[HERE Maps](https://www.here.com/).

It simplifies the use of the HERE Map JavaScript API with the help of React
components.

The components can be imported and easily rendered. It also comes with seamless
configuration and modifications.

// _add image_

<div align="center">
<h3> 
<strong>Feel like giving some support?</strong>
</h3>
<pre>
🚨 Report issues 🚨
⬅️ Make pull requests ➡️
⭐ Star this project ⭐
</pre>
</div>
<br>

## **👀 / Overview**

---

<div align="center">
<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>
</div>
<br>

## **🦺 / Requirements**

---

```bash
Before you continue, ensure you meet the following requirements:

✅ You have a basic understanding of React
✅ You are using React 16.8 or above (hooks)
✅ You have created an HERE developer account
```

#### **Can't check all boxes?**

> [Learn React](https://reactjs.org/tutorial/tutorial.html)

> [Update your project](https://create-react-app.dev/docs/updating-to-new-releases/)

> [Create an HERE Developer account](https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account)

<br>

## **📌 / Installation**

---

Using NPM:

```bash
npm install react-here-map
```

Using Yarn:

```bash
yarn add react-here-map
```

<br>

## **🕹️ / General Usage**

---

```js
// Interactive map with UI, centered and zoomed on a defined location

import React from 'react';
import { HPlatform, HMap } from 'react-here-map';

function Map() {
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      interactive
      includeUI
    >
      <HMap mapOptions={mapOptions} />
    </HPlatform>
  );
}

export default Map;
```

<br>

## **🗄️ / Folder structure**

```h
  .
  ├── 📁 example          // Example code (demo)
  ├── 📁 src
  │   ├── 📁 components
  │   ├── 📁 libs         // Helpers (setup)
  │   └── 📄 index.js     // App entrypoint (defines all components)
  ├── 👗 .editorconfig
  ├── 👗 .eslintignore
  ├── 👗 .eslintrc
  ├── 🤷 .gitignore
  ├── 👗 .prettierrc
  ├── 👗 .travis.yml
  ├── 🔑 LICENSE
  ├── 📚 README.md
  ├── ✔️ TODO.md
  ├── 📦 package.json
  └── 📦 🔑 package-lock.json
```

<br>

## **📝 / Docs**

---

The default export instantiates the HERE Map platform, which
is required before initialization of any other component:

- The `HPlatform` has to be a parent of the `HMap`.
- The `HMap` has to be a parent of all other components.

```js
// Simplified representation

import React from 'react';
import { HPlatform, HMap, ...} from 'react-here-map';

function Map() {
  return (
    <HPlatform>
      <HMap>
        <HMapMarker />
        <HMapPolyline />
        <HMapCircle />
        <HMapRectangle />
        <HMapPolygon />
        <HMapRoute />
        <HMapPlaces />
        <HMapGeoCode />
        <HMapLayer />
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

Interesting components are also exported and can be customized using supported
props.

### **Components**

1. **[HPlatform](#HPlatform)** - Platform initializer
1. **[HMap](#HMap)** - Draws the map
1. **[HMapMarker](#HMapMarker)** - Draws a marker on the map.
1. **[HMapPolyline](#HMapPolyline)** - Draws a polyline on the map.
1. **[HMapCircle](#HMapCircle)** - Draws a circle on the map.
1. **[HMapRectangle](#HMapRectangle)** - Draws a rectangle on the map.
1. **[HMapPolygon](#HMapPolygon)** - Draws a polygon on the map.
1. **[HMapRoute](#HMapRoute)** - Defines a route to locate two points.
1. **[HMapPlaces](#HMapPlaces)** - Use places.
1. **[HMapGeoCode](#HMapGeocode)** - Turns a physical address to a point on the
   map
1. **[HMapLayer](#HMapLayer)** - Add additional layers to the map.

**[Event Handling](#event-handling)** - Handling of user events with `HMap` and its objects.map.

### **Usage in details**

#### **HPlatform**

A container for all of the components in this library. Generates a platform that gets injected into all of its direct children.

```js static
// HPlatform with all possible props

import React from 'react';
import { HPlatform } from 'react-here-map';

function Map() {
  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      version='v3/3.0'
      language='EN'
      mapType='normal.map'
      interactive
      includeUI
      useLocation
      includePlaces
      useHTTPS
    >
      // All children go in here 🧒
    </HPlatform>
  );
}

export default Map;
```

| Prop name         | Description                                                                          |  Type   |  Default value   |
| ----------------- | ------------------------------------------------------------------------------------ | :-----: | :--------------: |
| **app_id**        | HERE Application ID                                                                  | String  |    _Required_    |
| **app_code**      | HERE Application Code                                                                | String  |    _Required_    |
| **apikey**        | HERE API key for usage with version 3.1                                              | String  |        -         |
| **version**       | HERE map API version                                                                 | String  |    `'v3/3.0'`    |
| **language**      | Language of the map and the UI (if included) - [Options](Language-options)           | String  | `'EN'` (English) |
| **mapType**       | Type of the map as a dot prop - [Options](####Map-types)                             | String  |  `'normal.map'`  |
| **interactive**   | Makes the map react to events (drag, click, scroll, etc.). Needed for event handling | Boolean |     `false`      |
| **includeUI**     | Add UI controls                                                                      | Boolean |     `false`      |
| **useLocation**   | Center the map on the current location of the user if permission is granted          | Boolean |     `false`      |
| **includePlaces** | Add the module for working with places                                               | Boolean |     `false`      |
| **useHTTPS**      | Load the library using HTTPS                                                         | Boolean |      `true`      |
| ~~**useCIT**~~    | use the Customer Integration Testing (CIT) instead of the Production environment     | Boolean |     `false`      |

<br>

#### Language options

```h
'EN' //English
'GER' //German
'SPA' //Spanish
'FIN' //Finish
'ITA' //Italian
'DUT' //Dutch
'POL' //Polish
'POR' //Portugese
'RUS' //Russian
'TUR' //Turkish
'CHI' //Chinese
```

#### Map types

```h
// normal.traffic, normal.base, etc.
normal: ["map", "traffic", "base", "xbase", "panorama", "labels", "transit"],

// satellite.xbase, satellite.label, etc.
satellite: ["map", "traffic", "base", "xbase", "panorama", "labels"],

// terrain.map, terrain.panorama, etc.
terrain: ["map", "traffic", "base", "xbase", "panorama", "labels"],
```

All direct children of the `HPlatform` component receive:

- **platform** A reference to H.service.platform
  [Docs](https://developer.here.com/documentation/maps/3.1.19.2/api_reference/H.service.Platform.html)
- **options** A reference to the options used to bootstrap the scripts:
  [See here](https://www.npmjs.com/package/@limistah/here-map-js)

---

<br>

#### HMap

Displays the HERE Map

```js
import React from 'react';
import { HPlatform, HMap } from 'react-here-map';

function Map() {
  const style = { width: '800px', height: '500px' };
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      includeUI
    >
      <HMap style={style} mapOptions={mapOptions}></HMap>
    </HPlatform>
  );
}

export default Map;
```

| Prop name      | Description                                                                                                           |  Type  |               Default value               |
| -------------- | --------------------------------------------------------------------------------------------------------------------- | :----: | :---------------------------------------: |
| **mapEvents**  | [Options (Official Docs)](https://developer.here.com/documentation/maps/3.1.19.0/dev_guide/topics/map-events.html)    | object |                     -                     |
| **mapOptions** | [Options (Official Docs)](https://developer.here.com/documentation/maps/3.1.19.0/dev_guide/topics/h-map-options.html) | object | `{ center: { lat: 0, lng: 0 }, zoom: 2 }` |
| **style**      | Set style options for the map, like width and height                                                                  | object |    `{ width: '100%', height: '100%' }`    |

<br>

All direct children of the `HMap` component receive:

- **map** A reference to the map object used to create the visual map.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map.html)
- **platform** A reference to H.service.platform
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-service-platform.html)
- **ui** A reference to the ui object that does inclusion of ui elements.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-ui-intro.html)
- **\_\_options** A reference to the options merged with writable defaults used
  in bootstrapping the map and its items

> if you wish to render a supported component of this library outside
> the context of the map, make sure to render it in a place where the above props can
> be passed explicitly to avoid nasty, unfriendly errors.

> In some cases, as we will soon see, there is an option for passing a custom
> component with more enhancements (defined by the programmer), these props are
> received as first class directly from the containing parent and not from HMap,
> but still holds the same object references

---

<br>

#### HMapMarker

Puts a marker on the map

```js
import React from 'react';
import { HPlatform, HMap, HMapMarker } from 'react-here-map';

function Map() {
  const coords = { lat: 52, lng: 5 };

  const icon =
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      includeUI
    >
      <HMap>
        <HMapMarker coords={coords} icon={icon}></HMapMarker>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

| Prop name         | Description                                                                                                         |                                  Type                                   | Default value  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------: | :------------: |
| **coords**        | Object containing specified `lat` (latitude) and `lng` (longitude) values                                           |                                 object                                  |   _Required_   |
| **icon**          | Icon for the marker                                                                                                 | bitmap <br>(An image URL, an SVG (string), an bitmap image or a canvas) | (default icon) |
| **options**       | [Officially documented Options](https://developer.here.com/documentation/maps/topics_api/h-map-marker-options.html) |                                 object                                  |       -        |
| **type**          | One of `undefined` \| `DOM`                                                                                         |                                 string                                  |  `undefined`   |
| **setViewBounds** | Centers the line on the map                                                                                         |                                 object                                  |     `true`     |

---

<br>

#### HMapPolyline

Draws a polyline on the map

```js
import React from 'react';
import { HPlatform, HMap, HMapPolyline } from 'react-here-map';

function Map() {
  const points = [
    { lat: 52, lng: 5 },
    { lat: 52, lng: 6 },
    { lat: 53, lng: 6 }
  ];

  const polyLineOptions = { style: { strokeColor: '#FF4507', lineWidth: 5 } };

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      includeUI
    >
      <HMap>
        <HMapPolyline points={points} options={polyLineOptions} setViewBounds />
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

| Prop name         | Description                                                                                                         |  Type  | Default value |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | :----: | :-----------: |
| **points**        | Array of (atleast 2) objects containing specified `lat` (latitude) and `lng` (longitude) values                     | Array  |  _Required_   |
| **options**       | [Options (Official Docs)](https://developer.here.com/documentation/maps/3.1.19.0/api_reference/H.map.Polyline.html) | object |       -       |
| **setViewBounds** | Centers the Polyline on the map                                                                                     | object |    `true`     |

---

<br>

#### HMapPolygon

Draws a polygon on the map

##### Props

- **points**: PropTypes.array.isRequired - Array of objects containing lat and lng
  of lat,lng string separated by comma.
- **options**: PropTypes.object - options for the polygon.

#### Usage

```js
import React from 'react';
import { HPlatform, HMap, HMapPolygon } from 'react-here-map';

function Map() {
  const points = [
    { lat: 52, lng: 5 },
    { lat: 52, lng: 6 },
    { lat: 53, lng: 6 }
  ];

  const polygonOptions = {
    style: { strokeColor: '#FF4507', fillColor: 'yellow', lineWidth: 10 }
  };

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      useHTTPS
      includeUI
    >
      <HMap>
        <HMapPolygon points={points} options={polygonOptions}></HMapPolygon>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

| Prop name         | Description                                                                                                        |  Type  | Default value |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | :----: | :-----------: |
| **points**        | Array of (atleast 2) objects containing specified `lat` (latitude) and `lng` (longitude) values                    | Array  |  _Required_   |
| **options**       | [Options (Official Docs)](https://developer.here.com/documentation/maps/3.1.19.0/api_reference/H.map.Polygon.html) | object |       -       |
| **setViewBounds** | Centers the Polygon on the map                                                                                     | object |    `true`     |

#### HMapCircle

Puts a circle on the map

##### Props

- **coords**: PropTypes.object.isRequired - Object with lat and lng for the
  circle center point on the map
- **options**: PropTypes.object - Options for the circle.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-circle-options.html)
- **radius**: PropTypes.number - The radius of the circle in kilometers
- **setViewBounds**: PropTypes.bool - Centers circle on the map. Default
  `true`

##### Usage

```js
import React from 'react';
import { HPlatform, HMap, HMapCircle } from 'react-here-map';

function Map() {
  const style = { height: '100%', width: '100%' };
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  const coords = { lat: 52, lng: 5 };

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      useHTTPS
      includeUI
    >
      <HMap style={style} mapOptions={mapOptions}>
        <HMapCircle coords={coords} radius={10}></HMapCircle>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

#### HMapRectangle

Puts a rectangle on the map

##### Props

- **points**: PropTypes.array.isRequired - Two element array with lat and lng specified. the first coord will be the top-left of the rectangle and the second the bottom-right
- **options**: PropTypes.object - Options for the rectangle.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-spatial-options.html#h-map-spatial-options)
- **setViewBounds**: PropTypes.bool - Centers the map with the circle. Default
  `true`

##### Usage

```js
import React from 'react';
import { HPlatform, HMap, HMapCircle, HMapRectangle } from 'react-here-map';

function Map() {
  const style = { height: '100%', width: '100%' };
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  const points = [
    { lat: 52, lng: 5 },
    { lat: 53, lng: 6 }
  ];

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      useHTTPS
      includeUI
    >
      <HMap style={style} mapOptions={mapOptions}>
        <HMapRectangle points={points}></HMapRectangle>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

### Event Handling

This section demonstrates how to use an event with either `HMap` component or a
map object.

#### HMap Event Handling

No additional prop is required aside from those requiredby `HMap`. Below is a
working code for a `pointerup` event:

To use an event, you have to pass interactive to the `HPlatform` and pass in
`useEvents` and `mapEvents` props to the `HMap` like this:

```js
import { HPlatform, HMap, HMapPolyline } from 'react-here-map';

<HPlatform
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  interactive // Required for events
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
    useEvents // Required for events
    mapEvents={{ pointerdown: (e) => console.log('Map Pointer Down', e) }} // event handlers
  />
</HPlatform>;
```

#### Map Object event handling

All map object handles events the same way. Since all map objects are direct
children of `HMap` and receives `HPlatform` information, `useEvents` props in
the `HMap` tells the map objects to initialize events. So, a single `useEvents`
props is sufficient for all the children. In case that only a map object is
expected to handle events, `useEvents` can be passed to the object which will
initialize events defined for that object and not on the rest of the other
sibling objects of the same `HMap` parent.

##### Usage

```js
import HPlatform, {
  HMap,
  HMapCircle,
  HMapMarker,
  HMapPolygon,
  HMapPolyline,
  HMapRectangle
} from 'react-here-map';

const rectanglePoints = [51.5072, 0, 48.8567, 2.3508];
const rectangleOptions = {
  style: {
    fillColor: '#FFFFCC',
    strokeColor: '#E8FA75',
    lineWidth: 8
  }
};
const circleCoords = { lat: 52.3667, lng: 4.9 };
const circleOptions = {
  style: {
    strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
    lineWidth: 2,
    fillColor: 'rgba(0, 128, 0, 0.7)' // Color of the circle
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
    fillColor: '#FFFFCC',
    strokeColor: '#829',
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
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includeUI
  interactive // Required for events
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
    }}
    useEvents // Required for events
    mapEvents={{ pointerdown: (e) => console.log('Map Pointer Down', e) }} // event handlers
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
      objectEvents={{
        pointerdown: (e) => console.log('Circle Pointer Down', e)
      }}
    />
    <HMapRectangle
      points={rectanglePoints}
      options={rectangleOptions}
      objectEvents={{
        pointerdown: (e) => console.log('Rectangle Pointer Down', e)
      }}
    />
    <HMapPolyline
      points={polyLinePoints}
      objectEvents={{
        pointerdown: (e) => console.log('Polyline Pointer Down', e)
      }}
    />
    <HMapPolygon
      points={polygonPoints}
      options={polygonOptions}
      objectEvents={{
        pointerdown: (e) => console.log('Polygon Pointer Down', e)
      }}
    />
    <HMapMarker
      coords={markerCoords}
      icon={markerIcon}
      objectEvents={{
        pointerdown: (e) => console.log('Marker Pointer Down', e)
      }}
    />
  </HMap>
</HPlatform>;
```

#### HMapGeoCode

##### Props

- **geoCodeParams**: PropTypes.object - Depends on the type being used.
  [Default params](https://developer.here.com/documentation/geocoder/topics/resource-geocode.html)
  to be used when reverse and landmark are falsy,
  [reverse params](https://developer.here.com/documentation/geocoder/topics/resource-reverse-geocode.html)
  to be used when reverse is set to true,
  [landmark params ](https://developer.here.com/documentation/geocoder/topics/resource-search.html)
  to be used when landmark is set to true
- **children**: PropTypes.element.isRequired - React Element that receives
  `map, platform, lat, lng` as props
- **reverse**: PropTypes.bool - Should implement reverse geo coding
- **landmark**: PropTypes.bool - Should implement landmark geo coding

##### Usage

##### Address to positions

Converts an address to a position on the map

```js
import { HPlatform, HMap, HMapGeoCode, HMapMarker } from 'react-here-map';

const geoCodeParams = {
  searchText: '200 S Mathilda Ave, Sunnyvale, CA'
};

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

// Can render any map element, make sure to pass map and platform as props to the children to avoid unwarranted behavior
const GeoMarker = ({ map, platform, ui, lat, lng, key }) => (
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
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
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

Converts a position to address(es) on the map

```js
import { HPlatform, HMap, HMapGeoCode } from 'react-here-map';
// Create the parameters for the reverse geocoding request:
const reverseGeoCodingParameters = {
  prox: '52.5309,13.3847,150',
  mode: 'retrieveAddresses',
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
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapGeoCode geoCodeParams={reverseGeoCodingParameters} reverse>
      <ReverseGeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

###### Landmark Point

Locate landmark positions on the map

```js
import { HPlatform, HMap, HMapGeoCode } from 'react-here-map';

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
  searchText: 'TXL'
};

// Child of HMapGeoCode receives same params as above.
<HPlatform
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
    }}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    <HMapGeoCode geoCodeParams={landmarkSearchParameters} landmark>
      <LandmarkGeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

#### HMapRoute

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
import React from 'react';
import { HPlatform, HMap, HMapRoute } from 'react-here-map';
import config from '../../config';

function Map() {
  const style = { height: '100%', width: '100%' };
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  const waypoints = [
    { lat: 52, lng: 5 },
    { lat: 53, lng: 6 }
  ];

  return (
    <HPlatform
      app_id={config.HERE_APP_ID}
      app_code={config.HERE_APP_CODE}
      apikey={config.HERE_API_KEY}
      interactive
      useHTTPS
      includeUI
    >
      <HMap style={style} mapOptions={mapOptions}>
        <HMapRoute
          routeParams={{
            waypoints,
            mode: 'fastest;car;traffic:disabled',
            representation: 'display'
          }}
        ></HMapRoute>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

###### Using a custom renderer

```js
import React from 'react';
import { HPlatform, HMap, HMapRoute } from 'react-here-map';
import config from '../../config';

function Map() {
  const style = { height: '100%', width: '100%' };
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  const waypoints = [
    { lat: 52, lng: 5 },
    { lat: 53, lng: 6 }
  ];

  function Route({map, platform, ui, route, key, routeShape}: any) {
    return (
      <React.Fragment>
        <HMapPolyline points={routeShape}>
      </React.Fragment>
    )
  }

  return (
    <HPlatform
      app_id={config.HERE_APP_ID}
      app_code={config.HERE_APP_CODE}
      apikey={config.HERE_API_KEY}
      interactive
      useHTTPS
      includeUI
    >
      <HMap style={style} mapOptions={mapOptions}>
        <HMapRoute
          routeParams={{
            waypoints,
            mode: 'fastest;car;traffic:disabled',
            representation: 'display'
          }}
          renderDefaultLine={false}
        >
          <Route />
        </HMapRoute>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

#### Displaying route on the Map Using iso line

###### Using the default renderer

```js
import { HPlatform, HMap, HMapPolygon, HMapRoute } from 'react-here-map';
// Create the parameters for the reverse geocoding request:
const isoRoutingParams = {
  mode: 'fastest;car;',
  start: 'geo!52.5,13.4',
  range: '900',
  rangetype: 'time'
};

const routeLineOptions = {
  style: { strokeColor: 'blue', lineWidth: 10 },
  arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
};
const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

const RouteMarkerIso = ({ map, platform, ui, route, routeShape, center }) => {
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
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
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
import { HPlatform, HMap, HMapPolygon, HMapRoute } from 'react-here-map';
// Create the parameters for the reverse geocoding request:
const isoRoutingParams = {
  mode: 'fastest;car;',
  start: 'geo!52.5,13.4',
  range: '900',
  rangetype: 'time'
};

const routeLineOptions = {
  style: { strokeColor: 'blue', lineWidth: 10 },
  arrows: { fillColor: 'white', frequency: 2, width: 0.8, length: 0.7 }
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
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includeUI
  includePlaces
>
  <HMap
    style={{
      height: '400px',
      width: '800px'
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

#### HMapLayer

Adds a layer to the map.

Individual layer holds different information

##### props

**mapLayerType**: PropTypes.string.isRequired In a dot prop form e.g
`mapLayerType="incidents", mapLayerType="normal.traffic"`

```js static
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

##### Usage

```js
import React from 'react';
import { HPlatform, HMap, HMapLayer } from 'react-here-map';

function Map() {
  const style = { height: '100%', width: '100%' };
  const mapOptions = { center: { lat: 52.092876, lng: 5.10448 }, zoom: 7 };

  const points = [
    { lat: 52, lng: 5 },
    { lat: 53, lng: 6 }
  ];

  return (
    <HPlatform
      app_id='YOUR_APP_ID'
      app_code='YOUR_APP_CODE'
      apikey='YOUR_API_KEY'
      interactive
      useHTTPS
      includeUI
    >
      <HMap style={style} mapOptions={mapOptions}>
        <HMapLayer></HMapLayer>
      </HMap>
    </HPlatform>
  );
}

export default Map;
```

#### HMapPlaces

Search for places on the map

### Props

- **library**: PropTypes.string.isRequired One of the places library supported
  by HERE maps for the requests
- **query**: PropTypes.string Passing the query externally to initiate the
  request on load after getting the location of the user

- **category**: PropTypes.string Result category

- **placeClassName**: PropTypes.string Class for the container

- **inputClassName**: PropTypes.string Class for the Input field

- **containerStyle**: PropTypes.object Styles for the container
- **inputStyle**: PropTypes.object Styles for the input

- **itemContainerClass**: PropTypes.string Result Items container class

* **itemClass**: PropTypes.string Result Items class

* **iconClass**: PropTypes.string Icon marker class name

* **inputStyle**: PropTypes.object Styles for the input

* **getItem**: PropTypes.function Callback when an item is clicked in the result

- **markerOptions**: PropTypes.object Options for the marker

- **markerIcon**: PropTypes.element Icon for the marker

- **markerType**: PropTypes.string Type of marker icon

* **multiMarker**: PropTypes.boolean allow for many markers

### Usage

```js
import { HPlatform, HMap, HMapPlaces } from 'react-here-map';

<HPlatform
  app_id='YOUR_APP_ID'
  app_code='YOUR_APP_CODE'
  apikey={'YOUR_API_KEY_FOR_V3.1'}
  useCIT
  useHTTPS
  includePlaces
  interactive
>
  <HMapPlaces library='search' />
</HPlatform>;
```

<br>

## **🧑‍💻 / Authors**

---

<div align="center">

| [<img src="https://avatars1.githubusercontent.com/u/30846935?s=400&u=6f7088c164a7859d76bfdea2ce520ed2e6c57460&v=4" width="150px;"/><br /><sub><b style="font-size:10pt">Aleem Isiaka</b></sub>](https://github.com/limistah) <br><br><img src="https://img.shields.io/badge/limistah%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/> | [<img src="https://avatars0.githubusercontent.com/u/29237894?s=500&v=4" width="150px;"/><br /><sub><b style="font-size:10pt">Robin Uitbeijerse</b></sub>](https://github.com/RobinUit)<br><br><img src="https://img.shields.io/badge/Robin__Uit%20-%231DA1F2.svg?&style=for-the-badge&logo=Twitter&logoColor=white"/> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |


</div>
<br>

## **✔ / TODO**

---

Want to know what we are working on or care to add some new features yourself?

> Check the [TODO](TODO.md)

<br>

## **📅 / Changes**

---

**06/05/2020**

- Includes support for v3.1 API key
  <br>

## **🔑 / Licence**

---

This project has been created under the MIT License.

> Check the [LICENSE](LICENSE).

<br>

<div align="center">
<h3> 
<strong>Feel like giving some support?</strong>
</h3>
<pre>
🚨 Report issues 🚨
⬅️ Make pull requests ➡️
⭐ Star this project ⭐
</pre>
<br>
</div>

**[⬆️ Back to Top ⬆️](##👀-/-Overview)**
