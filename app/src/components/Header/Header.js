import React from 'react';
import { consumeUserToken } from '#root/contexts/userToken';

const Header = ({ userToken }) => (
  <header>
    { userToken }
  </header>
);

export default consumeUserToken(Header);