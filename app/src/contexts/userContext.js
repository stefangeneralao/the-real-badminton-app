import React, { createContext, useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import contextHOC from '#root/utils/contextHOC';
import { postUserName, getUserName } from '#root/utils/api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const userToken = useRef(localStorage.getItem('userToken') || uuid());
  const [ userName, setUserName ] = useState('');
  
  useEffect(() => {
    ( async () => {
      setUserName(await getUserName(userToken.current));
    })();
    localStorage.setItem('userToken', userToken.current);
  }, []);

  useEffect(() => {
    if (userName && userToken.current) {
      postUserName(userName, userToken.current);
    }
  }, [ userName ]);

  const setUserNameHandler = async (value, cb) => {
    setUserName(value);
    if (userName && userToken.current) {
      await postUserName(userName, userToken.current);
      cb();
    }
  };
  
  return (
    <UserContext.Provider value={ {
      userToken: userToken.current,
      setUserName: setUserNameHandler,
      userName,
    } }>
      { children }
    </UserContext.Provider>
  );
};

const UserConsumer = UserContext.Consumer;

export const [
  provideUser,
  consumeUser,
] = contextHOC(UserProvider, UserConsumer);