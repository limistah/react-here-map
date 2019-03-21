"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PlaceItem = _interopRequireDefault(require("./PlaceItem"));

var _glamor = require("glamor");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _contClass = (0, _glamor.css)({
  bottom: "-52px",
  left: "15px",
  width: "400px",
  borderRadius: "5px",
  background: "#00afaa"
});

var PlaceItems = function PlaceItems(props) {
  var containerClass = props.containerClass,
    getItem = props.getItem,
    items = props.items,
    iconClass = props.iconClass,
    itemClass = props.itemClass;
  return _react.default.createElement(
    "div",
    {
      className: "".concat(_contClass, " ").concat(containerClass)
    },
    items.map(function(item) {
      return _react.default.createElement(_PlaceItem.default, {
        iconClass: iconClass,
        itemClass: itemClass,
        getItem: getItem,
        item: item,
        key: item.title
      });
    })
  );
};

PlaceItems.propTypes = {
  items: _propTypes.default.array.isRequired,
  itemClass: _propTypes.default.string,
  containerClass: _propTypes.default.string,
  iconClass: _propTypes.default.string,
  getItem: _propTypes.default.func
};
var _default = PlaceItems;
exports.default = _default;
