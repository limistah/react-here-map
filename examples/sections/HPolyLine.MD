Draws a polyline on the map


### Props

- **points**: PropTypes.array.isRequired - Array of objects containing lat and
  lng
- **options**: PropTypes.object -
  [Officially supported options](https://developer.here.com/documentation/maps/topics_api/h-map-polyline-options.html)
- **setViewBounds**: PropTypes.bool - Makes the line centered in the container.
  Default `true`

### Usage

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
    <HMapPolyLine points={points} />
  </HMap>
</HPlatform>;
```
