import React, { useState } from "react";
import PropTypes from "prop-types";

function Router(props) {
  const {
    geoCodeParams,
    platform,
    map,
    ui,
    children,
    reverse,
    landmark
  } = props;
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
  if (landmark) {
    geocoder.search(geoCodeParams, onResult, function(e) {
      alert(e);
    });
  } else if (reverse) {
    // Point to address
    geocoder.reverseGeocode(geoCodeParams, onResult, e => console.log(e));
  } else {
    // Address to point
    geocoder.geocode(geoCodeParams, onResult, e => console.log(e));
  }
  return (
    locations.length &&
    locations.map(location => {
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

Router.propTypes = {
  geoCodeParams: PropTypes.object,
  children: PropTypes.element.isRequired,
  reverse: PropTypes.bool,
  landmark: PropTypes.bool,
  map: PropTypes.object,
  platform: PropTypes.object,
  ui: PropTypes.object
};

export default Router;
