import styled from 'styled-components';

const P = styled.p`
  color: ${ ({ light }) => light ? 'white' : '#666' };
`;
export default P;