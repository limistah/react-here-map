import React from "react";
import PropTypes from "prop-types";
import build from "../mapBuilder";
import defaults from "../libs/defaults";
import merge from "lodash.merge";

class HMap extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { builder: {} };
  }

  async componentDidMount() {
    const args = merge(
      {
        container: this.container.current,
        build: true
      },
      this.props
    );
    const builder = await build(args);
    console.log(builder);
    this.setState({ builder });
  }
  createLoadingComponent() {
    return <div>Loading</div>;
  }
  displayChildren() {
    const { children } = this.props;
    const { map, platform, ui } = this.state.builder;
    return React.Children.map(children, child =>
      React.cloneElement(child, { map, platform, ui })
    );
  }
  render() {
    const { style, loadingEl } = this.props;
    const loading = loadingEl || this.createLoadingComponent();

    return (
      <div
        id={defaults.containerId}
        className={defaults.defaultClassName}
        style={style}
        ref={this.container}
      >
        {typeof H === "undefined" && loading}
        {typeof H === "object" && this.displayChildren()}
      </div>
    );
  }
}

HMap.propTypes = {
  version: PropTypes.string,
  appId: PropTypes.string.isRequired,
  appCode: PropTypes.string.isRequired,
  mapType: PropTypes.string,
  useEvents: PropTypes.bool,
  interactive: PropTypes.bool,
  includeUI: PropTypes.bool,
  mapEvents: PropTypes.object,
  mapOptions: PropTypes.object
};

export default HMap;
