import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import MealsContext from '../context/MealsContext';
import { verifyFavorite,
  saveFavorite,
  removeFavorite } from '../services/favoriteFunctions';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const { finishedIngredients } = useContext(MealsContext);
  const [wasCopied, setWasCopied] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  console.log(recipeInProgress);

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

  const extractRecipeInfos = (key) => Object.entries(recipeInProgress[0])
    .filter((e) => e[0].includes(key) && e[1]).map((e) => e[1]);

  const ingredientsCheck = () => {
    if (recipeInProgress.length > 0) {
      const ingredientName = extractRecipeInfos('strIngredient');

      return ingredientName.length === finishedIngredients.length;
    }
  };

  const convertTagStringIntoArray = () => {
    const firstSplit = recipeInProgress[0].strTags.split(',');
    if (firstSplit.length > 1) {
      return firstSplit;
    }
    return recipeInProgress[0].strTags.split();
  };

  const doneRecipe = () => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const doneObject = {
      id: recipeInProgress[0].idMeal || recipeInProgress[0].idDrink,
      type: pageTitle === 'Meals' ? 'meal' : 'drink',
      nationality: recipeInProgress[0].strArea || '',
      category: recipeInProgress[0].strCategory,
      alcoholicOrNot: recipeInProgress[0].strAlcoholic || '',
      name: recipeInProgress[0].strDrink || recipeInProgress[0].strMeal,
      image: recipeInProgress[0].strDrinkThumb || recipeInProgress[0].strMealThumb,
      doneDate: new Date(),
      tags: recipeInProgress[0].strTags ? convertTagStringIntoArray() : [],
    };
    const doneRecipes = [...getDoneRecipes, doneObject];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/done-recipes');
  };

  useEffect(() => {
    recipeDetails();
    verifyFavorite(setFavorite, recipeId);
  }, [history, pathname, finishedIngredients]);

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
        disabled={ !ingredientsCheck() }
        onClick={ doneRecipe }
      >
        Finalizar
      </button>
    </div>

  );
}

export default RecipeInProgress;
