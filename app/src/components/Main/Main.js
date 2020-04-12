import React from 'react';
import StyledMain from '#root/components/Main/StyledMain';
import ItemsWrapper from '#root/components/ItemsWrapper/ItemsWrapper';
import AddNewItem from '#root/components/AddNewItem/AddNewItem';
import UsernameField from '#root/components/UsernameField/UsernameField';
import Divider from '#root/components/Divider/Divider';



const Main = () => (
  <StyledMain>
    <UsernameField />
    <Divider />
    <ItemsWrapper />
    <AddNewItem />
  </StyledMain>
);

export default Main;