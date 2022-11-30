import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import MealsProvider from './context/MealsProvider';

function App() {
  return (
    <MealsProvider>
      <Routes />
    </MealsProvider>
  );
}

export default App;
