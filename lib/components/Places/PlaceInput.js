"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash2 = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var handleInputChange = (0, _lodash.default)(function(value, fn) {
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
  style = (0, _lodash2.default)(_style, style);
  return _react.default.createElement("input", {
    className: className,
    style: style,
    placeholder: "Enter a value",
    onChange: function onChange(e) {
      return handleInputChange(e.target.value, getValue);
    }
  });
}

handleInputChange.propTypes = {
  getValue: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
var _default = PlaceInput;
exports.default = _default;
