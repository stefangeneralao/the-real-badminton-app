import React from 'react';
import StyledItem from '#root/components/Item/StyledItem';
import P from '#root/components/Item/P';
import Voters from '#root/components/Item/Voters';




const Item = ({ value, isChecked, voters, toggleChecked }) => (
  <StyledItem onClick={ toggleChecked } isChecked={ isChecked } >
    <P>{ value }</P>
    <Voters>
      { voters.map(({ userName, userId }) => (
        <P key={ userId }>{ userName }</P>
      )) }
    </Voters>
  </StyledItem>
);

export default Item;