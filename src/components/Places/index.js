import React, { useState, useRef, memo } from "react";
import PlaceInput from "./PlaceInput";
import PlaceItems from "./PlaceItems";
import placeBuilder from "./../../libs/placeBuilder";
import PropTypes from "prop-types";
import HMap from "./../HMap";
import HMapMarker from "./../HMap/objects/Marker";
import { css } from "glamor";

const placeStyle = css({
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  position: "relative"
});

const Place = memo(props => {
  const {
    inputStyle, // Styles for the input
    inputClassName, // Class name for input external styles
    itemContainerClass, // Place result item container class
    iconClass, // Place result item icon class
    itemClass, // Place result item class
    placeClassName, // Class for the actual container for the whole element
    library, // Type of place library to use for the requests
    getItem, // Callback when an item is clicked in the result
    query, // Passing the query externally to initiate the request on load after getting the location of the user
    category, // Category of the search
    markerOptions, // Options for the marker
    markerIcon, // Icon for the marker
    markerType, // Type of marker icon
    multiMarker, // allow for many markers
    mapOptions, // Options to consider when loading the map
    platform // Platform passed by the platform parent component
  } = props;

  // Stores the search values
  const [searchValue, setSearchValue] = useState("");
  const handleGetValue = value => {
    setSearchValue(value);
    // Update the params  as well
    setParams({ ...params, q: value });
  };
  // Ensure that supported library type is passed. Defaults to search
  const type = [
    "search",
    "categories",
    "around",
    "explore",
    "here",
    "suggest"
  ].includes(library)
    ? library
    : "search";
  const [searchResult, setSearchResult] = useState([]);
  // Params for the place request
  const [params, setParams] = useState({
    q: searchValue || query,
    cat: category
  });

  const [updateMarker, setUpdateMarker] = useState(false);
  const [placeMarker, setPlaceMarker] = useState(null);
  const handleGetMarker = marker => {
    setPlaceMarker(marker);
  };

  // Make sure that we are not using the preset center by the consumer of the library
  const _mapOptions = mapOptions || {};
  delete _mapOptions.center;
  const [mapCenter, setMapCenter] = useState({ lat: 37, lng: 90 });
  // Here Map place library requires the use "at" in the params which defines the context for the search. To minimize the overhead, we are using the inbuilt browser geolocation API, this component will throw in a browser that does not support Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { latitude, longitude }
      } = position;
      const coords = { lat: latitude, lng: longitude };
      let _params = params;
      _params.at = `${latitude},${longitude};10000`;
      setUpdateMarker(!multiMarker);
      // Update the params
      setParams(_params);
      // Set the mapCenter
      setMapCenter(coords);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  // Handles when a result item is clicked
  const handleGetItem = item => {
    // Prevent for failure when calling 'undefined' as function
    const _getItem = typeof getItem == "function" ? getItem : () => {};
    setSearchResult([]);
    // Only non multi marker should update the current marker
    setUpdateMarker(!multiMarker);
    setMapCenter({ lat: item.position[0], lng: item.position[1] });
    _getItem(item);
  };

  const place = placeBuilder(platform, type);
  // Define a callback function to handle data on success:
  function onResult(data) {
    setSearchResult(data.items || data.suggestions || data.results.items);
  }
  // Define a callback function to handle errors:
  function onError(data) {
    console.log(data);
  }
  // Only make the call when the 'at' of the params is set, through the geolocation API of the browser
  if ((params.q || params.cat) && params.at) {
    place.request(params, {}, onResult, onError);
  }
  return (
    <div className={`${placeStyle} ${placeClassName}`}>
      <PlaceInput
        className={inputClassName || ""}
        style={inputStyle}
        getValue={handleGetValue}
      />
      {!!searchResult.length && (
        <PlaceItems
          containerClass={itemContainerClass}
          iconClass={iconClass}
          itemClass={itemClass}
          getItem={handleGetItem}
          items={searchResult}
        />
      )}
      {!!mapCenter.lat && (
        <HMap
          style={{
            height: "200px",
            width: "400px"
          }}
          platform={platform}
          options={props.options}
          mapOptions={{ center: mapCenter, zoom: 7, ..._mapOptions }}
          interactive={true}
        >
          <HMapMarker
            coords={mapCenter}
            getMarker={handleGetMarker}
            marker={placeMarker}
            icon={markerIcon}
            type={markerType}
            options={markerOptions}
            updateMarker={updateMarker}
          />
        </HMap>
      )}
    </div>
  );
});

Place.propTypes = {
  library: PropTypes.string.isRequired,
  query: PropTypes.string,
  category: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object
};

export default Place;
