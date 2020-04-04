import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: auto 50px;
`;

const Item = ({ value, isChecked, voterIds, toggleChecked }) => (
  <StyledItem onClick={ toggleChecked }>
    <p>{ value }</p>
    <input type="checkbox" checked={ isChecked } readOnly />
  </StyledItem>
);

export default Item;