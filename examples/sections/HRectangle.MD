Puts a rectangle on the map

### Props

- **points**: PropTypes.array.isRequired - Four element array of point defining
  the boundaries of the rectangle
- **options**: PropTypes.object - Options for the rectangle.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-spatial-options.html#h-map-spatial-options)
- **setViewBounds**: PropTypes.bool - Centers the map with the circle. Default
  `true`

### Usage

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
    <HMapRectangle points={points} options={rectangleOptions} />
  </HMap>
</HPlatform>;
```
