import React from 'react';
import PropTypes from 'prop-types';
import PlaceItem from './PlaceItem';
import { css } from 'glamor';

const _contClass = css({
  bottom: '-52px',
  left: '15px',
  width: '400px',
  borderRadius: '5px',
  background: '#00afaa'
});

const PlaceItems = (props) => {
  const { containerClass, getItem, items, iconClass, itemClass } = props;
  return (
    <div className={`${_contClass} ${containerClass}`}>
      {items.map((item) => (
        <PlaceItem
          iconClass={iconClass}
          itemClass={itemClass}
          getItem={getItem}
          item={item}
          key={item.title}
        />
      ))}
    </div>
  );
};

PlaceItems.propTypes = {
  items: PropTypes.array.isRequired,
  itemClass: PropTypes.string,
  containerClass: PropTypes.string,
  iconClass: PropTypes.string,
  getItem: PropTypes.func
};

export default PlaceItems;
