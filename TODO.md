## **TODO**

```
1. Allow UI control (positioning, styling, disabling specific parts)

HMap
  - Show current location marker

Event Handling
  - Add markerEvents to marker component itself


// Report issues to expand this list
```

## **MIGHT DO**

```
1. Implement full version 3.1 support

HMapPlaces
  - Refact

HMapGeoCode
  - Refact

HMapRoute
  - Change IsoLine on waypoints change
  - remove old IsoLine on waypoints change
```

## **DONE**

```
1. Unified coords and points to only allow arrays or single objects with lat and lng values (LatLng and LatLng[])
2. Converted class based components to functional components
3. Added more Error handling
4. Added map localization
5. Map resizes on window resize
6. Allow UI control (enable/disable)
7. Added typings

HMapPolyline
  - Refact

HMapPolygon
  - Refact

HMapCircle
  - Refact
  - radius is now in km (instead of m)

HMapRectangle
  - Refact

HMap
  - Refact
  - Recenter/rezoom when center/zoom value changes
  - Centralize reset map
  - Center on current location (useLocation)
  - Default size map (100% w x h)
  - Convert component to function

HPlatform
  - Refact

HMapRoute
  - Refact
  - HMapRoute render RouteLine
  - HMapRoute render IsoLine
  - Change RouteLine on waypoints change
  - Remove old RouteLine on waypoints change
  - zIndex of start and end marker defaults to 1 (instead of 0)
  - Add edit mode (toggle)
  - Enable adding markers (currently added to end of list)
  - Enable removing markers
  - Enable moving markers
  - setToViewBounds disabled in edit mode
  - Allow different icons for start-, end- and middlepoints and edit mode
  - Always leave atleast 2 markers on the map

HMapGeoCode
  - Refact

HMapLayer
  - Refact

HMapMarker
  - Refact
  - Allow icon to be set to 'none'
  - Allow custom icons
  - Globalized marker events (still needs to be added to marker)

HMapMarkers
  - Remove all markers when LatLng[] changes
```
