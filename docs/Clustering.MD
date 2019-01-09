# H.clustering

Namespace Summary
This namespace contains classes and functionality to manage marker clustering.

Namespace Description
This namespace contains classes and functionality to manage marker clustering.

**H.clustering.DataPoint**
**H.clustering.ICluster**
**H.clustering.INoisePoint**
**H.clustering.IResult**
**H.clustering.ITheme**
**H.clustering.Provider**

## H.clustering.DataPoint

**Class Summary**
Implements: H.geo.IPoint
**Class Description**
This class represents the input data structure for data points to be clustered.

**Constructor Details**
H.clustering.DataPoint(lat, lng, opt_weight, opt_data)

**Parameters**:
lat: {H.geo.Latitude} The latitude coordinate of the position of the data point
lng: {H.geo.Longitude} The longitude coordinate of the position of the data point
opt*weight: {number=} [optional] The weight of the data point as a positive number, the default is 1
opt_data: {*=} [optional] Optional data, which will be associated with the given DataPoint
**Property Details**
lat: {H.geo.Latitude} This property holds the latitude of the data point.
lng: {H.geo.Longitude} This property holds the longitude of the data point.
wt: {number} This property holds the (clustering) weight of the data point.
data: {\_} This property holds the data associated with the given data point.

## H.clustering.ICluster

**Interface Description**
This interface encapsulates a cluster of data points, which fulfill the clustering specification (the data points are within the epsilon and there are enough points to form a cluster).

We can make an analogue with a Tree. In that case, the given cluster is a node in a tree, children of that node are sub-clusters and leaves of that sub-tree are the noise points.

Sub-clusters of a cluster can be seen on a map when changing the zoom level, as parent clusters split into smaller clusters and possible noise points.

**Method Details**
getMaxZoom () : {number} This method retrieves the maximum zoom level at which the given cluster does not break up into into sub-clusters and/or noise points.
Returns: {number} A value indicating the highest zoom level at which the given cluster does not break into sub-clusters and/or noise points

getBounds () : {H.geo.Rect} This method retrieves the bounding rectangle of the given cluster.
Returns: {H.geo.Rect} An object representing the bounding rectangle for the cluster

forEachEntry (callback) This method invokes the specified callback for each "entry" of the cluster. That "entry" can be either a cluster which implements H.clustering.ICluster interface or a noise point which implements H.clustering.INoisePoint interface.
In an analogy to the example from the class description, the method traverses through all nodes of the tree beside the root.

Parameters:
callback: {function(H.clustering.IResult)} The callback to invoke. It receives the currently traversed entry as an argument, which is cluster or noise point

forEachDataPoint (callback) This method invokes the specified callback for each data point in the given cluster. In an analogy to the example from the class description, the method traverses only through the leaf nodes of the tree.
Parameters:
callback:
{function(H.clustering.INoisePoint)} The callback to invoke. It receives the currently traversed noise point as argument.
getPosition () : {H.geo.Point} This method retrieves the geographical position of the cluster result.
Returns: {H.geo.Point} An object containing the geographical coordinates of the location.

getWeight () : {number} This method retrieves the weight of the cluster result.
Returns: {number} A value indicating the weight of the cluster result.

isCluster () : {boolean} This method retrieves a value indicating whether the cluster result is a cluster or a noise point.
Returns: {boolean} true if the result is a cluster, otherwise false

getMinZoom () : {number} This method retrieves the minimum zoom level at which the given item is not part of another cluster.
Returns: {number} A value indicating the minimum zoom level
