Puts a marker on the map

### Props

- **library**: PropTypes.string.isRequired One of the places library supported
  by here maps for the requests
- **query**: PropTypes.string Passing the query externally to initiate the
  request on load after getting the location of the user

- **category**: PropTypes.string Result category

- **placeClassName**: PropTypes.string Class for the container

- **inputClassName**: PropTypes.string Class for the Input field

- **containerStyle**: PropTypes.object Styles for the container
- **inputStyle**: PropTypes.object Styles for the input

- **itemContainerClass**: PropTypes.string Result Items container class

* **itemClass**: PropTypes.string Result Items class

* **iconClass**: PropTypes.string Icon marker class name

* **inputStyle**: PropTypes.object Styles for the input

* **getItem**: PropTypes.function Callback when an item is clicked in the result

- **markerOptions**: PropTypes.object Options for the marker

- **markerIcon**: PropTypes.element Icon for the marker

- **markerType**: PropTypes.string Type of marker icon

* **multiMarker**: PropTypes.boolean allow for many markers

### Usage

```js
import HPlatform, { HMap, HMapPlaces } from "react-here-map";

<HPlatform
  app_id="2Ts3vDUTLPW8kNUtyFRY"
  app_code="MDivMVFtNkpim-dWuetlWw"
  useCIT
  useHTTPS
  includePlaces
  interactive
>
  <HMapPlaces library="search" />
</HPlatform>;
```
