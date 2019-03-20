import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";

const iconStyle = css({
  height: "25px",
  width: "19px"
});

const itemStyle = css({
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
  const { item, itemClass, iconClass, getItem } = props;
  const _getItem = typeof getItem == "function" ? getItem : () => {};
  return (
    <div className={`${itemStyle} ${itemClass}`} onClick={e => _getItem(item)}>
      <img className={`${iconStyle} ${iconClass}`} src={item.icon} />
      {item.title}
    </div>
  );
}

PlaceItem.propTypes = {
  item: PropTypes.object.isRequired,
  itemClass: PropTypes.string,
  iconClass: PropTypes.string,
  getItem: PropTypes.func
};

export default PlaceItem;
