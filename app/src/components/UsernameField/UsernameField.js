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
      setUserName(value, () => {
        refreshItems();
      });
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

  const onBlurHandler = () => {
    onSubmitHandler();
  }

  return (
    <form onSubmit={ onSubmitHandler }>
      <Input
        ref={ inputEl }
        placeholder="Ditt namn här"
        isSubmitted={ isSubmitted }
        onFocus={ onFocusHandler }
        onKeyDown={ onKeyDownHandler }
        onChange={ onChangeHandler }
        onBlur={ onBlurHandler }
        defaultValue={ userName }
      />
    </form>
  );
};

export default compose(
  consumeUser,
  consumeItems,
)(UserNameField);