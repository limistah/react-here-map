"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

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

  var _useState = (0, _react.useState)([]),
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
    geocoder.search(geoCodeParams, onResult, function(e) {
      alert(e);
    });
  } else if (reverse) {
    // Point to address
    geocoder.reverseGeocode(geoCodeParams, onResult, function(e) {
      return console.log(e);
    });
  } else {
    // Address to point
    geocoder.geocode(geoCodeParams, onResult, function(e) {
      return console.log(e);
    });
  }

  return (
    locations.length &&
    locations.map(function(location) {
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
      return _react.default.cloneElement(children, params);
    })
  );
}

GeoCode.propTypes = {
  geoCodeParams: _propTypes.default.object,
  children: _propTypes.default.element.isRequired,
  reverse: _propTypes.default.bool,
  landmark: _propTypes.default.bool,
  map: _propTypes.default.object,
  platform: _propTypes.default.object,
  ui: _propTypes.default.object
};
var _default = GeoCode;
exports.default = _default;
