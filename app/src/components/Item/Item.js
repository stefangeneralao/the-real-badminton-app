import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: auto 50px;
  box-shadow: ${ props => props.isChecked ? '0 1px 4px #FDD835' : '0 1px 4px #33333333' };
  margin: 10px 0;
  padding: 15px 30px;
  border-radius: 30px;
  transition: 300ms;

  &:hover {
    box-shadow: ${ props => props.isChecked ? '0 4px 12px #FDD835' : '0 4px 12px #33333333' };
  }
`;

const Voters = styled.div`
`;

const NumVoters = styled.p`
  text-align: right;
`;

const P = styled.p`
`;

const Item = ({ value, isChecked, voters, toggleChecked }) => (
  <StyledItem onClick={ toggleChecked } isChecked={ isChecked } >
    <P>{ value }</P>
    <Voters>
      <NumVoters>{ voters.length }</NumVoters>
    </Voters>
  </StyledItem>
);

export default Item;