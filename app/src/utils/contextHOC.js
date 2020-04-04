import React from 'react';

const contextHOCProvider = ContextProvider => (
  Component => (
    props => (
      <ContextProvider>
        { (contexts => (
          <Component { ...props } { ...contexts } />
        ))() }
      </ContextProvider>
    )
  )
);

const contextHOCConsumer = ContextConsumer => Component => (
  props => (
    <ContextConsumer>
      { contexts => (
        <Component { ...props } { ...contexts } />
        ) }
    </ContextConsumer>
  )
);

const contextHOC = (ContextProvider, ContextConsumer) => [
  contextHOCProvider(ContextProvider),
  contextHOCConsumer(ContextConsumer),
];

export default contextHOC;