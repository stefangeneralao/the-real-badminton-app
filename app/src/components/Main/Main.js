import React from 'react';
import StyledMain from '#root/components/Main/StyledMain';
import ItemsWrapper from '#root/components/ItemsWrapper/ItemsWrapper';
import AddNewItem from '#root/components/AddNewItem/AddNewItem';
import UsernameField from '#root/components/UsernameField/UsernameField';
import Divider from '#root/components/Divider/Divider';
import SwishLink from '#root/components/SwishLink/SwishLink';

const Main = () => (
  <StyledMain>
    <UsernameField />
    <Divider />
    <ItemsWrapper />
    <AddNewItem />
    <SwishLink />
  </StyledMain>
);

export default Main;