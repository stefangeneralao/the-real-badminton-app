import React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { provideItems } from '#root/contexts/items';
import { provideUserToken } from '#root/contexts/userToken';
import ItemsWrapper from '#root/components/ItemsWrapper/ItemsWrapper';
import AddNewItem from '#root/components/AddNewItem/AddNewItem';
import Header from '#root/components/Header/Header';

const Main = styled.main`
  padding: 40px 20px;
  max-width: 425px;
  margin: auto;
`;

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main>
        <ItemsWrapper />
        <AddNewItem />
      </Main>
    </div>
  );
};

export default compose(
  provideUserToken,
  provideItems,
)(App);