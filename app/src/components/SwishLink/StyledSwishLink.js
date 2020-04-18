import styled from 'styled-components';

const StyledSwishLink = styled.a`
  display: block;
  margin: 20px auto;
  width: 100%;
  text-align: center;

  div {
    position: relative;
    padding: 5px;
    display: inline-block;
    margin: 0 auto;

    * {
      display: inline;
    }

    img {
      position: absolute;
      top: 3px;
      left: -35px;
    }
  }
`;

export default StyledSwishLink;