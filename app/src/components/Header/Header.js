import React from 'react';
import styled from 'styled-components';
import logo from '../../../public/badminton.png'


const StyledHeader = styled.div`
  background-color: black;
  display: flex;
  border-bottom: 10px solid ${ ({ theme }) => theme.secondary };
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-shadow: 3px -3px white;
  color: ${ ({ theme }) => theme.primary };

  &:hover {
    animation: color-rotate 300ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }

  @keyframes color-rotate {
    0% {
      color: ${ ({ theme }) => theme.primary };
      text-shadow: 3px -3px white;
    }
    50% {
      color: #2d67fb;
    }
    100% {
      color: ${ ({ theme }) => theme.secondary };
      text-shadow: -3px -3px white;
    }
  }
`;

const Img = styled.img`
  position: absolute;
  top: -60px;
  left: calc(50% -250px);
  width: auto;
  height: 250px;
  animation:spin 4s linear infinite;
  
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;

const H1 = styled.h1`
  font-size: 7vw;
  margin: 0;
  font-family: 'Press Start 2P', cursive;
  padding-top: 140px;
`;

const Header = () => (
  <StyledHeader>
    <Img src={ logo } />
    <H1>bIAdminton</H1>
  </StyledHeader>
);

export default Header;