"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotProp = _interopRequireDefault(require("dot-prop"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = function _default(mapTypes, mapType) {
  var items = mapType.split(".");
  var mainType = mapTypes[items[0]]; // Some of the types are array, and should have the second element in the split type to be an item in it

  var _test = Array.isArray(mainType) && mainType.includes(items[1]);

  var __test = mainType === true;

  if (!_test && !__test) {
    throw new Error(
      "mapType Should be one from https://developer.here.com/documentation/maps/topics/map-types.html in dot notation"
    );
  }
};

exports.default = _default;
