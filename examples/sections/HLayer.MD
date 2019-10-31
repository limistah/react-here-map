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
import HPlatform, { HMap, HMapLayer } from "react-here-map";

// Child of HMapGeoCode receives same params as above.
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
    <HMapLayer mapLayerType="normal.trafficnight" />
  </HMap>
</HPlatform>;
```
