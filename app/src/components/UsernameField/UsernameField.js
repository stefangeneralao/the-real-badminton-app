import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { consumeUser } from '#root/contexts/userContext';
import { consumeItems } from '../../contexts/itemsContext';

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 5px 30px;
  box-sizing: border-box;
  line-height: 50px;
  font-size: 0.9rem;
  text-align: center;
  color: #666;
  transition: 700ms;
  color: ${ ({ isSubmitted }) => isSubmitted ? '#333' : 'white' };
  background-color: ${ ({ isSubmitted }) => isSubmitted ? 'white' : '#333' };
  box-shadow: ${ ({ isSubmitted }) => isSubmitted ? 'none' : '2px 2px #33333333' };
  font-weight: bold;

  &::placeholder {
    color: white;
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: ${ ({ isSubmitted }) => isSubmitted ? '4px 4px #33333333' : '6px 6px #33333333' };
    transition: 100ms;
  }
`;

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