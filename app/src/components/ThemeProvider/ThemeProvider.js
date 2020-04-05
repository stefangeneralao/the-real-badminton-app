import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#fbc02d',
  secondary: '#fb5a2d',
};

const CustomThemeProvider = ({ children }) => (
  <ThemeProvider theme={ theme }>
    { children }
  </ThemeProvider>
);

export default CustomThemeProvider;