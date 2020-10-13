import React from 'react';
import PropTypes from 'prop-types';
import build from '../../libs/mapBuilder';
import defaults from '../../libs/defaults';
import setEventListeners from '../../libs/setEventListeners';
import changeMapStyle from '../../libs/changeMapStyle';
import merge from 'lodash.merge';
import { recenterMap, rezoomMap } from '../../libs/helpers';

class HMap extends React.Component {
  constructor() {
    super();
    this.container = React.createRef();
    this.state = { builder: {} };
  }

  componentDidMount() {
    const _props = this.props;
    const _options = merge(
      {
        container: this.container.current,
        build: true
      },
      _props.options,
      _props
    );
    delete _options.options;
    const builder = build(_props.platform, _options);
    setEventListeners(builder);
    if (_options.includeUI) {
      changeMapStyle(builder);
    }
    this.setState({ builder });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // HACK - Temporary recenter and zoom fix
    if (
      this.props.mapOptions &&
      this.props.mapOptions.center !== nextProps.mapOptions.center
    ) {
      recenterMap(this.state.builder.map, true);
      return true;
    } else if (
      this.props.mapOptions &&
      this.props.mapOptions.zoom !== nextProps.mapOptions.zoom
    ) {
      rezoomMap(this.state.builder.map, true);
      return true;
    }
    return true;
  }

  createLoadingComponent() {
    return <div>Loading</div>;
  }

  displayChildren() {
    const { children } = this.props;
    const { map, platform, ui, options } = this.state.builder;
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { map, platform, ui, __options: options })
    );
  }

  render() {
    const { style, loadingEl } = this.props;
    const { options } = this.state.builder;

    const loading = loadingEl || this.createLoadingComponent();

    return (
      <div
        id={defaults.containerId}
        className={defaults.defaultClassName}
        style={style}
        ref={this.container}
      >
        {typeof H === 'undefined' && !options && loading}
        {typeof H === 'object' && options && this.displayChildren()}
      </div>
    );
  }
}

HMap.propTypes = {
  version: PropTypes.string,
  mapType: PropTypes.string,
  useEvents: PropTypes.bool,
  interactive: PropTypes.bool,
  includeUI: PropTypes.bool,
  mapEvents: PropTypes.object,
  platform: PropTypes.object,
  options: PropTypes.object,
  mapOptions: PropTypes.object
};

export default HMap;
