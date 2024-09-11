> This uses React Hooks. Ensure that your react installation supports The Hooks
> API

##### Props

- **geoCodeParams**: PropTypes.object - Depends on the type being used.
  [Default params](https://developer.here.com/documentation/geocoder/topics/resource-geocode.html)
  to be used when reverse and landmark are falsy,
  [reverse params](https://developer.here.com/documentation/geocoder/topics/resource-reverse-geocode.html)
  to be used when reverse is set to true,
  [landmark params ](https://developer.here.com/documentation/geocoder/topics/resource-search.html)
  to be used when landmark is set to true
- **children**: PropTypes.element.isRequired - React Element that receives
  `map, platform, lat, lng` as props
- **reverse**: PropTypes.bool - Should implement reverse geo coding
- **landmark**: PropTypes.bool - Should implement landmark geo coding

##### Usage

##### Address to positions

Converts an address to a position on the map

```js
import HPlatform, { HMap, HMapGeoCode, HMapMarker } from "react-here-map";

const geoCodeParams = {
  searchText: "200 S Mathilda Ave, Sunnyvale, CA"
};

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

// Can render any map element, make sure to pass map and platform as props to the children to avoid unwarranted behavior
const GeoMarker = ({ map, platform, ui, lat, lng, key }) => (
  <HMapMarker
    coords={{ lat, lng }}
    map={map}
    platform={platform}
    key={key}
    icon={icon}
  />
);
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
    <HMapGeoCode geoCodeParams={geoCodeParams}>
      <GeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

##### Position to address(es)

Converts a position to address(es) on the map

```js
import HPlatform, { HMap, HMapGeoCode } from "react-here-map";
// Create the parameters for the reverse geocoding request:
const reverseGeoCodingParameters = {
  prox: "52.5309,13.3847,150",
  mode: "retrieveAddresses",
  maxresults: 1
};
// Can render any map element, make sure to pass map and platform as props to the children to avoid unwarranted behavior
const ReverseGeoMarker = ({ map, platform, ui, lat, lng, location, key }) => {
  ui.addBubble(
    new H.ui.InfoBubble(
      { lat, lng },
      { content: location.Location.Address.Label }
    )
  );
  return null;
};

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
    <HMapGeoCode geoCodeParams={reverseGeoCodingParameters} reverse>
      <ReverseGeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```

###### Landmark Point

Locate landmark positions on the map

```js
import HPlatform, { HMap, HMapGeoCode } from "react-here-map";

const LandmarkGeoMarker = ({
  map,
  platform,
  ui,
  lat,
  lng,
  location,
  key,
  _location
}) => {
  ui.addBubble(new H.ui.InfoBubble({ lat, lng }, { content: _location.Name }));
  return null;
};
// Create the parameters for the landmark search request:
const landmarkSearchParameters = {
  searchText: "TXL"
};

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
    <HMapGeoCode geoCodeParams={landmarkSearchParameters} landmark>
      <LandmarkGeoMarker />
    </HMapGeoCode>
  </HMap>
</HPlatform>;
```
