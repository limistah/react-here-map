"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapBuilder = _interopRequireDefault(require("../../libs/mapBuilder"));

var _defaults = _interopRequireDefault(require("../../libs/defaults"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

var HMap =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(HMap, _React$Component);

    function HMap(props) {
      var _this;

      _classCallCheck(this, HMap);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(HMap).call(this, props)
      );
      _this.container = _react.default.createRef();
      _this.state = {
        builder: {}
      };
      return _this;
    }

    _createClass(HMap, [
      {
        key: "componentDidMount",
        value: function componentDidMount() {
          var _props = this.props;

          var _options = (0, _lodash.default)(
            {
              container: this.container.current,
              build: true
            },
            _props.options,
            _props
          );

          delete _options.options;
          var builder = (0, _mapBuilder.default)(_props.platform, _options);
          this.setState({
            builder: builder
          });
        }
      },
      {
        key: "createLoadingComponent",
        value: function createLoadingComponent() {
          return _react.default.createElement("div", null, "Loading");
        }
      },
      {
        key: "displayChildren",
        value: function displayChildren() {
          var children = this.props.children;
          var _this$state$builder = this.state.builder,
            map = _this$state$builder.map,
            platform = _this$state$builder.platform,
            ui = _this$state$builder.ui,
            options = _this$state$builder.options;
          return _react.default.Children.map(children, function(child) {
            return _react.default.cloneElement(child, {
              map: map,
              platform: platform,
              ui: ui,
              __options: options
            });
          });
        }
      },
      {
        key: "render",
        value: function render() {
          var _this$props = this.props,
            style = _this$props.style,
            loadingEl = _this$props.loadingEl;
          var options = this.state.builder.options;
          var loading = loadingEl || this.createLoadingComponent();
          return _react.default.createElement(
            "div",
            {
              id: _defaults.default.containerId,
              className: _defaults.default.defaultClassName,
              style: style,
              ref: this.container
            },
            typeof H === "undefined" && !options && loading,
            (typeof H === "undefined" ? "undefined" : _typeof(H)) ===
              "object" &&
              options &&
              this.displayChildren()
          );
        }
      }
    ]);

    return HMap;
  })(_react.default.Component);

HMap.propTypes = {
  version: _propTypes.default.string,
  mapType: _propTypes.default.string,
  useEvents: _propTypes.default.bool,
  interactive: _propTypes.default.bool,
  includeUI: _propTypes.default.bool,
  mapEvents: _propTypes.default.object,
  platform: _propTypes.default.object,
  options: _propTypes.default.object,
  mapOptions: _propTypes.default.object
};
var _default = HMap;
exports.default = _default;
