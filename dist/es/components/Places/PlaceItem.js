import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
var iconStyle = css({
  height: "25px",
  width: "19px"
});
var itemStyle = css({
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
  var _getItem = typeof getItem == "function" ? getItem : function () {};
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(itemStyle, " ").concat(itemClass),
    onClick: function onClick(e) {
      return _getItem(item);
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "".concat(iconStyle, " ").concat(iconClass),
    src: item.icon
  }), item.title);
}
PlaceItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemClass: PropTypes.string,
  iconClass: PropTypes.string,
  getItem: PropTypes.func
};
export default PlaceItem;