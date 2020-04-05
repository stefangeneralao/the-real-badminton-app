import React from 'react';
import { compose } from 'recompose';
import { consumeUserToken } from '#root/contexts/userToken';
import { consumeItems } from '#root/contexts/items';
import Item from '#root/components/Item/Item';

const ItemsWrapper = ({ items, toggleChecked, userToken }) => {
  if (!items.length) {
    return (
      <div>No items</div>
    );
  }
  
  return (
    <div>
      { items.map(({ id, value, voters }) => (
        <Item
          key={ id }
          value={ value }
          isChecked={ voters.includes(userToken) }
          toggleChecked={ () => toggleChecked(id) }
          voters={ voters }
        />
      )) }
    </div>
  );
}

export default compose(
  consumeItems,
  consumeUserToken,
)(ItemsWrapper);