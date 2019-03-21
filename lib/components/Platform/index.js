"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _loadMap = _interopRequireDefault(require("./../../libs/loadMap"));

var _defaults = _interopRequireDefault(require("./../../libs/defaults"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _initPlatform = _interopRequireDefault(
  require("./../../libs/initPlatform")
);

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

var optionMerger = function optionMerger(options) {
  return (0, _lodash.default)(_defaults.default, options);
};

function Platform(props) {
  var _useState = (0, _react.useState)({
      platform: {},
      options: {}
    }),
    _useState2 = _slicedToArray(_useState, 2),
    platformData = _useState2[0],
    setPlatformData = _useState2[1];

  (0, _react.useEffect)(
    function() {
      // const { version, interactive, includeUI, includePlaces } = props;
      (0, _loadMap.default)(props).then(function(options) {
        var platform = (0, _initPlatform.default)(options);
        setPlatformData({
          platform: platform,
          options: options
        });
      });
    },
    [platformData.platform.A]
  );
  var platform = platformData.platform,
    options = platformData.options;
  return platform.A == "api.here.com" && options.app_code
    ? _react.default.Children.map(props.children, function(child) {
        return _react.default.cloneElement(child, {
          platform: platform,
          options: options
        });
      })
    : null;
}

var _default = Platform;
exports.default = _default;
