import React from "react";
import ReactDOM from "react-dom";
import HMap from "./components/HMap";
import HMapPolyLine from "./components/HMap/objects/PolyLine";
import HMapPolygon from "./components/HMap/objects/Polygon";
import HMapCircle from "./components/HMap/objects/Circle";
import HMapRectangle from "./components/HMap/objects/Rectangle";
import HMapMarker from "./components/HMap/objects/Marker";
import HMapGeoCode from "./components/GeoCode";
import HMapRoute from "./components/Route";
import HMapLayer from "./components/Layer";

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
  { lat: 52.5326192, lng: 13.3989215 },
  { lat: 52.5325119, lng: 13.3989751 },
  { lat: 52.5323081, lng: 13.3991039 }
];

const icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

const polygonOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#829",
    lineWidth: 8
  }
};

const circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.6)", // Color of the perimeter
    lineWidth: 2,
    fillColor: "rgba(0, 128, 0, 0.7)" // Color of the circle
  }
};

const rectangleOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#E8FA75",
    lineWidth: 8
  }
};

const polygonPoints = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];

const geoCodeParams = {
  searchText: "200 S Mathilda Ave, Sunnyvale, CA"
};
const GeoMarker = ({ map, platform, ui, lat, lng, location, key }) => (
  <HMapMarker
    coords={{ lat, lng }}
    map={map}
    platform={platform}
    key={key}
    icon={icon}
  />
);

// Create the parameters for the reverse geocoding request:
const reverseGeoCodingParameters = {
  prox: "52.5309,13.3847,150",
  mode: "retrieveAddresses",
  maxresults: 1
};

const ReverseGeoMarker = ({ map, platform, ui, lat, lng, location, key }) => {
  // <HMapMarker
  //   coords={{ lat, lng }}
  //   map={map}
  //   platform={platform}
  //   key={key}
  //   icon={icon}
  // />;
  if (ui) {
    ui.addBubble(
      new H.ui.InfoBubble(
        { lat, lng },
        { content: location.Location.Address.Label }
      )
    );
  }
  return null;
};

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
  ui.addBubble(
    new H.ui.InfoBubble(
      {
        lat,
        lng
      },
      { content: _location.Name }
    )
  );
  return null;
};
// Create the parameters for the landmark search request:
const landmarkSearchParameters = {
  searchText: "TXL"
};

// Create the parameters for the routing request:
var routeParams = {
  // The routing mode:
  mode: "fastest;car",
  // The start point of the route:
  waypoint0: "geo!50.1120423728813,8.68340740740811",
  // The end point of the route:
  waypoint1: "geo!52.5309916298853,13.3846220493377",
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  representation: "display"
};

const routeLineOptions = {
  style: { strokeColor: "blue", lineWidth: 10 },
  arrows: { fillColor: "white", frequency: 2, width: 0.8, length: 0.7 }
};

const RouteMarker = ({ map, platform, ui, route, key, routeShape }) => {
  // Retrieve the mapped positions of the requested waypoints:
  const startPoint = route.waypoint[0].mappedPosition;
  const endPoint = route.waypoint[1].mappedPosition;

  // Create a marker for the start point:
  const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
  // Create a marker for the end point:
  const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };

  return (
    <React.Fragment>
      <HMapPolyLine points={routeShape} map={map} setViewBounds={true} />
      <HMapMarker
        coords={startMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds={false}
      />
      <HMapMarker
        coords={endMarker}
        map={map}
        platform={platform}
        icon={icon}
        setViewBounds={false}
      />
    </React.Fragment>
  );
};

const isoRoutingParams = {
  mode: "fastest;car;",
  start: "geo!52.5,13.4",
  range: "900",
  rangetype: "time"
};

const RouteMarkerIso = ({
  map,
  platform,
  ui,
  route,
  routeShape,
  center,
  component
}) => {
  return (
    <React.Fragment>
      <Polygon
        points={routeShape}
        options={polygonOptions}
        setViewBounds={true}
        map={map}
        platform={platform}
      />
      <Marker
        coords={center}
        map={map}
        platform={platform}
        icon={icon}
        options={markerOptions}
        setViewBounds={false}
      />
    </React.Fragment>
  );
};
ReactDOM.render(
  <HMap
    style={{
      height: "400px",
      width: "800px"
    }}
    platformOptions={{
      app_id: "2Ts3vDUTLPW8kNUtyFRY",
      app_code: "MDivMVFtNkpim-dWuetlWw",
      useCIT: true,
      useHTTPS: true
    }}
    includeUI={true}
    interactive={false}
    mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } }}
  >
    {/* <HMapPolyLine points={points} /> */}
    {/* <HMapPolygon points={polygonPoints} options={polygonOptions} /> */}
    {/* <HMapCircle
      coords={{ lat: 52.5321472, lng: 13.3935785 }}
      radius={10000}
      options={circleOptions}
    /> */}
    {/* <HMapMarker coords={{ lat: 52.5321472, lng: 13.3935785 }} icon={icon} /> */}
    {/* <HMapRectangle
      points={[53.1, 13.1, 43.1, 40.1]}
      options={rectangleOptions}
    /> */}

    {/* <HMapGeoCode geoCodeParams={geoCodeParams}>
      <GeoMarker />
    </HMapGeoCode> */}

    {/* <HMapGeoCode geoCodeParams={reverseGeoCodingParameters} reverse={true}>
      <ReverseGeoMarker />
    </HMapGeoCode> */}

    {/* <HMapGeoCode geoCodeParams={landmarkSearchParameters} landmark={true}>
      <LandmarkGeoMarker />
    </HMapGeoCode> */}

    {/* <HMapRoute
      routeParams={routeParams}
      icon={icon}
      defaultDisplay={true}
      lineOptions={routeLineOptions}
    /> */}

    {/* <HMapRoute
      routeParams={routeParams}
      icon={icon}
      defaultDisplay={false}
      lineOptions={routeLineOptions}
    >
      <RouteMarker />
    </HMapRoute> */}

    {/* <HMapRoute
      routeParams={isoRoutingParams}
      icon={icon}
      isoLine={true}
      defaultDisplay={true}
      lineOptions={routeLineOptions}
    /> */}

    {/* <HMapRoute
      routeParams={isoRoutingParams}
      icon={icon}
      defaultDisplay={false}
      isoLine={true}
      lineOptions={routeLineOptions}
    >
      <RouteMarkerIso />
    </HMapRoute> */}
    <HMapLayer mapLayerType="normal.traffic" />
  </HMap>,
  document.getElementById("app")
);
module.hot.accept();
