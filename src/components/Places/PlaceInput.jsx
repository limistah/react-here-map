import React from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import merge from "lodash.merge";

const handleInputChange = debounce((value, fn) => fn(value), 500);
const _style = {
  margin: 0,
  fontFamily: "inherit",
  display: "block",
  width: "100%",
  padding: ".375rem .75rem",
  fontSize: "1rem",
  lineHeight: 1.5,
  color: "#495057",
  backgroundColor: "#fff",
  backgroundClip: "padding-box",
  border: "1px solid #ced4da",
  borderRadius: ".25rem",
  transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out"
};
function PlaceInput({ getValue, style, className }) {
  style = merge(_style, style);
  return (
    <input
      className={className}
      style={style}
      placeholder="Enter a value"
      onChange={e => handleInputChange(e.target.value, getValue)}
    />
  );
}

handleInputChange.propTypes = {
  getValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

export default PlaceInput;
