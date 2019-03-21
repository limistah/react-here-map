"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _PlaceInput = _interopRequireDefault(require("./PlaceInput"));

var _PlaceItems = _interopRequireDefault(require("./PlaceItems"));

var _placeBuilder = _interopRequireDefault(
  require("./../../libs/placeBuilder")
);

var _propTypes = _interopRequireDefault(require("prop-types"));

var _HMap = _interopRequireDefault(require("./../HMap"));

var _Marker = _interopRequireDefault(require("./../HMap/objects/Marker"));

var _glamor = require("glamor");

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
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

var placeStyle = (0, _glamor.css)({
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  position: "relative"
});
var Place = (0, _react.memo)(function(props) {
  var inputStyle = props.inputStyle,
    inputClassName = props.inputClassName,
    itemContainerClass = props.itemContainerClass,
    iconClass = props.iconClass,
    itemClass = props.itemClass,
    placeClassName = props.placeClassName,
    library = props.library,
    getItem = props.getItem,
    query = props.query,
    category = props.category,
    markerOptions = props.markerOptions,
    markerIcon = props.markerIcon,
    markerType = props.markerType,
    multiMarker = props.multiMarker,
    mapOptions = props.mapOptions,
    platform = props.platform; // Stores the search values

  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchValue = _useState2[0],
    setSearchValue = _useState2[1];

  var handleGetValue = function handleGetValue(value) {
    setSearchValue(value); // Update the params  as well

    setParams(
      _objectSpread({}, params, {
        q: value
      })
    );
  }; // Ensure that supported library type is passed. Defaults to search

  var type = [
    "search",
    "categories",
    "around",
    "explore",
    "here",
    "suggest"
  ].includes(library)
    ? library
    : "search";

  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    searchResult = _useState4[0],
    setSearchResult = _useState4[1]; // Params for the place request

  var _useState5 = (0, _react.useState)({
      q: searchValue || query,
      cat: category
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    params = _useState6[0],
    setParams = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    updateMarker = _useState8[0],
    setUpdateMarker = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    placeMarker = _useState10[0],
    setPlaceMarker = _useState10[1];

  var handleGetMarker = function handleGetMarker(marker) {
    setPlaceMarker(marker);
  }; // Make sure that we are not using the preset center by the consumer of the library

  var _mapOptions = mapOptions || {};

  delete _mapOptions.center;

  var _useState11 = (0, _react.useState)({
      lat: 37,
      lng: 90
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    mapCenter = _useState12[0],
    setMapCenter = _useState12[1]; // Here Map place library requires the use "at" in the params which defines the context for the search. To minimize the overhead, we are using the inbuilt browser geolocation API, this component will throw in a browser that does not support Geolocation

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var _position$coords = position.coords,
        latitude = _position$coords.latitude,
        longitude = _position$coords.longitude;
      var coords = {
        lat: latitude,
        lng: longitude
      };
      var _params = params;
      _params.at = "".concat(latitude, ",").concat(longitude, ";10000");
      setUpdateMarker(!multiMarker); // Update the params

      setParams(_params); // Set the mapCenter

      setMapCenter(coords);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  } // Handles when a result item is clicked

  var handleGetItem = function handleGetItem(item) {
    // Prevent for failure when calling 'undefined' as function
    var _getItem = typeof getItem == "function" ? getItem : function() {};

    setSearchResult([]); // Only non multi marker should update the current marker

    setUpdateMarker(!multiMarker);
    setMapCenter({
      lat: item.position[0],
      lng: item.position[1]
    });

    _getItem(item);
  };

  var place = (0, _placeBuilder.default)(platform, type); // Define a callback function to handle data on success:

  function onResult(data) {
    setSearchResult(data.items || data.suggestions || data.results.items);
  } // Define a callback function to handle errors:

  function onError(data) {
    console.log(data);
  } // Only make the call when the 'at' of the params is set, through the geolocation API of the browser

  if ((params.q || params.cat) && params.at) {
    place.request(params, {}, onResult, onError);
  }

  return _react.default.createElement(
    "div",
    {
      className: "".concat(placeStyle, " ").concat(placeClassName)
    },
    _react.default.createElement(_PlaceInput.default, {
      className: inputClassName || "",
      style: inputStyle,
      getValue: handleGetValue
    }),
    !!searchResult.length &&
      _react.default.createElement(_PlaceItems.default, {
        containerClass: itemContainerClass,
        iconClass: iconClass,
        itemClass: itemClass,
        getItem: handleGetItem,
        items: searchResult
      }),
    !!mapCenter.lat &&
      _react.default.createElement(
        _HMap.default,
        {
          style: {
            height: "200px",
            width: "400px"
          },
          platform: platform,
          options: props.options,
          mapOptions: _objectSpread(
            {
              center: mapCenter,
              zoom: 7
            },
            _mapOptions
          ),
          interactive: true
        },
        _react.default.createElement(_Marker.default, {
          coords: mapCenter,
          getMarker: handleGetMarker,
          marker: placeMarker,
          icon: markerIcon,
          type: markerType,
          options: markerOptions,
          updateMarker: updateMarker
        })
      )
  );
});
Place.propTypes = {
  library: _propTypes.default.string.isRequired,
  query: _propTypes.default.string,
  category: _propTypes.default.string,
  className: _propTypes.default.string,
  inputClassName: _propTypes.default.string,
  containerStyle: _propTypes.default.object,
  inputStyle: _propTypes.default.object
};
var _default = Place;
exports.default = _default;
