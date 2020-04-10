import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: auto 70px;
  color: ${ ({ isChecked, theme }) => isChecked ? theme.primary: '#33333333' };
  box-shadow: ${ props => props.isChecked ? '4px 4px' : '2px 2px' };
  margin: 10px 0;
  padding: 3px 30px;
  border: solid 2px #aaa;
  transition: 700ms;
  font-weight: bold;

  &:hover {
    box-shadow: 6px 6px;
    transition: 100ms;
  }
`;

const Voters = styled.div`
`;

const P = styled.p`
  color: ${ ({ light }) => light ? 'white' : '#666' };
`;

const NumVoters = styled(P)`
  text-align: right;
`;

const Item = ({ value, isChecked, voters, toggleChecked, id }) => (
  <StyledItem onClick={ toggleChecked } isChecked={ isChecked } >
    <P>{ value }</P>
    <Voters data-tip data-for={ id }>
      <NumVoters>{ voters.length } votes</NumVoters>
    </Voters>
    { voters.length > 0 ? (
      <ReactTooltip id={ id }>
      { voters.map(({ userName, userId }) => (
        <P key={ userId } light>{ userName }</P>
      )) }
      </ReactTooltip>
    ) : null }
  </StyledItem>
);

export default Item;