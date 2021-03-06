import React from 'react';
import { compose } from 'recompose';
import { consumeUser } from '#root/contexts/userContext';
import { consumeItems } from '#root/contexts/itemsContext';
import Item from '#root/components/Item/Item';
import P from '#root/components/ItemsWrapper/P';
import StyledItemsWrapper from '#root/components/ItemsWrapper/StyledItemsWrapper';



const ItemsWrapper = ({ items, toggleChecked, isFetching, isFetchingFailed, userToken }) => {
  if (isFetching) {
    return (
      <StyledItemsWrapper>
        <P>Soon...</P>
      </StyledItemsWrapper>
    );
  }

  if (isFetchingFailed) {
    return (
      <StyledItemsWrapper>
        <P>Oh no. Some ting wong.</P>
      </StyledItemsWrapper>
    );
  }
  
  if (!items.length) {
    return (
      <StyledItemsWrapper>No items</StyledItemsWrapper>
    );
  }
  
  return (
    <StyledItemsWrapper>
      { items.map(({ _id, value, voters }) => (
        <Item
          key={ _id }
          id={ _id }
          value={ value }
          isChecked={ voters.filter(({ userId }) => userId === userToken).length > 0 }
          toggleChecked={ () => toggleChecked(_id) }
          voters={ voters }
        />
      )) }
    </StyledItemsWrapper>
  );
}

export default compose(
  consumeItems,
  consumeUser,
)(ItemsWrapper);