"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _HMap = _interopRequireDefault(require("./components/HMap"));

var _PolyLine = _interopRequireDefault(
  require("./components/HMap/objects/PolyLine")
);

var _Polygon = _interopRequireDefault(
  require("./components/HMap/objects/Polygon")
);

var _Circle = _interopRequireDefault(
  require("./components/HMap/objects/Circle")
);

var _Rectangle = _interopRequireDefault(
  require("./components/HMap/objects/Rectangle")
);

var _Marker = _interopRequireDefault(
  require("./components/HMap/objects/Marker")
);

var _GeoCode = _interopRequireDefault(require("./components/GeoCode"));

var _Route = _interopRequireDefault(require("./components/Route"));

var _Layer = _interopRequireDefault(require("./components/Layer"));

var _Platform = _interopRequireDefault(require("./components/Platform"));

var _Places = _interopRequireDefault(require("./components/Places"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var points = [
  {
    lat: 52.5309825,
    lng: 13.3845921
  },
  {
    lat: 52.5311923,
    lng: 13.3853495
  },
  {
    lat: 52.5313532,
    lng: 13.3861756
  },
  {
    lat: 52.5315142,
    lng: 13.3872163
  },
  {
    lat: 52.5316215,
    lng: 13.3885574
  },
  {
    lat: 52.5320399,
    lng: 13.3925807
  },
  {
    lat: 52.5321472,
    lng: 13.3935785
  },
  {
    lat: 52.5323832,
    lng: 13.395499
  },
  {
    lat: 52.5324261,
    lng: 13.3959818
  },
  {
    lat: 52.5325012,
    lng: 13.397795
  },
  {
    lat: 52.5325656,
    lng: 13.3986318
  },
  {
    lat: 52.5326192,
    lng: 13.3989215
  },
  {
    lat: 52.5325119,
    lng: 13.3989751
  },
  {
    lat: 52.5323081,
    lng: 13.3991039
  }
];
var icon =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';
var polygonOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#829",
    lineWidth: 8
  }
};
var circleOptions = {
  style: {
    strokeColor: "rgba(55, 85, 170, 0.6)",
    // Color of the perimeter
    lineWidth: 2,
    fillColor: "rgba(0, 128, 0, 0.7)" // Color of the circle
  }
};
var rectangleOptions = {
  style: {
    fillColor: "#FFFFCC",
    strokeColor: "#E8FA75",
    lineWidth: 8
  }
};
var polygonPoints = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];
var geoCodeParams = {
  searchText: "200 S Mathilda Ave, Sunnyvale, CA"
};

var GeoMarker = function GeoMarker(_ref) {
  var map = _ref.map,
    platform = _ref.platform,
    ui = _ref.ui,
    lat = _ref.lat,
    lng = _ref.lng,
    location = _ref.location,
    key = _ref.key;
  return _react.default.createElement(_Marker.default, {
    coords: {
      lat: lat,
      lng: lng
    },
    map: map,
    platform: platform,
    key: key,
    icon: icon
  });
}; // Create the parameters for the reverse geocoding request:

var reverseGeoCodingParameters = {
  prox: "52.5309,13.3847,150",
  mode: "retrieveAddresses",
  maxresults: 1
};

var ReverseGeoMarker = function ReverseGeoMarker(_ref2) {
  var map = _ref2.map,
    platform = _ref2.platform,
    ui = _ref2.ui,
    lat = _ref2.lat,
    lng = _ref2.lng,
    location = _ref2.location,
    key = _ref2.key;

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
        {
          lat: lat,
          lng: lng
        },
        {
          content: location.Location.Address.Label
        }
      )
    );
  }

  return null;
};

var LandmarkGeoMarker = function LandmarkGeoMarker(_ref3) {
  var map = _ref3.map,
    platform = _ref3.platform,
    ui = _ref3.ui,
    lat = _ref3.lat,
    lng = _ref3.lng,
    location = _ref3.location,
    key = _ref3.key,
    _location = _ref3._location;
  ui.addBubble(
    new H.ui.InfoBubble(
      {
        lat: lat,
        lng: lng
      },
      {
        content: _location.Name
      }
    )
  );
  return null;
}; // Create the parameters for the landmark search request:

var landmarkSearchParameters = {
  searchText: "TXL"
}; // Create the parameters for the routing request:

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
var routeLineOptions = {
  style: {
    strokeColor: "blue",
    lineWidth: 10
  },
  arrows: {
    fillColor: "white",
    frequency: 2,
    width: 0.8,
    length: 0.7
  }
};

var RouteMarker = function RouteMarker(_ref4) {
  var map = _ref4.map,
    platform = _ref4.platform,
    ui = _ref4.ui,
    route = _ref4.route,
    key = _ref4.key,
    routeShape = _ref4.routeShape;
  // Retrieve the mapped positions of the requested waypoints:
  var startPoint = route.waypoint[0].mappedPosition;
  var endPoint = route.waypoint[1].mappedPosition; // Create a marker for the start point:

  var startMarker = {
    lat: startPoint.latitude,
    lng: startPoint.longitude
  }; // Create a marker for the end point:

  var endMarker = {
    lat: endPoint.latitude,
    lng: endPoint.longitude
  };
  return _react.default.createElement(
    _react.default.Fragment,
    null,
    _react.default.createElement(_PolyLine.default, {
      points: routeShape,
      map: map,
      setViewBounds: true
    }),
    _react.default.createElement(_Marker.default, {
      coords: startMarker,
      map: map,
      platform: platform,
      icon: icon,
      setViewBounds: false
    }),
    _react.default.createElement(_Marker.default, {
      coords: endMarker,
      map: map,
      platform: platform,
      icon: icon,
      setViewBounds: false
    })
  );
};

var isoRoutingParams = {
  mode: "fastest;car;",
  start: "geo!52.5,13.4",
  range: "900",
  rangetype: "time"
};

var RouteMarkerIso = function RouteMarkerIso(_ref5) {
  var map = _ref5.map,
    platform = _ref5.platform,
    ui = _ref5.ui,
    route = _ref5.route,
    routeShape = _ref5.routeShape,
    center = _ref5.center,
    component = _ref5.component;
  return _react.default.createElement(
    _react.default.Fragment,
    null,
    _react.default.createElement(Polygon, {
      points: routeShape,
      options: polygonOptions,
      setViewBounds: true,
      map: map,
      platform: platform
    }),
    _react.default.createElement(Marker, {
      coords: center,
      map: map,
      platform: platform,
      icon: icon,
      options: markerOptions,
      setViewBounds: false
    })
  );
};

_reactDom.default.render(
  _react.default.createElement(
    _react.default.Fragment,
    null,
    _react.default.createElement(
      _Platform.default,
      {
        app_id: "2Ts3vDUTLPW8kNUtyFRY",
        app_code: "MDivMVFtNkpim-dWuetlWw",
        useCIT: true,
        useHTTPS: true,
        includePlaces: true,
        interactive: true
      },
      _react.default.createElement(_Places.default, {
        library: "search"
      })
    ),
    _react.default.createElement(
      _Platform.default,
      {
        app_id: "2Ts3vDUTLPW8kNUtyFRY",
        app_code: "MDivMVFtNkpim-dWuetlWw",
        useCIT: true,
        useHTTPS: true,
        includeUI: true,
        includePlaces: true
      },
      _react.default.createElement(
        _HMap.default,
        {
          style: {
            height: "400px",
            width: "800px"
          },
          mapOptions: {
            center: {
              lat: 52.5321472,
              lng: 13.3935785
            },
            zoom: 10
          }
        },
        _react.default.createElement(
          _Route.default,
          {
            routeParams: isoRoutingParams,
            icon: icon,
            defaultDisplay: false,
            isoLine: true,
            lineOptions: routeLineOptions
          },
          _react.default.createElement(RouteMarkerIso, null)
        ),
        _react.default.createElement(_Layer.default, {
          mapLayerType: "normal.traffic"
        })
      )
    )
  ),
  document.getElementById("app")
);

module.hot.accept();
