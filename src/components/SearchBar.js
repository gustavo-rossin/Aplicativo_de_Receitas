import React, { useState } from 'react';
import mealApi from '../services/MealDbApi';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  // const [apiResponse, setApiResponse] = useState('');
  const handleClick = async () => {
    const response = await mealApi(inputValue, filter);
    setApiResponse(response);
  };
  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        value={ inputValue }
        onChange={ (e) => { setInputValue(e.target.value); } }
      />
      <input
        type="radio"
        name="search-filter"
        data-testid="ingredient-search-radio"
        id="ingrediente"
        onChange={ (e) => { setFilter(e.target.id); } }
      />
      <input
        type="radio"
        name="search-filter"
        data-testid="name-search-radio"
        id="nome"
        onChange={ (e) => { setFilter(e.target.id); } }
      />
      <input
        type="radio"
        name="search-filter"
        data-testid="first-letter-search-radio"
        id="primeira-letra"
        onChange={ (e) => { setFilter(e.target.id); } }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Busca
      </button>
    </>
  );
}

export default SearchBar;
