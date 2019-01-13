import React, { useState } from "react";
import PropTypes from "prop-types";
import PolyLine from "../HMap/objects/PolyLine";
import Marker from "../HMap/objects/Marker";

function Router(props) {
  const {
    routeParams, // Params for the routing
    platform, // reference to the platform object
    map, // reference to the map object
    ui, // reference to the ui object
    children, // holds the children
    defaultDisplay, // determines if defaultDisplay should be used
    lineOptions, // options for the line if default display is true
    markerOptions, // options for the marker if default display is true
    icon // icon for the start and end markers
  } = props;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!routeParams) {
    throw new Error("routeParams is not set");
  }
  const [routeShape, setRouteShape] = useState([]);
  const [route, setRoute] = useState({});

  // Define a callback function to process the routing response:
  const onResult = function(result) {
    // Pick the first route from the response:
    const route = result.response.route[0];
    // Pick the route's shape:
    let _routeShape = route.shape;
    _routeShape = _routeShape.map(point => {
      const coords = point.split(",");
      return { lat: coords[0], lng: coords[1] };
    });
    // Update local state
    setRouteShape(_routeShape);
    setRoute(route);
  };

  // Get an instance of the routing service:
  const router = platform.getRoutingService();

  // Call calculateRoute() with the routing parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  router.calculateRoute(routeParams, onResult, e => console.log(e.message));

  // Renders PolyLine and Markers
  const renderDefault = () => {
    // Retrieve the mapped positions of the requested waypoints:
    const startPoint = route.waypoint[0].mappedPosition;
    const endPoint = route.waypoint[1].mappedPosition;

    // Create a marker for the start point:
    const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude };
    // Create a marker for the end point:
    const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude };

    return (
      <React.Fragment>
        <PolyLine
          points={routeShape}
          map={map}
          options={lineOptions}
          setViewBounds={true}
        />
        <Marker
          coords={startMarker}
          map={map}
          platform={platform}
          icon={icon}
          options={markerOptions}
          setViewBounds={false}
        />
        <Marker
          coords={endMarker}
          map={map}
          platform={platform}
          icon={icon}
          options={markerOptions}
          setViewBounds={false}
        />
      </React.Fragment>
    );
  };
  // Renders the child for additional manipulations
  const renderChildren = () => {
    const params = {
      map,
      platform,
      ui,
      key: route.waypoint[0].mappedPosition.latitude,
      route,
      routeShape
    };
    return React.cloneElement(children, params);
  };
  const renderResult = () => {
    return defaultDisplay ? renderDefault() : renderChildren();
  };
  return route.waypoint && routeShape.length ? renderResult() : null;
}

Router.propTypes = {
  routeParams: PropTypes.object,
  lineOptions: PropTypes.object,
  markerOptions: PropTypes.object,
  children: PropTypes.element,
  defaultDisplay: PropTypes.bool,
  icon: PropTypes.any,
  map: PropTypes.object,
  platform: PropTypes.object,
  ui: PropTypes.object
};

export default Router;
