Draws a polygon on the map

### Props

- **points**: PropTypes.array.isRequired - Array containing points or an array
  of lat,lng string separated by comma.
- **options**: PropTypes.object - options for the polygon.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-spatial-options.html#h-map-spatial-options)

### Usage

```js
import HPlatform, { HMap, HMapPolygon } from "react-here-map";

const polygonPoints = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];
const polygonOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#829",
    lineWidth: 8
  }
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
    <HMapPolygon
      points={polygonPoints}
      options={polygonOptions}
      setViewBounds="true"
    />
  </HMap>
</HPlatform>;
```
