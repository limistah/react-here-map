

# react-here-map

React components for rendering and working with
[Here Maps](https://www.here.com/).

It simplifies the use of the Here Map JavaScript API with the help React
components.

The components can be imported and easily rendered. It also comes with seamless
configuration and modifications.

## Demo

[See it here](https://limistah.github.io/react-here-map/)

## Installation

Using NPM:

---
```bash
npm i --save react-here-map
```
---

Using Yarn:

---
```bash
yarn add react-here-map
```
---

## General Usage

---
```js
import React from "react";
import ReactDOM from "react-dom";
import HPlatform, { HMap, HMapCircle } from "react-here-map";

const points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 },
];

ReactDOM.render(
  <HPlatform
      options={{
        apiKey: 'TIAGlD6jic7l9Aa8Of8IFxo3EUemmcZlHm_agfAm6Ew',
        appId: 'EF8K24SYpkpXUO9rkbfA',
        includePlaces: false,
        includeUI: true,
        interactive: true,
        version: 'v3/3.1'
      }}
    >
      <HMap
        options={{
          center: {
            lat: 52.5309825,
            lng: 13.3845921
          }
        }}
        style={{
          height: '480px',
          width: '100%'
        }}
        useEvents
      >
        <HMapCircle
          coords={{
            lat: 52.5309825,
            lng: 13.3845921
          }}
          events={{
            pointerdown: function noRefCheck(){},
            pointerenter: function noRefCheck(){},
            pointerleave: function noRefCheck(){},
            pointermove: function noRefCheck(){}
          }}
          options={{
            style: {
              fillColor: 'rgba(0, 128, 0, 0.7)',
              lineWidth: 4,
              strokeColor: 'rgba(55, 85, 170, 0.6)'
            }
          }}
          radius={10000}
          setVisibility
          zoom={8}
        />
      </HMap>
    </HPlatform>,
  document.getElementById("app")
);
```
---

## CHANGES

**06/05/2020**

- Includes support for V3.1 API_KEY

## Contributions

See the TODO.MD

## Licence

MIT

