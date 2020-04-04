import React, { createContext, useState } from 'react';
import contextHOC from '#root/utils/contextHOC';
import { v4 as uuid } from 'uuid';
import { consumeUserToken } from '#root/contexts/userToken';

const ItemsContext = createContext();

const ItemsProvider = ({ children, userToken }) => {
  const [ items, setItems ] = useState([]);

  const addItem = value => {
    const newItem = {
      id: uuid(),
      value,
      isChecked: false,
      voterIds: [],
    };

    setItems([ ...items, newItem ]);
  };

  const checkItem = itemId => {
    const newItems = items.map(item => {
      const { id, voterIds } = item;
      if (id === itemId) {
        const newVoterIds = [ ...voterIds, userToken ];
        
        return {
          ...item,
          isChecked: true,
          voterIds: newVoterIds,
        };
      } else {
        return item;
      }
    });

    setItems(newItems);
  };

  const uncheckItem = itemId => {
    const newItems = items.map(item => {
      const { id, voterIds } = item;
      if (id === itemId) {
        const newVoterIds = voterIds.filter(id => id !== userToken);
        
        return {
          ...item,
          isChecked: false,
          voterIds: newVoterIds,
        };
      } else {
        return item;
      }
    });

    setItems(newItems);
  };
  
  const toggleChecked = itemId => {
    const item = items.find(({ id }) => id === itemId);
    if (item.isChecked) {
      uncheckItem(itemId);
    } else {
      checkItem(itemId);
    }
  };
  
  return (
    <ItemsContext.Provider value={ {
      items,
      addItem,
      toggleChecked,
    } } >
      { children }
    </ItemsContext.Provider>
  );
};

const ItemsConsumer = ItemsContext.Consumer;

export const [
  provideItems,
  consumeItems,
] = contextHOC(consumeUserToken(ItemsProvider), ItemsConsumer);