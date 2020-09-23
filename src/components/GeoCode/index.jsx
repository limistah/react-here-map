import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function GeoCode(props) {
  const { geoCodeParams, children, type, platform, map, ui } = props;

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    handleErrors();
  }, []);

  useEffect(() => {
    const geocoder = platform.getGeocodingService();
    if (locations) {
      switch (type) {
        case 'search':
          geocoder.search(geoCodeParams, onResult, onError);
          break;
        case 'reverse':
          geocoder.reverseGeocode(geoCodeParams, onResult, onError);
          break;
        case 'geocode':
        default:
          geocoder.geocode(geoCodeParams, onResult, onError);
      }
    }
  }, [geoCodeParams]);

  function handleErrors() {
    // GeoCode can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!geoCodeParams) {
      throw new Error('geoCodeParams is not set');
    }
  }

  function onResult(result) {
    setLocations(result.Response.View[0].Result);
  }

  function onError(error) {
    throw new Error(error);
  }

  return (
    locations.length &&
    locations.map((location) => {
      const _location = location.Location || location.Place.Locations[0];
      const lat = _location.DisplayPosition.Latitude;
      const lng = _location.DisplayPosition.Longitude;
      const params = {
        map,
        platform,
        ui,
        lat,
        lng,
        key: lat,
        location,
        _location
      };
      return React.cloneElement(children, params);
    })
  );
}

GeoCode.propTypes = {
  geoCodeParams: PropTypes.object.isRequired,
  children: PropTypes.element,
  type: PropTypes.string,
  map: PropTypes.object,
  platform: PropTypes.object,
  ui: PropTypes.object
};

export default GeoCode;
