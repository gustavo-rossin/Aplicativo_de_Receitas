import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [arrFavorites, setFavorites] = useState(favorites);
  const [copied, setCopied] = useState('');

  const filterAll = () => {
    setFavorites(favorites);
  };
  const filterMeals = () => {
    const filterMeal = favorites.filter((e) => e.type === 'meal');
    setFavorites(filterMeal);
  };
  const filterDrinks = () => {
    const filterDrink = favorites.filter((e) => e.type === 'drink');
    setFavorites(filterDrink);
  };
  const removeFavorite = (arr, id) => {
    const filterFavorite = arr.filter((e) => +e.id !== +id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
    setFavorites(filterFavorite);
  };

  const clipBoardShare = (id, type) => {
    if (type === 'meal') {
      copy(`http://localhost:3000/meals/${id}`);
      setCopied(id);
    }
    if (type === 'drink') {
      copy(`http://localhost:3000/drinks/${id}`);
      setCopied(id);
    }
  };

  const toggleFavorite = (id) => {
    removeFavorite(favorites, id);
  };
  return (
    <div>
      <Header pageTitle="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meal

      </button>
      {
        arrFavorites.map((e, index) => {
          if (e.type === 'meal') {
            return (
              <div key={ e.name }>
                <NavLink to={ `/meals/${e.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    alt={ e.name }
                    src={ e.image }
                    width={ 250 }
                    height={ 250 }
                  />
                </NavLink>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${e.nationality} - ${e.category}`}
                </p>
                <NavLink to={ `/meals/${e.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
                </NavLink>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => toggleFavorite(e.id) }
                  src="blackHeartIcon"
                >
                  <img src={ blackHeartIcon } alt="blackHeart" name={ e.name } />
                </button>
                {
                  copied === e.id ? <span data-testid={ e.id }>Link copied!</span> : (
                    <button
                      type="button"
                      data-testid={ `${index}-horizontal-share-btn` }
                      onClick={ () => clipBoardShare(e.id, e.type) }
                      src="shareIcon"
                      name={ e.id }
                    >
                      <img src={ shareIcon } alt="share" />
                    </button>)
                }
              </div>
            );
          }
          return (
            <div key={ e.name }>
              <NavLink to={ `/drinks/${e.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  alt={ e.name }
                  src={ e.image }
                  width={ 250 }
                  height={ 250 }
                />
              </NavLink>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {e.alcoholicOrNot}
              </p>
              <NavLink to={ `/drinks/${e.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
              </NavLink>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => toggleFavorite(e.id) }
                src="blackHeartIcon"
              >
                <img src={ blackHeartIcon } alt="blackHeart" name={ e.name } />
              </button>

              {
                copied === e.id ? <span data-testid={ e.id }>Link copied!</span> : (
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => clipBoardShare(e.id, e.type) }
                    src="shareIcon"
                    name={ e.id }
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>)
              }

            </div>
          );
        })
      }
    </div>
  );
}

export default FavoriteRecipes;
