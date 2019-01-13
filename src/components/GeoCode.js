import React, { useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";

function GeoCode(props) {
  const { geoCodeParams, platform, map, ui, children, reverse } = merge(props);
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!geoCodeParams) {
    throw new Error("geoCodeParams is not set");
  }
  const [locations, setLocations] = useState([]);

  // Define a callback function to process the geocoding response:
  var onResult = function(result) {
    setLocations(result.Response.View[0].Result);
  };

  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();

  // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  if (reverse) {
    geocoder.reverseGeocode(geoCodeParams, onResult, e => console.log(e));
  } else {
    geocoder.geocode(geoCodeParams, onResult, e => console.log(e));
  }

  return (
    locations.length &&
    locations.map(location => {
      const lat = location.Location.DisplayPosition.Latitude;
      const lng = location.Location.DisplayPosition.Longitude;
      const params = { map, platform, ui, lat, lng, key: lat, location };
      return React.cloneElement(children, params);
    })
  );
}

GeoCode.propTypes = {
  geoCodeParams: PropTypes.object,
  children: PropTypes.element.isRequired,
  reverse: PropTypes.bool,
  coords: PropTypes.object,
  radius: PropTypes.number,
  map: PropTypes.object,
  platform: PropTypes.object
};

export default GeoCode;
