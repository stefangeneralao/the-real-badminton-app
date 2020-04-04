import React, { useState } from 'react';
import { consumeItems } from '#root/contexts/items';
import styled from 'styled-components';

const StyledAddNewItem = styled.div``;

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
    <StyledAddNewItem>
      <input
        type="text"
        onKeyDown={ onKeyDownHandler }
        onChange={ onChangeHandler }
        value={ textfieldValue }
        placeholder="Add New"
      />
    </StyledAddNewItem>
  );
};

export default consumeItems(AddNewItem);