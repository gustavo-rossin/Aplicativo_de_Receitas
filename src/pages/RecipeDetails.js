import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import Recommendation from '../components/Recommendation';
import MealsContext from '../context/MealsContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';

import './styles/RecipeDetails.css';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const { apiResponse,
    setApiResponse,
    setIdResponse,
    idResponse } = useContext(MealsContext);
  const history = useHistory();
  const [isDone, setIsDone] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const maxValue = 6;
  const recipeId = history.location.pathname.split('/')[2];

  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';

  const apiRequests = async () => {
    if (pageTitle === 'Meals') {
      const responseId = await mealApi(recipeId, 'recipe-detail');
      setIdResponse(responseId.meals);
      const response = await drinkApi('', 'nome');
      setApiResponse(response.drinks);
    } else {
      const responseId = await drinkApi(recipeId, 'recipe-detail');
      setIdResponse(responseId.drinks);
      const response = await mealApi('', 'nome');
      setApiResponse(response.meals);
    }
  };

  const verifyIsDone = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const done = doneRecipes.some((e) => +e.id === +recipeId);
    if (done) {
      setIsDone(true);
    }
  };

  const continueRecipes = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
     || { drinks: '', meals: '' };
    if (pageTitle === 'Drinks') {
      const progress = Object.keys(inProgressRecipes.drinks)
        .some((e) => +e === +recipeId);
      if (progress) {
        setInProgress(true);
      }
    } else {
      const progress = Object.keys(inProgressRecipes.meals)
        .some((e) => +e === +recipeId);
      if (progress) {
        setInProgress(true);
      }
    }
  };

  const progressRedirect = () => {
    if (pageTitle === 'Meals') {
      history.push(`/meals/${recipeId}/in-progress`);
    } else {
      history.push(`/drinks/${recipeId}/in-progress`);
    }
  };

  const clipBoardShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setWasCopied(true);
  };

  const verifyFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFav = favorites.some((e) => +e.id === +recipeId);
    if (isFav) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  const saveFavorite = (arr) => {
    const favoriteObject = {
      id: idResponse[0].idMeal || idResponse[0].idDrink,
      type: pageTitle === 'Meals' ? 'meal' : 'drink',
      nationality: idResponse[0].strArea || '',
      category: idResponse[0].strCategory,
      alcoholicOrNot: idResponse[0].strAlcoholic || '',
      name: idResponse[0].strDrink || idResponse[0].strMeal,
      image: idResponse[0].strDrinkThumb || idResponse[0].strMealThumb,
    };
    const newFavorites = [...arr, favoriteObject];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const removeFavorite = (arr) => {
    const filterFavorite = arr.filter((e) => +e.id !== +recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (isFavorite) {
      removeFavorite(favorites);
    } else {
      saveFavorite(favorites);
    }
    verifyFavorite();
  };

  useEffect(() => {
    apiRequests();
    verifyIsDone();
    continueRecipes();
    verifyFavorite();
  }, []);

  console.log(idResponse);

  return (
    <>
      {
        idResponse && idResponse.map((e) => (
          <DetailsMealsDrinks
            key={ e.idDrink || e.idMeal }
            recipe={ e }
          />))
      }
      <div>
        {
          wasCopied ? <p>Link copied!</p> : (
            <button
              type="button"
              data-testid="share-btn"
              onClick={ clipBoardShare }
            >
              share
            </button>)
        }
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ toggleFavorite }
          src={ isFavorite ? 'blackHeartIcon' : 'whiteHeartIcon' }
        >
          {
            isFavorite ? <img src={ blackHeartIcon } alt="blackHeart" />
              : <img src={ whiteHeart } alt="whiteHeart" />
          }
        </button>
      </div>
      <h2>Recommendation</h2>
      <div className="caroussel">
        {
          apiResponse && apiResponse.map((e, i) => (
            <Recommendation
              key={ e.idDrink || e.idMeal }
              recommended={ e }
              index={ i }
            />
          )).filter((_e, i) => i < maxValue)
        }
      </div>

      {
        !isDone && !inProgress ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ progressRedirect }
          >
            Start Recipe

          </button>) : (
          (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ progressRedirect }
            >
              Continue Recipe

            </button>))
      }

    </>
  );
}

export default RecipeDetails;
