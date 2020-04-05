import React, { createContext, useState, useEffect } from 'react';
import contextHOC from '#root/utils/contextHOC';
import { v4 as uuid } from 'uuid';
import { consumeUserToken } from '#root/contexts/userToken';
import { getItems, postVote, deleteVote, postItem } from '#root/utils/api';

const ItemsContext = createContext();

const ItemsProvider = ({ children, userToken }) => {
  const [ items, setItems ] = useState([]);

  const addItem = value => {
    const newItem = {
      id: uuid(),
      value,
      voters: [],
    };

    postItem(value);
    setItems([ ...items, newItem ]);
  };

  const checkItem = itemId => {
    const newItems = items.map(item => {
      const { id, voters } = item;
      if (id === itemId) {
        const newVoters = [ ...voters, userToken ];
        
        return {
          ...item,
          voters: newVoters,
        };
      } else {
        return item;
      }
    });

    setItems(newItems);
  };

  const uncheckItem = itemId => {
    const newItems = items.map(item => {
      const { id, voters } = item;
      if (id === itemId) {
        const newVoters = voters.filter(id => id !== userToken);
        
        return {
          ...item,
          voters: newVoters,
        };
      } else {
        return item;
      }
    });

    setItems(newItems);
  };
  
  const toggleChecked = itemId => {
    
    const item = items.find(({ id }) => id === itemId);
    if (item.voters.includes(userToken)) {
      deleteVote(itemId, userToken);
      uncheckItem(itemId);
    } else {
      postVote(itemId, userToken);
      checkItem(itemId);
    }
  };

  useEffect(() => {
    ( async() => {
      setItems(await getItems());
    })();
  }, []);
  
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