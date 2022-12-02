import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

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
      id: recipeInProgress[0].idMeal || recipeInProgress[0].idDrink,
      type: pageTitle === 'Meals' ? 'meal' : 'drink',
      nationality: recipeInProgress[0].strArea || '',
      category: recipeInProgress[0].strCategory,
      alcoholicOrNot: recipeInProgress[0].strAlcoholic || '',
      name: recipeInProgress[0].strDrink || recipeInProgress[0].strMeal,
      image: recipeInProgress[0].strDrinkThumb || recipeInProgress[0].strMealThumb,
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
    recipeDetails();
    verifyFavorite();
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
