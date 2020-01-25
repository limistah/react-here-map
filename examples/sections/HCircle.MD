Puts a circle on the map

### Props

- **coords**: PropTypes.object.isRequired - Object with lat and lng for the
  circle center point on the map
- **options**: PropTypes.object - Options for the circle.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map-circle-options.html)
- **radius**: PropTypes.number - How large should one edge of the circle to the
  center point
- **setViewBounds**: PropTypes.bool - Centers the map with the circle. Default
  `true`

### Usage

```js
import HPlatform, { HMap, HMapCircle } from "react-here-map";

const circleCoords = { lat: 52.5309825, lng: 13.3845921 };

const circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.6)", // Color of the perimeter
    lineWidth: 2,
    fillColor: "rgba(0, 128, 0, 0.7)" // Color of the circle
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
    <HMapCircle coords={circleCoords} radius={10000} options={circleOptions} />
  </HMap>
</HPlatform>;
```
