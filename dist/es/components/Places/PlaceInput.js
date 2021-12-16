import React from "react";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import merge from "lodash.merge";
var handleInputChange = debounce(function (value, fn) {
  return fn(value);
}, 500);
var _style = {
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

function PlaceInput(_ref) {
  var getValue = _ref.getValue,
      style = _ref.style,
      className = _ref.className;
  style = merge(_style, style);
  return /*#__PURE__*/React.createElement("input", {
    className: className,
    style: style,
    placeholder: "Enter a value",
    onChange: function onChange(e) {
      return handleInputChange(e.target.value, getValue);
    }
  });
}

handleInputChange.propTypes = {
  getValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};
export default PlaceInput;