import styled from 'styled-components';

const Img = styled.img`
  position: absolute;
  top: -60px;
  left: calc(50% -250px);
  width: auto;
  height: 250px;
  animation:spin 4s linear infinite;
  filter: blur(0);
  
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;

export default Img;