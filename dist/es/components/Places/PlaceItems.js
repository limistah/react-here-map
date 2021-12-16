import React from "react";
import PropTypes from "prop-types";
import PlaceItem from "./PlaceItem";
import { css } from "glamor";

var _contClass = css({
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
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(_contClass, " ").concat(containerClass)
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(PlaceItem, {
      iconClass: iconClass,
      itemClass: itemClass,
      getItem: getItem,
      item: item,
      key: item.title
    });
  }));
};

PlaceItems.propTypes = {
  items: PropTypes.array.isRequired,
  itemClass: PropTypes.string,
  containerClass: PropTypes.string,
  iconClass: PropTypes.string,
  getItem: PropTypes.func
};
export default PlaceItems;