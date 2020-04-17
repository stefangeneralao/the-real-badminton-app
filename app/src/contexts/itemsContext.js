import React, { createContext, useState, useEffect } from 'react';
import contextHOC from '#root/utils/contextHOC';
import { v4 as uuid } from 'uuid';
import { consumeUser } from '#root/contexts/userContext';
import { getItems, postVote, deleteVote, postItem } from '#root/utils/api';

const ItemsContext = createContext();

const ItemsProvider = ({ children, userToken, userName }) => {
  const [ items, setItems ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ isFetchingFailed, setIsFetchingFailed ] = useState(false);

  const addItem = value => {
    const _id = uuid();
    const newItem = {
      _id,
      value,
      voters: [],
      userToken,
    };

    postItem(value, _id, userToken);
    setItems([ ...items, newItem ]);
  };

  const checkItem = itemId => {
    const newItems = items.map(item => {
      const { _id, voters } = item;
      if (_id === itemId) {
        const newVoters = [
          ...voters,
          { userId: userToken, userName: userName || "Anonymous" },
        ];
        
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
      const { _id, voters } = item;
      if (_id === itemId) {
        const newVoters = voters.filter(({ userId }) => userId !== userToken);
        
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
    const item = items.find(({ _id }) => _id === itemId);
    if (item.voters.filter(({ userId }) => userId === userToken).length > 0) {
      deleteVote(itemId, userToken);
      uncheckItem(itemId);
    } else {
      postVote(itemId, userToken);
      checkItem(itemId);
    }
  };

  const refreshItems = async () => {
    setItems(await getItems(userToken));
  };

  useEffect(() => {
    ( async() => {
      try {
        setIsFetching(true);
        setIsFetchingFailed(false);
        setItems(await getItems(userToken));
      } catch {
        setIsFetchingFailed(true);
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);
  
  return (
    <ItemsContext.Provider value={ {
      items,
      addItem,
      toggleChecked,
      isFetching,
      isFetchingFailed,
      refreshItems,
    } } >
      { children }
    </ItemsContext.Provider>
  );
};

const ItemsConsumer = ItemsContext.Consumer;

export const [
  provideItems,
  consumeItems,
] = contextHOC(consumeUser(ItemsProvider), ItemsConsumer);