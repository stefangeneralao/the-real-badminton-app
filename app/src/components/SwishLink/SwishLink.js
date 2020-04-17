import React from 'react';
import StyledSwishLink from '#root/components/SwishLink/StyledSwishLink';

const swishUrl = "swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%220739680204%22%2C%22editable%22%3Atrue%7D%2C%22amount%22%3A%7B%22value%22%3A30%2C%22editable%22%3Atrue%7D%2C%22message%22%3A%7B%22value%22%3A%22Badminton%22%2C%22editable%22%3Atrue%7D%7D";

const SwishLink = () => (
  <StyledSwishLink href={ swishUrl }>
    <img src="https://www.swish.nu/favicon-32x32.png" />
    <p>Swisha Omar nu!</p>
  </StyledSwishLink>
);

export default SwishLink;