import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PolyLine from '../HMap/objects/PolyLine';
import Polygon from '../HMap/objects/Polygon';
import Marker from '../HMap/objects/Marker';
import merge from 'lodash.merge';
import _ from 'lodash';
import { removeObjectFromGroup, resetMap } from '../../libs/helpers';
import markerEvents from '../../libs/markerEvents';

function Router(props) {
  const {
    routeParams,
    lineOptions,
    isoLine,
    polygonOptions,
    icons,
    markerOptions,
    changeWaypoints,
    edit,
    renderDefaultLine,
    setViewBounds,
    animated,
    children,
    interaction,
    platform,
    map,
    ui,
    __options
  } = merge(
    {
      isoLine: false,
      changeWaypoints() {},
      edit: false,
      renderDefaultLine: true,
      setViewBounds: true,
      animated: true
    },
    props
  );

  const [error, setError] = useState();
  const [currentRouteParams, setCurrentRouteParams] = useState();
  const currentRouteParamsRef = useRef();
  const [_routeParams, setRouteParams] = useState();
  const [currentGroup, setCurrentGroup] = useState();
  const [currentGroupID, setCurrentGroupID] = useState('A');
  const [route, setRoute] = useState();
  const routeRef = useRef();
  const [routeShape, setRouteShape] = useState([]);
  const [center, setCenter] = useState();
  const [hasUpdated, setHasUpdated] = useState(false);
  const initialMarkerCoordsRef = useRef();

  const routeParamsAreEqual = _.isEqual(routeParams, currentRouteParams);

  useEffect(() => {
    if (edit) {
      setEventListeners();
    }
  }, [edit]);

  useEffect(() => {
    const errors = handleErrors();
    setError(errors);
    if (!routeParamsAreEqual && !errors) {
      setHasUpdated(false);
      changeGroup();
      formatRouteParams();
      currentRouteParamsRef.current = routeParams;
      setCurrentRouteParams(routeParams);
    }
  }, [routeParams, edit]);

  function changeGroup() {
    if (currentGroup) {
      removeObjectFromGroup(currentGroup);
    }
    switch (currentGroupID) {
      case 'A':
        const groupB = new H.map.Group();
        setCurrentGroup(groupB);
        setCurrentGroupID('B');
        break;
      case 'B':
        const groupA = new H.map.Group();
        setCurrentGroup(groupA);
        setCurrentGroupID('A');
        break;
    }
  }

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
        'isoLine - "waypoints" should be an object with "lat" and "lng" specified'
      );
    }

    if (!isoLine) {
      if (!(routeParams.waypoints instanceof Array)) {
        throw new Error('routeLine - "waypoints" should be an array');
      } else if (routeParams.waypoints.length < 2) {
        if (currentGroup) {
          resetMap(map, true, currentGroup);
          setCurrentGroup(null);
        }
        return true;
      }
    }

    return null;
  }

  function formatRouteParams() {
    var formattedWaypoints = Object.assign({}, routeParams);
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
    if (!error) {
      const router = platform.getRoutingService();
      if (_routeParams && routeParamsAreEqual) {
        if (isoLine) {
          router.calculateIsoline(_routeParams, onResult, onError);
        } else {
          router.calculateRoute(_routeParams, onResult, onError);
        }
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
    setHasUpdated(true);
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
    routeRef.current = resultResponse.route[0];

    return formatRouteShape(resultResponse.route[0].shape);
  }

  function formatRouteShape(shape) {
    var formattedRouteShape = shape.map((point) => {
      const coords = point.split(',');
      return { lat: coords[0], lng: coords[1] };
    });

    return formattedRouteShape;
  }

  return (route || center) &&
    routeShape.length &&
    routeParamsAreEqual &&
    hasUpdated
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
      center
    };
    return React.cloneElement(children, params);
  }

  function renderPolygon() {
    const _icons = formatIcons();
    return (
      <React.Fragment>
        <Polygon
          points={routeShape}
          options={polygonOptions}
          setViewBounds={true}
          animated={animated}
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
    const _icons = formatIcons();

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
          setViewBounds={edit ? false : setViewBounds}
          animated={animated}
          group={currentGroup}
          __options={__options}
        />
        {_icons.startIcon !== 'none' && (
          <Marker
            coords={startMarker}
            map={map}
            platform={platform}
            icon={_icons.startIcon}
            draggable={edit}
            options={merge(markerOptions, { zIndex: 1 })}
            setViewBounds={false}
            group={currentGroup}
            __options={__options}
          />
        )}
        {_icons.endIcon !== 'none' && (
          <Marker
            coords={endMarker}
            map={map}
            platform={platform}
            icon={_icons.endIcon}
            draggable={edit}
            options={merge(markerOptions, { zIndex: 1 })}
            setViewBounds={false}
            group={currentGroup}
            __options={__options}
          />
        )}
        {shouldShowMiddlepoints(middlePoints, _icons) &&
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
                  icon={edit ? _icons.editIcon : _icons.waypointIcon}
                  draggable={edit}
                  options={markerOptions}
                  setViewBounds={false}
                  group={currentGroup}
                  __options={__options}
                />
              </React.Fragment>
            );
          })}
      </React.Fragment>
    );
  }

  function shouldShowMiddlepoints(middlePoints, _icons) {
    return middlePoints.length && (_icons.waypointIcon !== 'none' || edit);
  }

  function formatIcons() {
    let _icons = {
      startIcon: '',
      endIcon: '',
      waypointIcon: '',
      editIcon: ''
    };
    if (
      icons &&
      (icons.startIcon || icons.endIcon || icons.waypointIcon || icons.editIcon)
    ) {
      _icons.startIcon = icons.startIcon;
      _icons.endIcon = icons.endIcon;
      _icons.waypointIcon = icons.waypointIcon;
      _icons.editIcon = icons.editIcon;

      return _icons;
    } else if (typeof icons === 'string') {
      _icons.startIcon = icons;
      _icons.endIcon = icons;
      _icons.waypointIcon = icons;
      _icons.editIcon = icons;

      return _icons;
    }
    return _icons;
  }

  function removeMarker(coords, e) {
    if (e.target.getParentGroup().getObjects().length > 3) {
      removeObjectFromGroup(e.target);
      var waypoints = routeRef.current.waypoint;
      var foundWaypoint = waypoints.findIndex((waypoint) => {
        return (
          coords.lat === waypoint.mappedPosition.latitude &&
          coords.lng === waypoint.mappedPosition.longitude
        );
      });
      var waypointsList = Object.assign(
        [],
        currentRouteParamsRef.current.waypoints
      );
      waypointsList.splice(foundWaypoint, 1);

      changeWaypoints(waypointsList);
    }
  }

  function addMarker(coords) {
    if (currentRouteParamsRef.current) {
      var waypointsList = Object.assign(
        [],
        currentRouteParamsRef.current.waypoints
      );
      waypointsList.push(coords);

      changeWaypoints(waypointsList);
    }
  }

  function dragstart(coords) {
    initialMarkerCoordsRef.current = coords;
  }

  function dragend(coords) {
    var waypoints = routeRef.current.waypoint;
    var foundWaypoint = waypoints.findIndex((waypoint) => {
      return (
        initialMarkerCoordsRef.current.lat ===
          waypoint.mappedPosition.latitude &&
        initialMarkerCoordsRef.current.lng === waypoint.mappedPosition.longitude
      );
    });

    var waypointsList = Object.assign(
      [],
      currentRouteParamsRef.current.waypoints
    );

    waypointsList[foundWaypoint] = coords;

    changeWaypoints(waypointsList);
  }

  function setEventListeners() {
    markerEvents(map, interaction, (type, coords, e) => {
      switch (type) {
        case 'remove':
          removeMarker(coords, e);
          break;
        case 'add':
          addMarker(coords);
          break;
        case 'dragstart':
          dragstart(coords);
          break;
        case 'dragend':
          dragend(coords);
          break;
        default:
          break;
      }
    });
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
