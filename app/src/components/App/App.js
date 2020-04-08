import React from 'react';
import { compose } from 'recompose';
import { provideItems } from '#root/contexts/itemsContext';
import { provideUserToken } from '#root/contexts/userTokenContext';
import Header from '#root/components/Header/Header';
import Main from '#root/components/Main/Main'
import ThemeProvider from '#root/components/ThemeProvider/ThemeProvider';

const App = () => (
  <ThemeProvider>
    <div className="App">
      <Header />
      <Main />
    </div>
  </ThemeProvider>
);

export default compose(
  provideUserToken,
  provideItems,
)(App);