import React from 'react';
import { consumeItems } from '#root/contexts/items';
import Item from '#root/components/Item/Item';

const ItemsWrapper = ({ items, toggleChecked }) => {
  if (!items.length) {
    return (
      <div>No items</div>
    );
  }
  
  return (
    <div>
      { items.map(({ id, value, isChecked, voterIds }) => (
        <Item
          key={ id }
          value={ value }
          isChecked={ isChecked }
          toggleChecked={ () => toggleChecked(id) }
          voterIds={ voterIds }
        />
      )) }
    </div>
  );
}

export default consumeItems(ItemsWrapper);