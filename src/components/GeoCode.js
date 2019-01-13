import React, { useState } from "react";
import PropTypes from "prop-types";
import merge from "lodash.merge";

function GeoCode(props) {
  const { geoCodeParams, platform, map } = merge(props);
  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!geoCodeParams || !geoCodeParams.searchText) {
    throw new Error("geoCodeParams.searchText is not set");
  }
  const [locations, setLocations] = useState([]);

  // Define a callback function to process the geocoding response:
  var onResult = function(result) {
    setLocations(result.Response.View[0].Result);
    // var locations = result.Response.View[0].Result,
    //   position,
    //   marker;
    // // Add a marker for each location found
    // for (let i = 0; i < locations.length; i++) {
    //   position = {
    //     lat: locations[i].Location.DisplayPosition.Latitude,
    //     lng: locations[i].Location.DisplayPosition.Longitude
    //   };
    //   marker = new H.map.Marker(position);
    //   map.addObject(marker);
    //   map.setCenter(position);
    // }
  };

  // Get an instance of the geocoding service:
  var geocoder = platform.getGeocodingService();

  // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):
  geocoder.geocode(geoCodeParams, onResult, function(e) {
    alert(e);
  });
  // There is no need to render something useful here, HereMap does that magically
  return (
    locations.length &&
    locations.map(location => {
      const coords = {
        lat: location.Location.DisplayPosition.Latitude,
        lng: location.Location.DisplayPosition.Longitude
      };
      return React.cloneElement(props.children, {
        map,
        platform,
        coords,
        key: coords.lat
      });
    })
  );
}

GeoCode.propTypes = {
  geoCodeParams: PropTypes.object,
  children: PropTypes.element.isRequired,
  coords: PropTypes.object,
  radius: PropTypes.number,
  setAsCenter: PropTypes.bool,
  map: PropTypes.object,
  platform: PropTypes.object
};

export default GeoCode;
