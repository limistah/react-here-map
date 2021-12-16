function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from "react";
import PropTypes from "prop-types";

function GeoCode(props) {
  var geoCodeParams = props.geoCodeParams,
      platform = props.platform,
      map = props.map,
      ui = props.ui,
      children = props.children,
      reverse = props.reverse,
      landmark = props.landmark;

  if (!H || !H.map || !map) {
    throw new Error("HMap has to be initialized before adding Map Objects");
  }

  if (!geoCodeParams) {
    throw new Error("geoCodeParams is not set");
  }

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      locations = _useState2[0],
      setLocations = _useState2[1]; // Define a callback function to process the geocoding response:


  var onResult = function onResult(result) {
    setLocations(result.Response.View[0].Result);
  }; // Get an instance of the geocoding service:


  var geocoder = platform.getGeocodingService(); // Call the geocode method with the geocoding parameters,
  // the callback and an error callback function (called if a
  // communication error occurs):

  if (landmark) {
    geocoder.search(geoCodeParams, onResult, function (e) {
      alert(e);
    });
  } else if (reverse) {
    // Point to address
    geocoder.reverseGeocode(geoCodeParams, onResult, function (e) {
      return console.log(e);
    });
  } else {
    // Address to point
    geocoder.geocode(geoCodeParams, onResult, function (e) {
      return console.log(e);
    });
  }

  return locations.length && locations.map(function (location) {
    var _location = location.Location || location.Place.Locations[0];

    var lat = _location.DisplayPosition.Latitude;
    var lng = _location.DisplayPosition.Longitude;
    var params = {
      map: map,
      platform: platform,
      ui: ui,
      lat: lat,
      lng: lng,
      key: lat,
      location: location,
      _location: _location
    };
    return /*#__PURE__*/React.cloneElement(children, params);
  });
}

GeoCode.propTypes = {
  geoCodeParams: PropTypes.object,
  children: PropTypes.element.isRequired,
  reverse: PropTypes.bool,
  landmark: PropTypes.bool,
  map: PropTypes.object,
  platform: PropTypes.object,
  ui: PropTypes.object
};
export default GeoCode;