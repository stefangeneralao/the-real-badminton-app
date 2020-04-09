import React, { useState } from 'react';
import styled from 'styled-components';
import { consumeUser } from '#root/contexts/userContext';

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

const UserNameField = ({ setUserName }) => {
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ textfieldValue, setTextfieldValue ] = useState('');

  const onSubmitHandler = () => {
    if (textfieldValue) {
      setIsSubmitted(true);
      setUserName(textfieldValue);
    }
  };

  const onFocusHandler = () => {
    if (textfieldValue) {
      setIsSubmitted(false);
    }
  };

  const onKeyDownHandler = e => {
    if (e.key === 'Enter' && textfieldValue) {
      onSubmitHandler();
    }
  };

  const onChangeHandler = e => {
    const { value } = e.currentTarget;
    setTextfieldValue(value);

    if (textfieldValue) {
      setIsSubmitted(false);
    }
  };

  const onBlurHandler = () => {
    if (textfieldValue) {
      onSubmitHandler();
    }
  };

  return (
    <Input
      placeholder="Your name here please"
      onBlur={ onBlurHandler }
      isSubmitted={ isSubmitted }
      onFocus={ onFocusHandler }
      onKeyDown={ onKeyDownHandler }
      value={ textfieldValue }
      onChange={ onChangeHandler }
    />
  );
};

export default consumeUser(UserNameField);