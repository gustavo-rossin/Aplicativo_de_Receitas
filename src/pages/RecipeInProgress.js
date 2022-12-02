import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { verifyFavorite,
  saveFavorite,
  removeFavorite } from '../services/favoriteFunctions';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const [wasCopied, setWasCopied] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isFavorite, setFavorite] = useState(false);

  const { pathname } = history.location;
  const recipeId = pathname.replace(/[^0-9]/g, '');

  const pageTitle = pathname.includes('meals') ? 'Meals' : 'Drinks';

  const startRecipe = (type, id) => {
    const getRecipesInProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, drinks: {} };

    const startInProgress = {
      ...getRecipesInProgress,

      [type]: {
        ...getRecipesInProgress[type],
        [id]: getRecipesInProgress[type][id] || [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(startInProgress));
  };

  const recipeDetails = async () => {
    if (pageTitle === 'Meals') {
      const mealsData = await mealApi(recipeId, 'recipe-detail');
      if (mealsData) setRecipeInProgress(mealsData.meals);
      startRecipe('meals', recipeId);
    }
    if (pageTitle === 'Drinks') {
      const cocktailsData = await drinkApi(recipeId, 'recipe-detail');
      if (cocktailsData) setRecipeInProgress(cocktailsData.drinks);
      startRecipe('drinks', recipeId);
    }
  };

  const clipBoardShare = () => {
    const pathName = history.location.pathname.split('/');
    pathName.pop();
    copy(`http://localhost:3000${pathName.join('/')}`);
    setWasCopied(true);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (isFavorite) {
      removeFavorite(favorites, recipeId);
    } else {
      saveFavorite(favorites, recipeInProgress, pageTitle);
    }
    verifyFavorite(setFavorite, recipeId);
  };

  useEffect(() => {
    recipeDetails();
    verifyFavorite(setFavorite, recipeId);
  }, [history, pathname]);

  return (

    <div>
      {
        recipeInProgress && recipeInProgress.map((e) => (<DetailsMealsDrinks
          recipe={ e }
          key={ e.idMeal || e.idDrink }
        />))
      }
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

      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </div>

  );
}

export default RecipeInProgress;
