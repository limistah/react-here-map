import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import initMapObjectEvents from '../../../libs/initMapObjectEvents';
import { useEffect } from 'react';

function Marker(props) {
  const {
    coords,
    icon,
    type,
    options,
    marker,
    getMarker,
    updateMarker,
    setViewBounds,
    objectEvents,
    platform,
    map,
    ui,
    __options
  } = merge(
    { setViewBounds: true, updateMarker: false, marker: null, getMarker() {} },
    props
  );

  var _options = options || {};

  useEffect(() => {
    handleErrors();
    createIcon();
    const _marker = createMarker();
    const objectExists = checkIfObjectExists();
    addOrUpdateMarker(_marker, objectExists);
  }, []);

  function handleErrors() {
    // Marker can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!coords || !coords.lat || !coords.lng) {
      throw new Error(
        '"coords" should be an object with "lat" and "lng" specified'
      );
    }
  }

  function createIcon() {
    if (icon && type === 'DOM') {
      // Displays a DOM Icon
      _options.icon = new H.map.DomIcon(icon);
    } else if (icon) {
      // Displays a static icon
      _options.icon = new H.map.Icon(icon);
    }
  }

  function createMarker() {
    // Create an icon, an object holding the latitude and longitude, and a marker:
    return updateMarker && marker ? marker : new H.map.Marker(coords, _options);
  }

  function checkIfObjectExists() {
    // Check if an object with the same coordinates has been added formerly
    const addedObjects = map.getObjects();
    const objectExists = addedObjects.some((object) => {
      if (typeof object.getPosition === 'function') {
        const { lat, lng } = object.getPosition();
        return lat === coords.lat && coords.lng === lng;
      }
    });
    return objectExists;
  }

  function addOrUpdateMarker(_marker, objectExists) {
    // Add Marker if it doesn't exist
    if (!objectExists && !updateMarker) {
      // Add event listener to the object if intention of using the object is defined
      initMapObjectEvents(_marker, objectEvents, __options);
      map.addObject(_marker);
    }
    // Update Marker if it does exist
    else if (updateMarker) {
      _marker.setPosition(coords);
    }

    // Send the Marker to the parent
    !marker ? getMarker(_marker) : null;

    if (setViewBounds) {
      // Zooms and centers the map to the Marker
      map.setCenter(coords);
    }
  }

  return null;
}

Marker.propTypes = {
  coords: PropTypes.object.isRequired,
  icon: PropTypes.any,
  type: PropTypes.string,
  options: PropTypes.object,
  marker: PropTypes.object,
  getMarker: PropTypes.func,
  updateMarker: PropTypes.func,
  setViewBounds: PropTypes.bool,
  objectEvents: PropTypes.object,
  platform: PropTypes.object,
  map: PropTypes.object,
  ui: PropTypes.object,
  __options: PropTypes.object
};

export default Marker;
