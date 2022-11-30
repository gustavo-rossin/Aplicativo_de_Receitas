import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';

function SearchBar() {
  const [filter, setFilter] = useState('nome');
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const { setApiResponse } = useContext(MealsContext);
  const handleClick = async () => {
    if (history.location.pathname === '/meals') {
      const response = await mealApi(inputValue, filter);
      setApiResponse(response.meals);
      if (!response.meals) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (response.meals.length === 1) {
        history.push(`/meals/${response.meals[0].idMeal}`);
      }
    } else {
      const response = await drinkApi(inputValue, filter);
      setApiResponse(response.drinks);
      if (!response.drinks) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (response.drinks.length === 1) {
        history.push(`/drinks/${response.drinks[0].idDrink}`);
      }
    }
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
