import React from 'react';
import logo from '../../../public/badminton.png'
import StyledHeader from '#root/components/Header/StyledHeader';
import Img from '#root/components/Header/Img';
import H1 from '#root/components/Header/H1';

const Header = () => (
  <StyledHeader>
    <Img src={ logo } />
    <H1>bIAdminton</H1>
  </StyledHeader>
);

export default Header;