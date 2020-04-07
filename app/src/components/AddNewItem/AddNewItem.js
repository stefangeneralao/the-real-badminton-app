import React, { useState } from 'react';
import { consumeItems } from '#root/contexts/itemsContext';
import styled from 'styled-components';

const StyledAddNewItem = styled.input`
  border: none;
  box-shadow: 0 2px 6px #33333333;
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  line-height: 50px;
  font-size: 0.9rem;
  border-radius: 5px;
  text-align: center;
  color: #666;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0 4px 12px #33333333;
  }
`;

const AddNewItem = ({ addItem }) => {
  const [ textfieldValue, setTextfieldValue ] = useState('');

  const clearTextfield = () => {
    setTextfieldValue('');
  };
  
  const onKeyDownHandler = e => {
    if (e.key === 'Enter' && textfieldValue) {
      addItem(textfieldValue);
      clearTextfield();
    }
  };

  const onChangeHandler = e => {
    const { value } = e.currentTarget;
    setTextfieldValue(value);
  };
  
  return (
    <StyledAddNewItem
      type="datetime"
      onKeyDown={ onKeyDownHandler }
      onChange={ onChangeHandler }
      value={ textfieldValue }
      placeholder="Add New"
    />
  );
};

export default consumeItems(AddNewItem);