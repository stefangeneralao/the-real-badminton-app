import React, { useState } from 'react';
import { consumeItems } from '#root/contexts/itemsContext';
import StyledAddNewItem from '#root/components/AddNewItem/StyledAddNewItems';


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
      type="text"
      onKeyDown={ onKeyDownHandler }
      onChange={ onChangeHandler }
      value={ textfieldValue }
      placeholder="Add New"
    />
  );
};

export default consumeItems(AddNewItem);