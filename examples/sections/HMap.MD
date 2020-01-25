Displays a Map for the types passed as props or default `normal.map`

Map types

```js static
{
  normal: ["map", "traffic", "panorama", "transit", "base", "xbase", "labels"],
  satellite: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  terrain: ["xbase", "base", "map", "traffic", "panorama", "labels"],
  incidents: true
}
```

All direct children of `HMap` component receives:

- **map** A reference to the map object used to create the visual map.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-map.html)
- **platform** A reference to H.service.platform
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-service-platform.html)
- **ui** A reference to the ui object that does inclusion of ui elements.
  [Docs](https://developer.here.com/documentation/maps/topics_api/h-ui-intro.html)
- **\_\_options** A reference to the options merged with writable defaults used
  in bootsrapping the map and its items

_In any case you wish to render a supported component of this library outside
the context of the map, make sure to render in a place where the above props can
be passed explicitly to avoid nasty, unfriendly errors._

_In some cases as we will soon see, there is an option for passing a custom
component with more enhancements (defined by the programmer), these props are
received as first class directly from the containing parent and not from HMap,
but still holds same object's reference_

### props

- **mapEvents** PropTypes.object -
  [officially supported events](https://developer.here.com/documentation/maps/topics/events.html)
- **mapOptions** PropTypes.object -
  [officially supported options](https://developer.here.com/documentation/maps/topics_api/h-map-options.html)

```js
import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

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
  />
</HPlatform>;
```