import React from 'react';
import { consumeUserToken } from '#root/contexts/userToken';
import styled from 'styled-components';
import logo from '../../../public/badminton.png'


const StyledHeader = styled.div`
background-color: black;
height: 250px;
display: flex;
border-bottom: 10px solid #fbb726;
flex-direction: column;
align-items: center;
justify-content: flex-end;
font-size: calc(10px + 2vmin);
`

const Img = styled.img`
position: absolute;
top: -60px;
left: calc(50% -250px);
width: auto;
height: 250px;
animation:spin 4s linear infinite;
 
@keyframes spin { 100% { transform: rotate(360deg); } 
`
const H1 = styled.h1`
color: #fbb726;
font-size: 60px;
margin: 0;
font-family: 'Press Start 2P', cursive;

`

const Header = ({ userToken }) => (
  <StyledHeader>
   
    <Img src={ logo } />
    <H1>bIAdminton</H1>
  </StyledHeader>
);

export default consumeUserToken(Header);