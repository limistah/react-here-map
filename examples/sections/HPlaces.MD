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
import HPlatform, { HMap, HMapPlaces } from "react-here-map";

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includePlaces
  interactive
>
  <HMapPlaces library="search" />
</HPlatform>;
```
