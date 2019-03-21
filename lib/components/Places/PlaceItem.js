"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _glamor = require("glamor");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var iconStyle = (0, _glamor.css)({
  height: "25px",
  width: "19px"
});
var itemStyle = (0, _glamor.css)({
  width: "100%",
  background: "transparent",
  padding: "10px 15px",
  fontWeight: "700",
  color: "#eff",
  borderRadius: "5px",
  fontSize: ".85em",
  borderBottom: "1px dashed #eee",
  ":last-of-type": {
    borderBottom: 0
  },
  ":hover": {
    background: "#76e3dc",
    color: "#fff",
    cursor: "pointer"
  }
});

function PlaceItem(props) {
  var item = props.item,
    itemClass = props.itemClass,
    iconClass = props.iconClass,
    getItem = props.getItem;

  var _getItem = typeof getItem == "function" ? getItem : function() {};

  return _react.default.createElement(
    "div",
    {
      className: "".concat(itemStyle, " ").concat(itemClass),
      onClick: function onClick(e) {
        return _getItem(item);
      }
    },
    _react.default.createElement("img", {
      className: "".concat(iconStyle, " ").concat(iconClass),
      src: item.icon
    }),
    item.title
  );
}

PlaceItem.propTypes = {
  item: _propTypes.default.object.isRequired,
  itemClass: _propTypes.default.string,
  iconClass: _propTypes.default.string,
  getItem: _propTypes.default.func
};
var _default = PlaceItem;
exports.default = _default;
