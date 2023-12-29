function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
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
  return platform.A == "api.here.com" && options.apikey ? React.Children.map(props.children, function (child) {
    return /*#__PURE__*/React.cloneElement(child, {
      platform: platform,
      options: options
    });
  }) : null;
}
export default Platform;