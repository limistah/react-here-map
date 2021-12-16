function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from "react";
import PropTypes from "prop-types";
import PolyLine from "../HMap/objects/PolyLine";
import Polygon from "../HMap/objects/Polygon";
import Marker from "../HMap/objects/Marker";
import merge from "lodash.merge";

function Router(props) {
  var _merge = merge({
    renderDefaultLine: true
  }, props),
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

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      routeShape = _useState2[0],
      setRouteShape = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      route = _useState4[0],
      setRoute = _useState4[1];

  var _useState5 = useState({}),
      _useState6 = _slicedToArray(_useState5, 2),
      component = _useState6[0],
      setComponent = _useState6[1];

  var _useState7 = useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      resultResponse = _useState8[0],
      setResultResponse = _useState8[1];

  var _useState9 = useState({}),
      _useState10 = _slicedToArray(_useState9, 2),
      center = _useState10[0],
      setCenter = _useState10[1]; // Define a callback function to process the routing response:


  var onResult = function onResult(result) {
    setResultResponse(result.response);
    var _routeShape = [];

    if (isoLine && resultResponse.isoline) {
      component = resultResponse.isoline[0].component[0];
      _routeShape = component.shape;

      var _center = new H.geo.Point(resultResponse.center.latitude, resultResponse.center.longitude);

      setCenter(_center);
      setComponent(component);
    } else if (!isoLine && resultResponse.route) {
      // Pick the first route from the response:
      route = resultResponse.route[0]; // Pick the route's shape:

      _routeShape = route.shape;
      console.log(_routeShape);
      _routeShape = _routeShape.map(function (point) {
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

  if (isoLine) {// Call the Routing API to calculate an isoline:
    // router.calculateIsoline(routeParams, onResult, e => console.log(e.message));
  } else {// Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    // router.calculateRoute(routeParams, onResult, e => console.log(e.message));
  }

  var renderPolygon = function renderPolygon() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Polygon, {
      points: routeShape,
      options: polygonOptions,
      setViewBounds: true,
      map: map,
      platform: platform
    }), /*#__PURE__*/React.createElement(Marker, {
      coords: center,
      map: map,
      platform: platform,
      icon: icon,
      options: markerOptions,
      setViewBounds: false
    }));
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PolyLine, {
      points: routeShape,
      map: map,
      options: lineOptions,
      setViewBounds: true
    }), /*#__PURE__*/React.createElement(Marker, {
      coords: startMarker,
      map: map,
      platform: platform,
      icon: icon,
      options: markerOptions,
      setViewBounds: false
    }), /*#__PURE__*/React.createElement(Marker, {
      coords: endMarker,
      map: map,
      platform: platform,
      icon: icon,
      options: markerOptions,
      setViewBounds: false
    }));
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
    return /*#__PURE__*/React.cloneElement(children, params);
  };

  var renderResult = function renderResult() {
    return renderDefaultLine ? renderDefault() : renderChildren();
  };

  return (route.waypoint || component.shape) && routeShape.length ? renderResult() : null;
}

Router.propTypes = {
  routeParams: PropTypes.object,
  lineOptions: PropTypes.object,
  markerOptions: PropTypes.object,
  children: PropTypes.element,
  renderDefaultLine: PropTypes.bool,
  isoLine: PropTypes.bool,
  icon: PropTypes.any,
  map: PropTypes.object,
  platform: PropTypes.object,
  ui: PropTypes.object
};
export default Router;