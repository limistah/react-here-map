import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PolyLine from '../HMap/objects/PolyLine';
import Polygon from '../HMap/objects/Polygon';
import Marker from '../HMap/objects/Marker';
import merge from 'lodash.merge';

function Router(props) {
  const {
    routeParams,
    lineOptions,
    isoLine,
    polygonOptions,
    icon,
    markerOptions,
    renderDefaultLine,
    children,
    platform,
    map,
    ui,
    __options
  } = merge({ renderDefaultLine: true }, props);

  // Route can only be initialized inside HMap
  if (!H || !H.map || !map) {
    throw new Error('HMap has to be initialized before adding Map Objects');
  }

  if (!routeParams) {
    throw new Error('"routeParams" is not set');
  }

  if (
    (!(routeParams.waypoints instanceof Array) ||
      routeParams.waypoints.length < 2) &&
    !isoLine
  ) {
    throw new Error(
      '"waypoints" should be an array of atleast two objects with "lat" and "lng" specified'
    );
  }

  if (
    (!(routeParams.waypoints instanceof Array) ||
      routeParams.waypoints.length !== 1) &&
    isoLine
  ) {
    throw new Error(
      'isoLine requires an array of one object with "lat" and "lng" specified'
    );
  }

  const [_routeParams, setRouteParams] = useState({});
  const [resultResponse, setResultResponse] = useState({});
  const [route, setRoute] = useState({});
  const [routeShape, setRouteShape] = useState([]);
  var [component, setComponent] = useState({});
  var [center, setCenter] = useState({});

  if (routeParams !== _routeParams) {
    console.log(routeParams, _routeParams);
    return null;
  }

  const formatWaypoints = () => {
    const waypoints = routeParams.waypoints;
    delete routeParams.waypoints;
    var formattedWaypoints = {};

    waypoints.forEach((waypoint, index) => {
      var key = 'waypoint' + index;
      var value = `geo!${waypoint.lat},${waypoint.lng}`;
      formattedWaypoints[key] = value;
    });

    setRouteParams(Object.assign(routeParams, formattedWaypoints));
  };

  // Define a callback function to process the routing response:
  const onResult = function (result) {
    setResultResponse(result.response);
    let _routeShape = [];
    if (isoLine && resultResponse.isoline) {
      component = resultResponse.isoline[0].component[0];
      _routeShape = component.shape;

      const _center = new H.geo.Point(
        resultResponse.center.latitude,
        resultResponse.center.longitude
      );
      setCenter(_center);
      setComponent(component);
    } else if (!isoLine && resultResponse.route) {
      // Pick the first route from the response:
      setRoute(resultResponse.route[0]);
      // Pick the route's shape:
      _routeShape = route.shape;
      _routeShape = _routeShape.map((point) => {
        const coords = point.split(',');
        return { lat: coords[0], lng: coords[1] };
      });
    }
    // Update local state
    setRouteShape(_routeShape);
  };

  const onError = function (error) {
    throw new Error(error);
  };

  // Get an instance of the routing service:
  const router = platform.getRoutingService();

  formatWaypoints();

  if (isoLine) {
    router.calculateIsoline(_routeParams, onResult, onError);
  } else {
    router.calculateRoute(_routeParams, onResult, onError);
  }

  const renderPolygon = () => {
    return (
      <React.Fragment>
        <Polygon
          points={routeShape}
          options={polygonOptions}
          setViewBounds={true}
          map={map}
          platform={platform}
          __options={__options}
        />
        <Marker
          coords={center}
          map={map}
          platform={platform}
          icon={icon}
          options={markerOptions}
          setViewBounds={false}
          __options={__options}
        />
      </React.Fragment>
    );
  };

  // Renders PolyLine and Markers
  const renderPolyLine = () => {
    const startPoint = route.waypoint[0].mappedPosition;
    const endPoint = route.waypoint[route.waypoint.length - 1].mappedPosition;

    const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
    const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };

    return (
      <React.Fragment>
        <PolyLine
          points={routeShape}
          map={map}
          options={lineOptions}
          setViewBounds={true}
          __options={__options}
        />
        <Marker
          coords={startMarker}
          map={map}
          platform={platform}
          icon={icon}
          options={markerOptions}
          setViewBounds={false}
          __options={__options}
        />
        <Marker
          coords={endMarker}
          map={map}
          platform={platform}
          icon={icon}
          options={markerOptions}
          setViewBounds={false}
          __options={__options}
        />
      </React.Fragment>
    );
  };

  const renderDefault = () => (isoLine ? renderPolygon() : renderPolyLine());

  // Renders the child for additional manipulations
  const renderChildren = () => {
    const params = {
      map,
      platform,
      ui,
      route,
      routeShape,
      center,
      component
    };
    return React.cloneElement(children, params);
  };

  const renderResult = () => {
    return renderDefaultLine ? renderDefault() : renderChildren();
  };

  return (route.waypoint || component.shape) && routeShape.length
    ? renderResult()
    : null;
}

Router.propTypes = {
  routeParams: PropTypes.object,
  lineOptions: PropTypes.object,
  isoLine: PropTypes.bool,
  polygonOptions: PropTypes.object,
  icon: PropTypes.any,
  markerOptions: PropTypes.object,
  renderDefaultLine: PropTypes.bool,
  children: PropTypes.element,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object,
  __options: PropTypes.object
};

export default Router;

// routeParams, // Params for the routing
// platform, // reference to the platform object
// map, // reference to the map object
// ui, // reference to the ui object
// children, // holds the children
// renderDefaultLine, // determines if renderDefaultLine should be used
// isoLine, // calculate isoLine or default route
// lineOptions, // options for the line if default display is true
// polygonOptions, // options for the polygon if default display is true
// markerOptions, // options for the marker if default display is true
// icon, // icon for the start and end markers
