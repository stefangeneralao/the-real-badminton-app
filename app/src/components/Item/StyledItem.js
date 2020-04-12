import styled from 'styled-components';

const StyledItem = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
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
export default StyledItem;