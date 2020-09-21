import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PolyLine from '../HMap/objects/PolyLine'
import Polygon from '../HMap/objects/Polygon'
import Marker from '../HMap/objects/Marker'
import merge from 'lodash.merge'

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
  } = merge({ renderDefaultLine: true }, props)

  if (!H || !H.map || !map) {
    throw new Error('HMap has to be initialized before adding Map Objects')
  }

  if (!routeParams) {
    throw new Error('routeParams is not set')
  }

  if (
    !(routeParams.waypoints instanceof Array) ||
    routeParams.waypoints.length < 2
  ) {
    throw new Error(
      '"waypoints" should be an array of atleast two objects with "lat" and "lng" specified'
    )
  }

  let routeParamsList = routeParams
  let resultResponse = {}
  let route = {}
  let routeShape = []
  let [component, setComponent] = useState({})
  let [center, setCenter] = useState({})

  const formatWaypoints = () => {
    let waypoints = routeParams.waypoints
    delete routeParams.waypoints
    var formattedWaypoints = {}

    waypoints.forEach((waypoint, index) => {
      var key = 'waypoint' + index
      var value = `geo!${waypoint.lat},${waypoint.lng}`
      formattedWaypoints[key] = value
    })

    routeParamsList = Object.assign(routeParams, formattedWaypoints)
  }

  // Define a callback function to process the routing response:
  const onResult = function (result) {
    resultResponse = result.response
    let _routeShape = []
    if (isoLine && resultResponse.isoline) {
      component = resultResponse.isoline[0].component[0]
      _routeShape = component.shape

      const _center = new H.geo.Point(
        resultResponse.center.latitude,
        resultResponse.center.longitude
      )
      setCenter(_center)
      setComponent(component)
    } else if (!isoLine && resultResponse.route) {
      // Pick the first route from the response:
      route = resultResponse.route[0]
      // Pick the route's shape:
      _routeShape = route.shape
      _routeShape = _routeShape.map((point) => {
        const coords = point.split(',')
        return { lat: coords[0], lng: coords[1] }
      })
    }
    // Update local state
    routeShape = _routeShape
  }

  const onError = function (error) {
    throw new Error(error)
  }

  // Get an instance of the routing service:
  const router = platform.getRoutingService(null, 8)

  if (isoLine) {
    // Call the Routing API to calculate an isoline:
    router.calculateIsoline(routeParamsList, onResult, onError)
  } else {
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    formatWaypoints()
    router.calculateRoute(routeParamsList, onResult, onError)
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
    )
  }

  // Renders PolyLine and Markers
  const renderPolyLine = () => {
    // Retrieve the mapped positions of the requested waypoints:
    const startPoint = route.waypoint[0].mappedPosition
    const endPoint = route.waypoint[route.waypoint.length - 1].mappedPosition

    // Create a marker for the start point:
    const startMarker = { lat: startPoint.latitude, lng: startPoint.longitude }
    // Create a marker for the end point:
    const endMarker = { lat: endPoint.latitude, lng: endPoint.longitude }

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
    )
  }

  const renderDefault = () => (isoLine ? renderPolygon() : renderPolyLine())
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
    }
    return React.cloneElement(children, params)
  }
  const renderResult = () => {
    return renderDefaultLine ? renderDefault() : renderChildren()
  }
  console.log(route.waypoint, routeShape.length)
  return (route.waypoint || component.shape) && routeShape.length
    ? renderResult()
    : null
}

Router.propTypes = {
  routeParams: PropTypes.object,
  lineOptions: PropTypes.object,
  markerOptions: PropTypes.object,
  children: PropTypes.element,
  renderDefaultLine: PropTypes.bool,
  isoLine: PropTypes.bool,
  icon: PropTypes.any,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object
}

export default Router

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
