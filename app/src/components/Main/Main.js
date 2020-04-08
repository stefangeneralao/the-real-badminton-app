import React from 'react';
import styled from 'styled-components';
import ItemsWrapper from '#root/components/ItemsWrapper/ItemsWrapper';
import AddNewItem from '#root/components/AddNewItem/AddNewItem';
import UsernameField from '#root/components/UsernameField/UsernameField';
import Divider from '#root/components/Divider/Divider';

const StyledMain = styled.main`
  padding: 40px 20px;
  max-width: 425px;
  margin: auto;
`;

const Main = () => (
  <StyledMain>
    <UsernameField />
    <Divider />
    <ItemsWrapper />
    <AddNewItem />
  </StyledMain>
);

export default Main;