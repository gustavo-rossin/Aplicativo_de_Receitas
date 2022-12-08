import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';
import MealsProvider from './context/MealsProvider';
import GlobalStyle from './globalStyle';

function App() {
  return (
    <BrowserRouter>
      <main>
        <MealsProvider>
          <GlobalStyle />
          <section className="phone">
            <Link to="/home" className="home" />
          </section>
          <Routes />
        </MealsProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
