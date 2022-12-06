import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';
import * as S from './styles/SearchBar.style';

function SearchBar({ setIsSearching }) {
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
    <S.searchBarContainer>
      <S.searchInput
        type="text"
        data-testid="search-input"
        placeholder="Search"
        value={ inputValue }
        onChange={ (e) => { setInputValue(e.target.value); } }
      />
      <S.radioBtnContainer>
        <S.radioContainer>
          <label htmlFor="ingrediente">
            <input
              type="radio"
              name="search-filter"
              data-testid="ingredient-search-radio"
              id="ingrediente"
              onChange={ (e) => { setFilter(e.target.id); } }
            />
            Ingredient
          </label>
          <label htmlFor="name">

            <input
              type="radio"
              name="search-filter"
              data-testid="name-search-radio"
              id="name"
              value="nome"
              onChange={ (e) => { setFilter(e.target.value); } }
            />
            Name
          </label>
          <label htmlFor="first-letter">

            <input
              type="radio"
              name="search-filter"
              data-testid="first-letter-search-radio"
              id="first-letter"
              value="primeira-letra"
              onChange={ (e) => { setFilter(e.target.value); } }
            />
            First-letter
          </label>
        </S.radioContainer>
        <S.buttonSearch
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => { handleClick(); setIsSearching(false); } }
        >
          Search
        </S.buttonSearch>
      </S.radioBtnContainer>
    </S.searchBarContainer>
  );
}

SearchBar.propTypes = {}.isRequired;

export default SearchBar;
