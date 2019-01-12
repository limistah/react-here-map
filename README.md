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

var points = [
  { lat: 52.5309825, lng: 13.3845921 },
  { lat: 52.5311923, lng: 13.3853495 },
  { lat: 52.5313532, lng: 13.3861756 },
  { lat: 52.5315142, lng: 13.3872163 },
  { lat: 52.5316215, lng: 13.3885574 },
  { lat: 52.5320399, lng: 13.3925807 },
  { lat: 52.5321472, lng: 13.3935785 },
  { lat: 52.5323832, lng: 13.395499 },
  { lat: 52.5324261, lng: 13.3959818 },
  { lat: 52.5325012, lng: 13.397795 },
  { lat: 52.5325656, lng: 13.3986318 },
  { lat: 52.5326192, lng: 13.3989215 }
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
