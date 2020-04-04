import React, { createContext, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import contextHOC from '#root/utils/contextHOC';

const UserTokenContext = createContext();

const UserTokenProvider = ({ children }) => {
  const userToken = useRef(localStorage.getItem('userToken') || uuid());

  useEffect(() => {
    localStorage.setItem('userToken', userToken.current);
  }, []);
  
  return (
    <UserTokenContext.Provider value={ {
      userToken: userToken.current,
    } }>
      { children }
    </UserTokenContext.Provider>
  );
};

const UserTokenConsumer = UserTokenContext.Consumer;

export const [
  provideUserToken,
  consumeUserToken,
] = contextHOC(UserTokenProvider, UserTokenConsumer);