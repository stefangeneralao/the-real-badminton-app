import React, { useState, useRef } from 'react';
import Input from '#root/components/UsernameField/Input';
import { compose } from 'recompose';
import { consumeUser } from '#root/contexts/userContext';
import { consumeItems } from '../../contexts/itemsContext';


const UserNameField = ({ setUserName, userName, refreshItems }) => {
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const inputEl = useRef();
  
  const onSubmitHandler = e => {
    if (e) e.preventDefault();
    const { value } = inputEl.current;
    if (value) {
      setIsSubmitted(true);
      refreshItems();
      setUserName(value);
    }
  };

  const onFocusHandler = () => {
    setIsSubmitted(false);
  };

  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      onSubmitHandler();
    }
  };

  const onChangeHandler = e => {
    const { value } = inputEl.current;

    if (value) {
      setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={ onSubmitHandler }>
      <Input
        ref={ inputEl }
        placeholder="Your name here please"
        isSubmitted={ isSubmitted }
        onFocus={ onFocusHandler }
        onKeyDown={ onKeyDownHandler }
        onChange={ onChangeHandler }
        defaultValue={ userName }
      />
    </form>
  );
};

export default compose(
  consumeUser,
  consumeItems,
)(UserNameField);