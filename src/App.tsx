import React from 'react';
import styled from 'styled-components';
import Controlls from './Components/Controlls';
import ResultList from './Components/Results/ResultList';

const Container = styled.section`
    width: 95%;
    margin-left: auto;
    margin-right: auto;
`;

function App() {
  return (
    <div>
      <main>
        <Container>
          <Controlls />
        </Container>
        <Container>
          <ResultList />
        </Container>
      </main>
    </div>
  );
}

export default App;
