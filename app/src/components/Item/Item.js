import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: auto 70px;
  color: ${ ({ isChecked, theme }) => isChecked ? theme.primary: '#33333333' };
  box-shadow: ${ props => props.isChecked ? '0 3px 9px' : '0 1px 3px' };
  margin: 10px 0;
  padding: 10px 30px;
  border-radius: 5px;
  transition: 300ms;

  &:hover {
    box-shadow: ${ props => props.isChecked ? '0 5px 15px' : '0 4px 12px' };
    transition: 100ms;
  }
`;

const Voters = styled.div`
`;

const P = styled.p`
  color: #666;
`;

const NumVoters = styled(P)`
  text-align: right;
`;

const Item = ({ value, isChecked, voters, toggleChecked }) => (
  <StyledItem onClick={ toggleChecked } isChecked={ isChecked } >
    <P>{ value }</P>
    <Voters>
      <NumVoters>{ voters.length } votes</NumVoters>
    </Voters>
  </StyledItem>
);

export default Item;