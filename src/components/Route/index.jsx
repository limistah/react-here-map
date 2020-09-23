import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PolyLine from '../HMap/objects/PolyLine';
import Polygon from '../HMap/objects/Polygon';
import Marker from '../HMap/objects/Marker';
import merge from 'lodash.merge';
import _ from 'lodash';

function Router(props) {
  const {
    routeParams,
    lineOptions,
    isoLine,
    polygonOptions,
    icons,
    markerOptions,
    renderDefaultLine,
    children,
    platform,
    map,
    ui,
    __options
  } = merge({ renderDefaultLine: true }, props);

  const [currentRouteParams, setCurrentRouteParams] = useState(routeParams);
  const [_routeParams, setRouteParams] = useState();
  const [route, setRoute] = useState({});
  const [routeShape, setRouteShape] = useState([]);
  const [center, setCenter] = useState({});

  const isEqual = _.isEqual(routeParams, currentRouteParams);

  useEffect(() => {
    handleErrors();
    formatRouteParams();
    setCurrentRouteParams(routeParams);
    map.removeObjects(map.getObjects());
  }, [!isEqual]);

  function handleErrors() {
    // Route can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!routeParams) {
      throw new Error('"routeParams" is not set');
    }

    if (isoLine && (!routeParams.waypoints.lat || !routeParams.waypoints.lng)) {
      throw new Error(
        'isoLine requires an waypoints object with "lat" and "lng" specified'
      );
    }

    if (
      !isoLine &&
      (!(routeParams.waypoints instanceof Array) ||
        routeParams.waypoints.length < 2)
    ) {
      throw new Error(
        '"waypoints" should be an array of atleast two objects with "lat" and "lng" specified'
      );
    }
  }

  function formatRouteParams() {
    var formattedWaypoints = Object.assign({}, currentRouteParams);
    const waypoints = formattedWaypoints.waypoints;
    delete formattedWaypoints.waypoints;

    if (!isoLine) {
      waypoints.forEach((waypoint, index) => {
        const key = 'waypoint' + index;
        const value = `geo!${waypoint.lat},${waypoint.lng}`;
        formattedWaypoints[key] = value;
      });
    } else {
      const key = 'start';
      const value = `geo!${waypoints.lat},${waypoints.lng}`;
      formattedWaypoints[key] = value;
    }

    setRouteParams(formattedWaypoints);
  }

  useEffect(() => {
    const router = platform.getRoutingService();
    if (_routeParams) {
      if (isoLine) {
        router.calculateIsoline(_routeParams, onResult, onError);
      } else {
        router.calculateRoute(_routeParams, onResult, onError);
      }
    }
  }, [_routeParams]);

  function onResult(result) {
    const resultResponse = result.response;
    let _routeShape = [];
    if (isoLine && resultResponse.isoline) {
      _routeShape = handleIsoLine(resultResponse);
    } else if (!isoLine && resultResponse.route) {
      _routeShape = handleRouteLine(resultResponse);
    }
    setRouteShape(_routeShape);
  }

  function onError(error) {
    throw new Error(error);
  }

  function handleIsoLine(resultResponse) {
    const _center = new H.geo.Point(
      resultResponse.center.latitude,
      resultResponse.center.longitude
    );
    setCenter(_center);

    return formatRouteShape(resultResponse.isoline[0].component[0].shape);
  }

  function handleRouteLine(resultResponse) {
    setRoute(resultResponse.route[0]);

    return formatRouteShape(resultResponse.route[0].shape);
  }

  function formatRouteShape(shape) {
    var formattedRouteShape = shape.map((point) => {
      const coords = point.split(',');
      return { lat: coords[0], lng: coords[1] };
    });

    return formattedRouteShape;
  }

  return (route.waypoint || center) && routeShape.length
    ? renderResult()
    : null;

  function renderResult() {
    return renderDefaultLine ? renderDefault() : renderChildren();
  }

  function renderDefault() {
    return isoLine ? renderPolygon() : renderPolyLine();
  }

  // Renders the child for additional manipulations
  function renderChildren() {
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
  }

  function renderPolygon() {
    let _icons = formatIcons();
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
          icon={_icons.waypointIcon}
          options={markerOptions}
          setViewBounds={false}
          __options={__options}
        />
      </React.Fragment>
    );
  }

  function renderPolyLine() {
    let _icons = formatIcons();
    const startPoint = route.waypoint[0].mappedPosition;
    const endPoint = route.waypoint[route.waypoint.length - 1].mappedPosition;
    const middlePoints = route.waypoint.slice(1, -1);

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
        {_icons.startIcon !== 'none' && (
          <Marker
            coords={startMarker}
            map={map}
            platform={platform}
            icon={_icons.startIcon}
            options={markerOptions}
            setViewBounds={false}
            __options={__options}
          />
        )}
        {_icons.endIcon !== 'none' && (
          <Marker
            coords={endMarker}
            map={map}
            platform={platform}
            icon={_icons.endIcon}
            options={markerOptions}
            setViewBounds={false}
            __options={__options}
          />
        )}
        {middlePoints.length &&
          _icons.waypointIcon !== 'none' &&
          middlePoints.map((waypoint, index) => {
            return (
              <React.Fragment key={index}>
                <Marker
                  coords={{
                    lat: waypoint.mappedPosition.latitude,
                    lng: waypoint.mappedPosition.longitude
                  }}
                  map={map}
                  platform={platform}
                  icon={_icons.waypointIcon}
                  options={markerOptions}
                  setViewBounds={false}
                  __options={__options}
                />
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }

  function formatIcons() {
    let _icons = {
      startIcon: '',
      endIcon: '',
      waypointIcon: ''
    };
    if (icons.startIcon || icons.endIcon || icons.waypointIcon) {
      _icons.startIcon = icons.startIcon;
      _icons.endIcon = icons.endIcon;
      _icons.waypointIcon = icons.waypointIcon;
      return _icons;
    } else if (typeof icons === 'string') {
      _icons.startIcon = icons;
      _icons.endIcon = icons;
      _icons.waypointIcon = icons;
      return _icons;
    }
    return _icons;
  }
}

Router.propTypes = {
  routeParams: PropTypes.object.isRequired,
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
