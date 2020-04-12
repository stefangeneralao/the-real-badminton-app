import styled from 'styled-components';

const StyledHeader = styled.div`
  background-color: black;
  display: flex;
  border-bottom: 10px solid ${ ({ theme }) => theme.secondary };
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-shadow: 3px 3px white;
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
      text-shadow: 3px 3px white;
    }
    50% {
      color: #2d67fb;
    }
    100% {
      color: ${ ({ theme }) => theme.secondary };
      text-shadow: -3px 3px white;
    }
  }
`;

export default StyledHeader;