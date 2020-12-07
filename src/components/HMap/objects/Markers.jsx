import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';
import Marker from './Marker';
import { removeObjectFromGroup } from '../../../libs/helpers';

function Markers(props) {
  const {
    points,
    icon,
    DOM,
    options,
    setViewBounds,
    draggable,
    group,
    animated,
    map,
    __options
  } = merge(
    {
      points: [],
      DOM: false,
      setViewBounds: true,
      draggable: false,
      animated: true
    },
    props
  );

  const [markerGroup] = useState(group || new H.map.Group());

  useEffect(() => {
    handleErrors();
  }, [points]);

  function handleErrors() {
    // Marker can only be initialized inside HMap
    if (!H || !H.map || !map) {
      throw new Error('HMap has to be initialized before adding Map Objects');
    }

    if (!Array.isArray(points)) {
      throw new Error('"points" should be an array');
    }
  }

  if (points.length) {
    return renderMarkers();
  } else {
    removeObjectFromGroup(markerGroup);
  }

  function renderMarkers() {
    return (
      <React.Fragment>
        {points.map((waypoint, index) => {
          return (
            <Marker
              key={index}
              coords={waypoint}
              map={map}
              options={options}
              icon={icon}
              DOM={DOM}
              setViewBounds={false}
              draggable={draggable}
              animated={animated}
              group={markerGroup}
              __options={__options}
            />
          );
        })}
      </React.Fragment>
    );
  }

  if (setViewBounds && map && group) {
    map.setViewBounds(group.getBounds(), animated);
  }

  return null;
}

Markers.propTypes = {
  points: PropTypes.array.isRequired,
  icon: PropTypes.any,
  DOM: PropTypes.bool,
  options: PropTypes.object,
  setViewBounds: PropTypes.bool,
  draggable: PropTypes.bool,
  group: PropTypes.object,
  animated: PropTypes.bool,
  map: PropTypes.object,
  __options: PropTypes.object
};

export default Markers;
