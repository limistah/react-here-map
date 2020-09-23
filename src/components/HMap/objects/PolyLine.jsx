import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import initMapObjectEvents from '../../../libs/initMapObjectEvents';
import { useEffect } from 'react';

function PolyLine(props) {
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
    createPolyLine();
  }, []);

  function handleErrors() {
    // PolyLine can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!Array.isArray(points) || points.length < 2) {
      throw new Error(
        '"points" should be an array of atleast 2 objects with "lat" and "lng" specified'
      );
    }
  }

  function createPolyLine() {
    // Initialize a LineString and add all the points to it:
    var lineString = new H.geo.LineString();
    points.forEach((point) => {
      lineString.pushPoint(point);
    });

    // Initialize a Polyline and add the Linestring and Polyline options to it
    const polyLine = new H.map.Polyline(lineString, options);

    // Add event listener to the object if intention of using the object is defined
    initMapObjectEvents(polyLine, objectEvents, __options);

    // Add the PolyLine to the map
    map.addObject(polyLine);

    if (setViewBounds) {
      // Zooms and center the map to the PolyLine
      map.setViewBounds(polyLine.getBounds());
    }
  }

  return null;
}

PolyLine.propTypes = {
  points: PropTypes.array.isRequired,
  options: PropTypes.object,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object,
  __options: PropTypes.object
};

export default PolyLine;
