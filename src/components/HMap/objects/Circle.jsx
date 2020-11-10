import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import initMapObjectEvents from '../../../libs/initMapObjectEvents';
import { useEffect } from 'react';

function Circle(props) {
  const {
    coords,
    radius,
    options,
    setViewBounds,
    animated,
    objectEvents,
    map,
    __options
  } = merge({ setViewBounds: true, animated: true }, props);

  useEffect(() => {
    handleErrors();
    createCircle();
  }, []);

  function handleErrors() {
    // Circle can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!coords || !coords.lat || !coords.lng) {
      throw new Error(
        '"coords" should be an object with "lat" and "lng" specified'
      );
    }
  }

  function createCircle() {
    const circle = new H.map.Circle(
      coords,
      // The radius of the Circle in m (provided radius is in km)
      radius * 1000,
      options
    );

    // Add event listener to the object if intention of using the object is defined
    initMapObjectEvents(circle, objectEvents, __options);

    // Add the Circle to the map
    map.addObject(circle);

    if (setViewBounds) {
      // Zooms and centers the map to the Circle
      map.setViewBounds(circle.getBounds(), animated);
    }
  }

  return null;
}

Circle.propTypes = {
  coords: PropTypes.object.isRequired,
  radius: PropTypes.number,
  options: PropTypes.object,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object,
  __options: PropTypes.object
};

export default Circle;
