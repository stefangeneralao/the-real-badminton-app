import React from 'react';
import { compose } from 'recompose';
import { consumeUserToken } from '#root/contexts/userToken';
import { consumeItems } from '#root/contexts/items';
import Item from '#root/components/Item/Item';
import styled from 'styled-components';

const StyledItemsWrapper = styled.div``;

const ItemsWrapper = ({ items, toggleChecked, userToken }) => {
  if (!items.length) {
    return (
      <StyledItemsWrapper>No items</StyledItemsWrapper>
    );
  }
  
  return (
    <StyledItemsWrapper>
      { items.map(({ id, value, voters }) => (
        <Item
          key={ id }
          value={ value }
          isChecked={ voters.includes(userToken) }
          toggleChecked={ () => toggleChecked(id) }
          voters={ voters }
        />
      )) }
    </StyledItemsWrapper>
  );
}

export default compose(
  consumeItems,
  consumeUserToken,
)(ItemsWrapper);