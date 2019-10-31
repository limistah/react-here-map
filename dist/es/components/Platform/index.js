function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, useState } from "react";
import loadMap from "./../../libs/loadMap";
import defaults from "./../../libs/defaults";
import merge from "lodash.merge";
import initPlatform from "./../../libs/initPlatform";

var optionMerger = function optionMerger(options) {
  return merge(defaults, options);
};

function Platform(props) {
  var _useState = useState({
    platform: {},
    options: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      platformData = _useState2[0],
      setPlatformData = _useState2[1];

  useEffect(function () {
    // const { version, interactive, includeUI, includePlaces } = props;
    loadMap(props).then(function (options) {
      var platform = initPlatform(options);
      setPlatformData({
        platform: platform,
        options: options
      });
    });
  }, [platformData.platform.A]);
  var platform = platformData.platform,
      options = platformData.options;
  return platform.A == "api.here.com" && options.app_code ? React.Children.map(props.children, function (child) {
    return React.cloneElement(child, {
      platform: platform,
      options: options
    });
  }) : null;
}

export default Platform;