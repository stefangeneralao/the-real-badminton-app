import React from 'react';
import { compose } from 'recompose';
import { provideItems } from '#root/contexts/items';
import { provideUserToken } from '#root/contexts/userToken';
import ItemsWrapper from '#root/components/ItemsWrapper/ItemsWrapper';
import AddNewItem from '#root/components/AddNewItem/AddNewItem';
import Header from '#root/components/Header/Header';
import Divider from '#root/components/Divider/Divider';
import Main from '#root/components/Main/Main'

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main>
        <ItemsWrapper />
        <Divider />
        <AddNewItem />
      </Main>
    </div>
  );
};

export default compose(
  provideUserToken,
  provideItems,
)(App);