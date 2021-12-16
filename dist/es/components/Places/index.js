function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useRef, memo } from "react";
import PlaceInput from "./PlaceInput";
import PlaceItems from "./PlaceItems";
import placeBuilder from "./../../libs/placeBuilder";
import PropTypes from "prop-types";
import HMap from "./../HMap";
import HMapMarker from "./../HMap/objects/Marker";
import { css } from "glamor";
var placeStyle = css({
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  position: "relative"
});
var Place = /*#__PURE__*/memo(function (props) {
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

  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchValue = _useState2[0],
      setSearchValue = _useState2[1];

  var handleGetValue = function handleGetValue(value) {
    setSearchValue(value); // Update the params  as well

    setParams(_objectSpread(_objectSpread({}, params), {}, {
      q: value
    }));
  }; // Ensure that supported library type is passed. Defaults to search


  var type = ["search", "categories", "around", "explore", "here", "suggest"].includes(library) ? library : "search";

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      searchResult = _useState4[0],
      setSearchResult = _useState4[1]; // Params for the place request


  var _useState5 = useState({
    q: searchValue || query,
    cat: category
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      params = _useState6[0],
      setParams = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      updateMarker = _useState8[0],
      setUpdateMarker = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      placeMarker = _useState10[0],
      setPlaceMarker = _useState10[1];

  var handleGetMarker = function handleGetMarker(marker) {
    setPlaceMarker(marker);
  }; // Make sure that we are not using the preset center by the consumer of the library


  var _mapOptions = mapOptions || {};

  delete _mapOptions.center;

  var _useState11 = useState({
    lat: 37,
    lng: 90
  }),
      _useState12 = _slicedToArray(_useState11, 2),
      mapCenter = _useState12[0],
      setMapCenter = _useState12[1]; // Here Map place library requires the use "at" in the params which defines the context for the search. To minimize the overhead, we are using the inbuilt browser geolocation API, this component will throw in a browser that does not support Geolocation


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
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
    var _getItem = typeof getItem == "function" ? getItem : function () {};

    setSearchResult([]); // Only non multi marker should update the current marker

    setUpdateMarker(!multiMarker);
    setMapCenter({
      lat: item.position[0],
      lng: item.position[1]
    });

    _getItem(item);
  };

  var place = placeBuilder(platform, type); // Define a callback function to handle data on success:

  function onResult(data) {
    setSearchResult(data.items || data.suggestions || data.results.items);
  } // Define a callback function to handle errors:


  function onError(data) {
    console.log(data);
  } // Only make the call when the 'at' of the params is set, through the geolocation API of the browser


  if ((params.q || params.cat) && params.at) {
    place.request(params, {}, onResult, onError);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(placeStyle, " ").concat(placeClassName)
  }, /*#__PURE__*/React.createElement(PlaceInput, {
    className: inputClassName || "",
    style: inputStyle,
    getValue: handleGetValue
  }), !!searchResult.length && /*#__PURE__*/React.createElement(PlaceItems, {
    containerClass: itemContainerClass,
    iconClass: iconClass,
    itemClass: itemClass,
    getItem: handleGetItem,
    items: searchResult
  }), !!mapCenter.lat && /*#__PURE__*/React.createElement(HMap, {
    style: {
      height: "200px",
      width: "400px"
    },
    platform: platform,
    options: props.options,
    mapOptions: _objectSpread({
      center: mapCenter,
      zoom: 7
    }, _mapOptions),
    interactive: true
  }, /*#__PURE__*/React.createElement(HMapMarker, {
    coords: mapCenter,
    getMarker: handleGetMarker,
    marker: placeMarker,
    icon: markerIcon,
    type: markerType,
    options: markerOptions,
    updateMarker: updateMarker
  })));
});
Place.propTypes = {
  library: PropTypes.string.isRequired,
  query: PropTypes.string,
  category: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  itemContainerClass: PropTypes.string,
  // Place result item container class
  iconClass: PropTypes.string,
  // Place result item icon class
  itemClass: PropTypes.string,
  // Place result item class
  placeClassName: PropTypes.string,
  // Class for the actual container for the whole element
  getItem: PropTypes.func,
  // Callback when an item is clicked in the result
  markerOptions: PropTypes.object,
  // Options for the marker
  markerIcon: PropTypes.element,
  // Icon for the marker
  markerType: PropTypes.string,
  // Type of marker icon
  multiMarker: PropTypes.bool // allow for many markers

};
export default Place;