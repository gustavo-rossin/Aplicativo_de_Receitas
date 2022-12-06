import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import MealsProvider from './context/MealsProvider';
import GlobalStyle from './globalStyle';

function App() {
  return (
    <main>
      <MealsProvider>
        <GlobalStyle />
        <section className="phone" />
        <Routes />
      </MealsProvider>
    </main>
  );
}

export default App;
