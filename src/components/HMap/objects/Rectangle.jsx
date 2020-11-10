import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import initMapObjectEvents from '../../../libs/initMapObjectEvents';
import { useEffect } from 'react';

function Rectangle(props) {
  const {
    points,
    options,
    setViewBounds,
    animated,
    objectEvents,
    map,
    __options
  } = merge({ setViewBounds: true, animated: true }, props);

  useEffect(() => {
    handleErrors();
    createRectangle();
  }, []);

  function handleErrors() {
    // Rectangle can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!Array.isArray(points) || points.length !== 2) {
      throw new Error(
        '"points" should be an array of two objects with "lat" and "lng" specified'
      );
    }
  }

  function createRectangle() {
    // Initialize a LineString and add the 2 coords (top-left, bottom-right)
    var boundingBox = new H.geo.Rect(
      points[0].lat,
      points[0].lng,
      points[1].lat,
      points[1].lng
    );

    // Initialize a Rectangle and add the boundingBox and Rectangle options to it
    const rectangle = new H.map.Rect(boundingBox, options);

    // Add event listener to the object if intention of using the object is defined
    initMapObjectEvents(rectangle, objectEvents, __options);

    // Add the Rectangle to the map
    map.addObject(rectangle);

    if (setViewBounds) {
      // Zooms and centers the map to the Rectangle
      map.setViewBounds(rectangle.getBounds(), animated);
    }
  }

  return null;
}

Rectangle.propTypes = {
  points: PropTypes.array.isRequired,
  options: PropTypes.object,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object,
  __options: PropTypes.object
};

export default Rectangle;
