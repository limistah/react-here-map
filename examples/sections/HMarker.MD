Puts a marker on the map

### Props


- **coords**: PropTypes.object.isRequired Object with lat and lng for the marker
- **icon**: PropTypes.any.isRequired Icon for the marker
- **options** PropTypes.object
  [Officially documented Options](https://developer.here.com/documentation/maps/topics_api/h-map-marker-options.html)
- **type**: PropTypes.string One of `undefined` | `DOM`. Default `undefined`
- **setViewBounds**: PropTypes.bool Centers the map with the marker. Default
  `true`

### Usage

```js
import HPlatform, { HMap, HMapMarker } from "react-here-map";

const coords = { lat: 52.5309825, lng: 13.3845921 };

const icon =
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
  includePlaces
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
