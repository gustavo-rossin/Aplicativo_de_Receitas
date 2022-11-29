import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="meals">
      <SearchBar />
    </div>
  );
}

export default App;
