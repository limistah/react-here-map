import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import build from '../../libs/mapBuilder';
import defaults from '../../libs/defaults';
import setEventListeners from '../../libs/setEventListeners';
import changeMapStyle from '../../libs/changeMapStyle';
import merge from 'lodash.merge';
import { centerMap, zoomMap, setCurrentLocation } from '../../libs/helpers';

function HMap(props) {
  const container = useRef();
  const [builder, setBuilder] = useState({});

  useEffect(() => {
    const _options = merge(
      {
        container: container.current,
        build: true,
        style: { height: '100%', width: '100%' }
      },
      props.options,
      props
    );
    delete _options.options;

    const builder = build(props.platform, _options);
    setBuilder(builder);

    setEventListeners(builder.map);
    if (_options.includeUI) {
      changeMapStyle(builder);
    }
    if (_options.useLocation) {
      setCurrentLocation(builder.map, true);
    }
  }, []);

  useEffect(() => {
    if (builder.map) {
      const newCenter = props.mapOptions.center;
      const currentCenter = builder.map.getCenter();

      if (
        newCenter.lat !== currentCenter.lat &&
        newCenter.lng !== currentCenter.lng
      ) {
        centerMap(builder.map, newCenter, true);
      }

      const newZoom = props.mapOptions.zoom;
      const currentZoom = builder.map.getZoom();

      if (newZoom !== currentZoom) {
        zoomMap(builder.map, newZoom, true);
      }
    }
  }, [props.mapOptions.center, props.mapOptions.zoom]);

  function createLoadingComponent() {
    return <div>Loading</div>;
  }

  function displayChildren() {
    const { children } = props;
    const { map, platform, ui, interaction, options } = builder;
    return React.Children.map(children, (child) =>
      React.cloneElement(child, {
        map,
        platform,
        ui,
        interaction,
        __options: options
      })
    );
  }

  const { style, loading } = props;

  const styleEl = style || { height: '100%', width: '100%' };
  const loadingEl = loading || createLoadingComponent();

  return (
    <div
      id={defaults.containerId}
      className={defaults.defaultClassName}
      style={styleEl}
      ref={container}
    >
      {typeof H === 'undefined' && !builder.options && loadingEl}
      {typeof H === 'object' && builder.options && displayChildren()}
    </div>
  );
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
