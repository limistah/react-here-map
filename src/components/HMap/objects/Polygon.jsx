import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import initMapObjectEvents from '../../../libs/initMapObjectEvents';
import { useEffect } from 'react';

function Polygon(props) {
  const {
    points,
    options,
    setViewBounds,
    objectEvents,
    platform,
    map,
    ui,
    __options
  } = merge({ setViewBounds: true }, props);

  useEffect(() => {
    handleErrors();
    createPolygon();
  }, []);

  function handleErrors() {
    // Polygon can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!Array.isArray(points) || points.length < 2) {
      throw new Error(
        '"points" should be an array of atleast 2 objects with "lat" and "lng" specified'
      );
    }
  }

  function createPolygon() {
    // Initialize a LineString and add all the points to it:
    var lineString = new H.geo.LineString();
    points.forEach((point) => {
      lineString.pushPoint(point);
    });

    // Initialize a Polygon and add the Linestring and Polygon options to it
    const polygon = new H.map.Polygon(lineString, options);

    // Add event listener to the object if intention of using the object is defined
    initMapObjectEvents(polygon, objectEvents, __options);

    // Add the Polygon to the map
    map.addObject(polygon);

    if (setViewBounds) {
      // Zooms and centers the map to the Polygon
      map.setViewBounds(polygon.getBounds());
    }
  }

  return null;
}

Polygon.propTypes = {
  points: PropTypes.array.isRequired,
  options: PropTypes.object,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object,
  __options: PropTypes.object
};

export default Polygon;
