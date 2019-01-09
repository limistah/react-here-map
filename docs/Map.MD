# MAP

## H.Map

The Map class defines a map instance. By creating this object, you initialize a visible map attached to a DOM element. The Map class is the entry point to all operations involving layers, map objects and geo-screen transformations. Use the argument options to initialize the map with a specific map view.

```js
var platform = new H.service.Platform({
  app_id: "{yourappid}",
  app_code: "{yourappcode}"
});
var maptypes = platform.createDefaultLayers();
var map = new H.Map(document.getElementById("mapdiv"), maptypes.normal.map, {
  center: new H.geo.Point(0, 51),
  zoom: 8
});
```

### Constructor Details

H.Map(element, baseLayer, opt_options)

element: {Element} HTML element into which the map will be rendered
baseLayer: {H.map.layer.Layer} The layer to be used as the base layer.
opt_options: {H.Map.Options=} [optional] Additional map options (for example a map view)

## Method Details

getElement () : {Element} This method retrieves the map root HTML element.
**Returns**: {Element}

setCenter (center, opt_animate) : {H.Map} This method sets the center of the map.

**Parameters**:
center: {H.geo.IPoint} An object containing the coordinates of the new map center
opt_animate: {boolean=} [optional] A value indicating if an animated transition should be applied, default is false
**Returns**: {H.Map} the instance itself

getCenter () : {H.geo.Point} This method returns the current center of the map.
**Returns**: {H.geo.Point}

setZoom (zoom, opt_animate) : {H.Map} This method sets the zoom level of the map. Every zoom level represents a different scale. The map at zoom level 2 is twice as large as the map at zoom level 1.
**Parameters**:
zoom: {number} A value indicating the new map zoom level
opt_animate: {boolean=} [optional] A value indicating if an animated transition should be applied, default is false
**Returns**: {H.Map} the instance itself

getZoom () : {number} This method retrieves the current map zoom level.
**Returns**: {number}

zoomAt (zoom, x, y) This method changes the map zoom level while keeping the map location under the specified screen coordinates (x,y) fixed in the viewport.
**Parameters**:
zoom: {number} A value indicating the new map zoom level
x: {number} A value representing the x coordinate in the map viewport
y: {number} A value representing the y coordinate in the map viewport

setViewBounds (boundingRect, opt_animate) : {H.Map} This method sets a bounding rectangle to be displayed on the map. Maps display a bounding rectangle in such a way that it fits entirely in the current viewport.
**Parameters**:
boundingRect: {H.geo.Rect} A bounding rectangle to be shown on the map
opt_animate: {boolean=} [optional] A value indicating if animated transition should be applied, default is false
**Returns**: {H.Map} the instance itself

getViewBounds () : {H.geo.Rect} This method retrieves the bounding rectangle of the current map view. The rectangle corresponds to the entire visible area of the map.
**Returns**: {H.geo.Rect}

getCameraDataForBounds (rect) : {H.map.ViewModel.CameraData} This method calculates the best CameraModel to show the bounding rectangle provided by the caller.

**Parameters**:
rect: H.geo.Rect} The geographical bounding rectangle to use
**Returns**: {H.map.ViewModel.CameraData} The result, represented by the properties zoom (number) and position (geo.Point)
**Throws**: {Error} This method throws an error if the argument is not a H.geo.Rect

getViewPort () : {H.map.ViewPort} This method retrieves the current map viewport. The viewport can be used to modify padding and margin, which reflect the position of the viewport center and the amount of extra data loaded (for margin)
**Returns**: {H.map.ViewPort}

getViewModel () : {H.map.ViewModel} This method retrieves current view model. View model can be used to modify the current view or camera. H.map.ViewModel
**Returns**: {H.map.ViewModel}

getLayers () : {H.map.DataModel} This method retrieves the map's current layer collection.
**Returns**: {H.map.DataModel}

getImprint () : {H.map.Imprint} This method retrieves the imprint object for this map.
**Returns**: {H.map.Imprint}

capture (callback, opt_capturables, opt_x1, opt_y1, opt_x2, opt_y2) This method captures the desired region of the map and the associated map objects. The method returns an HTML5 Canvas element. The origin of coordinate system is the top-left corner of the viewport. In order to see any captured UI controls in the output, pass in a reference to H.ui.UI object. At present, only H.ui.ScaleBar UI element supports the feature. Note that instances of H.map.Icon taint the output canvas if images from different origins are used. When an image source sets CORS headers, H.map.Icon supports a flag that enables image loading with cross-origin parameters. Internet Explorer always taints the canvas element when SVG images are used. CORS support for images starts only from IE11.

Example

```js
var map = new H.Map(mapContainer, defaultLayers.normal.map, {
  center: { lat: -40, lng: 178 },
  zoom: 2
});
var ui = H.ui.UI.createDefault(map, defaultLayers);
map.capture(
  function(canvas) {
    // Here we have the canvas with desired area of the map,
    // (from top left (0,0) corner to the bottom right (100,100) corner)
  },
  [ui],
  0,
  0,
  100,
  100
);
```

**Parameters**:
callback: {function(HTMLCanvasElement=)} Callback function to call once result of capture has completed
opt_capturables: {Array<H.util.ICapturable>=} [optional] Collection of "capturable" element(s) to draw onto the resulting canvas
opt_x1: {number=} [optional] The x coordinate of the left edge of the capturing rectangle, defaults to 0
opt_y1: {number=} [optional] The y coordinate of the top edge of the capturing rectangle, defaults to 0
opt_x2: {number=} [optional] The x coordinate of the right edge of the capturing rectangle, defaults to viewport width
opt_y2: {number=} [optional] The y coordinate of the bottom edge of the capturing rectangle, defaults to viewport height
**Throws**: {Error} This method throws an error if the callback parameter is not specified or is not a function

setEngineType (type) : {H.Map} This method sets the rendering engine type for the map. The rendering engine is responsible for displaying, for example, tiles and data on the map.
**Parameters**:
type: {H.Map.EngineType}
**Returns**: {H.Map} the map itself

storeContent (opt_onprogress, opt_bounds, opt_min, opt_max, opt_layer) : {H.util.Request} This method persistently stores the content of a map layer for a given area and range of zoom levels. It can be used to enable map rendering when no internet connection is available and also to reduce the download traffic for frequently visited map areas.
**Parameters**:
opt_onprogress: {function(H.util.Request)=} [optional] A callback invoked each time the progress state of the returned store request changes.
opt_bounds: {H.geo.Rect=} [optional] The area to store, default is the current view bounds
opt_min: {number=} [optional] The minimum zoom level to store, default is the current zoom level
opt_max: {number=} [optional] The maximum zoom level to store, default is the current zoom level
opt_layer: {H.map.layer.BaseTileLayer=} [optional] The layer to store, default is the current base layer
**Returns**: {H.util.Request} A handle to the created storage request
**Throws**: {H.lang.IllegalOperationError} If the browser or the passed layer does not support persistent storage of map layer content

clearContent (opt_onprogress) : {H.util.Request} This method clears the entire stored content.
**Parameters**:
opt_onprogress: {function(H.util.Request)=} [optional] A callback which is invoked each time the progress state of the returned clear request changes
**Returns**: {H.util.Request} A handle to the created flush request

addLayer (layer, opt_idx) : {H.Map} This method adds a layer to the map.
**Parameters**:
layer: {H.map.layer.Layer} The map layer to be added
opt_idx: {number=} [optional] index at which the new layer should be inserted
**Returns**: {H.Map} current map instance

removeLayer (layer) : {H.Map} This method removes a layer from the map.

**Parameters**:
layer: {H.map.layer.Layer} The map layer to be removed
**Returns**: {H.Map} current map instance

setBaseLayer (layer) : {H.Map} This method sets the provided layer as base map. The layer is inserted as the bottom-most layer in the map.

**Parameters**:
layer: {H.map.layer.Layer} The layer to use as base map
**Returns**: {H.Map} the instance itself

getBaseLayer () : {?H.map.layer.Layer} This method gets the current base map layer.
**Returns**: {?H.map.layer.Layer} representing the current base map layer.

geoToScreen (geoPoint) : {?H.math.Point} This method retrieves the screen coordinates corresponding to the geographical coordinates supplied by the caller.
**Parameters**:
geoPoint: {H.geo.IPoint}point on the map
**Returns**: {?H.math.Point}

screenToGeo (x, y) : {?H.geo.Point} This method retrieves the geographical coordinates corresponding to the screen coordinates supplied by the caller.
**Parameters**:
x: {number} Map viewport x-axis pixel coordinate
y: {number} Map viewport y-axis pixel coordinate
**Returns**: {?H.geo.Point} A object containing the screen coordinates for the specified geographical location.

screenToCameraData (x, y) : {H.map.ViewModel.CameraData} This method retrieves the camera data according to the given screen coordinates. The method converts screen pixel coordinates to correct camera data object.
**Parameters**:
x: {number} map viewport x-axis pixel coordinate
y: {number} map viewport y-axis pixel coordinate
**Returns**: {H.map.ViewModel.CameraData}

addObject (mapObject) : {!H.map.Object} This method adds a map object to the map. The map object can be a marker or a spatial object such as a polygon or polyline.

**Parameters**:
mapObject: {!H.map.Object} The map object to add
**Returns**: {!H.map.Object} The added map object
**Throws**: {Error} This method throws an error if the mapObject parameter is not a map object.

removeObject (mapObject) : {!H.map.Object} This method removes previously added map object from the map.
**Parameters**:
mapObject: {!H.map.Object} The map object to remove
**Returns**: {!H.map.Object} The removed map object
**Throws**: {Error} This method throws an error if the mapObject parameter is not a map object.

getObjects () : {Array<H.map.Object>} This method obtains a list of all objects that have been added to the map (beside Group objects).
Note: Adding or removing objects on the obtained list doesn't affect the map. Use the map's addObject and removeObjects methods instead.
**Returns**: {Array<H.map.Object>} the list of all user objects which are currently on the map.

addObjects (mapObjects) : {H.Map} This method adds an array of objects or an object group to the map.
Note: Objects which were added to the map previously are not be added again.
**Parameters**:
mapObjects: {Array<!H.map.Object>}
**Returns**: {H.Map} The map instance
**Throws**: {Error} This method throws an error if the mapObjects parameter is neither an object group nor an array

removeObjects (mapObjects) : {H.Map} This method removes an array of objects or an object group from the map.
**Parameters**:
mapObjects: {(Array<H.map.Object> | H.map.Group)}
**Returns**: {H.Map} the map instance
**Throws**: {Error} This method throws an error if the mapObjects parameter is neither an object group nor an array

getObjectAt (x, y) : {?H.map.Object} This method retrieves the top-most z-ordered map object found under the specific screen coordinates. Coordinates are viewport pixel coordinates starting from top-left corner as origin (0, 0).
**Parameters**:
x: {number} map viewport x-axis pixel coordinate
y: {number} map viewport y-axis pixel coordinate
**Returns**: {?H.map.Object} The top-most map object or null if no object has been found

getObjectsAt (x, y) : {Array<!H.map.Object>} This method retrieves a list of map objects in descending z-order found under the specific screen coordinates. The coordinates are viewport pixel coordinates starting from top left corner as origin (0, 0).
**Parameters**:
x: {number} map Viewport x-axis pixel coordinate
y: {number} map Viewport y-axis pixel coordinate
**Returns**: {Array<!H.map.Object>}

addEventListener (type, handler, opt_capture, opt_scope) This method adds a listener for a specific event.
Note that to prevent potential memory leaks, you must either call removeEventListener or dispose on the given object when you no longer need it.
**Parameters**:
type: {string} The name of the event
handler: {!Function} An event handler function
opt_capture: {boolean=} [optional] true indicates that the method should listen in the capture phase (bubble otherwise)
opt_scope: {Object=} [optional]An object defining the scope for the handler function

removeEventListener (type, handler, opt_capture, opt_scope) This method removes a previously added listener from the EventTarget instance.
**Parameters**:
type: {string} The name of the event
handler: {!Function} A previously added event handler
opt_capture: {boolean=} [optional] true indicates that the method should listen in the capture phase (bubble otherwise)
opt_scope: {Object=} [optional] An object defining the scope for the handler function

dispatchEvent (evt) This method dispatches an event on the EventTarget object.
**Parameters**:
evt: {(H.util.Event | string)} An object representing the event or a string with the event name

dispose () This method removes listeners from the given object. Classes that extend EventTarget may need to override this method in order to remove references to DOM Elements and additional listeners.

addOnDisposeCallback (callback, opt_scope) This method adds a callback which is triggered when the EventTarget object is being disposed.
**Parameters**:
callback: {!Function} The callback function.
opt_scope: {Object=} [optional] An optional scope for the callback function

**Event Details**
mapviewchangestart: {H.util.Event} Event fired when changes to the current map view are starting.
mapviewchange: {H.map.ChangeEvent} Event fired when changes to the current map view are ongoing.
mapviewchangeend: {H.util.Event} Event fired when changes to the current map view are ending.
baselayerchange: {H.util.ChangeEvent} Event fired when the map base layer changes.
enginechange: {H.util.ChangeEvent} Event fired when the map engine changes, that is when entering panorama. The event holds references to old and new engine type.

## H.Map.Options

This type defines options that can be used to initialize the map.
**Property Details**
center: {H.geo.IPoint=} [optional] The initial center of the map, default is {lat:0, lng: 0}
zoom: {number=} [optional] The initial zoom level of the map, default is 0 or the minimal zoom level of the base map
bounds: {H.geo.Rect=} [optional] The view bounds to be displayed on the map. If provided, it takes precedence over center and zoom
layers: {Array<H.map.layer.Layer>=} [optional] A list of layers to render on top of the base map
engineType: {H.Map.EngineType=} [optional] The initial engine type to use, default is P2D
pixelRatio: {number} The pixelRatio to use for over-sampling in cases of high-resolution displays, default is 1
imprint: {?H.map.Imprint.Options=} [optional] The imprint options or null to suppress the imprint
renderBaseBackground: {H.Map.BackgroundRange=} [optional] An object describing how many cached zoom levels should be used as a base map background while base map tiles are loading. Example: {lower: 3, higher: 2}.
autoColor: {boolean=} [optional] A value indicating whether the UI colors should be automatically adjusted to the base layer (true, default). At present, only the copyright style is adjusted. See H.map.layer.Layer.Options#dark
margin: {number=} [optional] The size in pixel of the supplemental area to render for each side of the map
padding: {H.map.ViewPort.Padding=} [optional] The padding in pixels for each side of the map
fixedCenter: {boolean=} [optional] A value indicating whether the center of the map should remain unchanged if the size or padding of the viewport have been changed (true, default), or not (false)
noWrap: {boolean=} [optional] Indicates whether to wrap the world on longitude axes. When set to false, multiple worlds are rendered. When set to true, only one world will be rendered. Default is false.

## H.Map.BackgroundRange

This variable defines the number of lower and higher zoom levels, where cached content of the base map is rendered while content of the current zoom level is still loading. For example, if range is set to {lower: 3, higher: 2} and current level is 10, then the rendering engine tries to display cached tiles from the lower zoom levels 7, 8, 9 and the higher levels 11 and 12.

**Property Details**
lower: {number} The number of lower zoom levels to take into account, default is 0
higher: {number} The number of higher zoom levels to take into account, default is 0

## H.Map.EngineType

Types of engines.

P2D - H.map.render.p2d.RenderEngine
PANORAMA - H.map.render.panorama.RenderEngine
**Enumeration Constants Details**
static P2D
static PANORAMA
