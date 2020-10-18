import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import store from './State/store';

import TestRunner from './Components/TestRunner/TestRunner';
import ResultList from './Components/Results/ResultList';

const Container = styled.section`
    width: 95%;
    margin-left: auto;
    margin-right: auto;
`;

function App() {
  return (
    <Provider store={store}>
      <main>
        <Container>
          <TestRunner />
        </Container>
        <Container>
          <ResultList />
        </Container>
      </main>
    </Provider>
  );
}

export default App;
