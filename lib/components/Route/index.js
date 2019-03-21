"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PolyLine = _interopRequireDefault(require("../HMap/objects/PolyLine"));

var _Polygon = _interopRequireDefault(require("../HMap/objects/Polygon"));

var _Marker = _interopRequireDefault(require("../HMap/objects/Marker"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function Router(props) {
  var _merge = (0, _lodash.default)(
      {
        renderDefaultLine: true
      },
      props
    ),
    routeParams = _merge.routeParams,
    platform = _merge.platform,
    map = _merge.map,
    ui = _merge.ui,
    children = _merge.children,
    renderDefaultLine = _merge.renderDefaultLine,
    isoLine = _merge.isoLine,
    lineOptions = _merge.lineOptions,
    polygonOptions = _merge.polygonOptions,
    markerOptions = _merge.markerOptions,
    icon = _merge.icon;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!routeParams) {
    throw new Error("routeParams is not set");
  }

  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    routeShape = _useState2[0],
    setRouteShape = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    route = _useState4[0],
    setRoute = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    component = _useState6[0],
    setComponent = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
    _useState8 = _slicedToArray(_useState7, 2),
    resultResponse = _useState8[0],
    setResultResponse = _useState8[1];

  var _useState9 = (0, _react.useState)({}),
    _useState10 = _slicedToArray(_useState9, 2),
    center = _useState10[0],
    setCenter = _useState10[1]; // Define a callback function to process the routing response:

  var onResult = function onResult(result) {
    setResultResponse(result.response);
    console.log("got here");
    var _routeShape = [];

    if (isoLine && resultResponse.isoline) {
      component = resultResponse.isoline[0].component[0];
      _routeShape = component.shape;

      var _center = new H.geo.Point(
        resultResponse.center.latitude,
        resultResponse.center.longitude
      );

      setCenter(_center);
      setComponent(component);
    } else if (!isoLine && resultResponse.route) {
      // Pick the first route from the response:
      route = resultResponse.route[0]; // Pick the route's shape:

      _routeShape = route.shape;
      _routeShape = _routeShape.map(function(point) {
        var coords = point.split(",");
        return {
          lat: coords[0],
          lng: coords[1]
        };
      });
      setRoute(route);
    } // console.log(_routeShape);
    // Update local state

    setRouteShape(_routeShape);
  }; // Get an instance of the routing service:

  var router = platform.getRoutingService();

  if (isoLine) {
    // Call the Routing API to calculate an isoline:
    router.calculateIsoline(routeParams, onResult, function(e) {
      return console.log(e.message);
    });
  } else {
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routeParams, onResult, function(e) {
      return console.log(e.message);
    });
  }

  var renderPolygon = function renderPolygon() {
    return _react.default.createElement(
      _react.default.Fragment,
      null,
      _react.default.createElement(_Polygon.default, {
        points: routeShape,
        options: polygonOptions,
        setViewBounds: true,
        map: map,
        platform: platform
      }),
      _react.default.createElement(_Marker.default, {
        coords: center,
        map: map,
        platform: platform,
        icon: icon,
        options: markerOptions,
        setViewBounds: false
      })
    );
  }; // Renders PolyLine and Markers

  var renderPolyLine = function renderPolyLine() {
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
        options: lineOptions,
        setViewBounds: true
      }),
      _react.default.createElement(_Marker.default, {
        coords: startMarker,
        map: map,
        platform: platform,
        icon: icon,
        options: markerOptions,
        setViewBounds: false
      }),
      _react.default.createElement(_Marker.default, {
        coords: endMarker,
        map: map,
        platform: platform,
        icon: icon,
        options: markerOptions,
        setViewBounds: false
      })
    );
  };

  var renderDefault = function renderDefault() {
    return isoLine ? renderPolygon() : renderPolyLine();
  }; // Renders the child for additional manipulations

  var renderChildren = function renderChildren() {
    var params = {
      map: map,
      platform: platform,
      ui: ui,
      route: route,
      routeShape: routeShape,
      center: center,
      component: component
    };
    return _react.default.cloneElement(children, params);
  };

  var renderResult = function renderResult() {
    return renderDefaultLine ? renderDefault() : renderChildren();
  };

  return (route.waypoint || component.shape) && routeShape.length
    ? renderResult()
    : null;
}

Router.propTypes = {
  routeParams: _propTypes.default.object,
  lineOptions: _propTypes.default.object,
  markerOptions: _propTypes.default.object,
  children: _propTypes.default.element,
  renderDefaultLine: _propTypes.default.bool,
  isoLine: _propTypes.default.bool,
  icon: _propTypes.default.any,
  map: _propTypes.default.object,
  platform: _propTypes.default.object,
  ui: _propTypes.default.object
};
var _default = Router;
exports.default = _default;
