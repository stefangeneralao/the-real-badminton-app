import styled from 'styled-components';



const StyledAddNewItem = styled.input`
  border: none;
  box-shadow: 2px 2px #33333333;
  width: 100%;
  padding: 3px 30px;
  box-sizing: border-box;
  line-height: 50px;
  font-size: 0.9rem;
  border: 2px solid #aaa;
  text-align: center;
  color: #666;
  font-weight: bold;
  transition: 700ms;

  &::placeholder {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 6px 6px #33333333;
    transition: 100ms;
  }
`;
export default StyledAddNewItem;