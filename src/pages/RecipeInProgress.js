import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';

function RecipeInProgress() {
  const history = useHistory();

  const [recipeInProgress, setRecipeInProgress] = useState([]);
  console.log(recipeInProgress);

  const { pathname } = history.location;
  const recipeID = pathname.replace(/[^0-9]/g, '');

  const pageTitle = pathname.includes('meals') ? 'Meals' : 'Drinks';

  const recipeDetails = async () => {
    if (pageTitle === 'Meals') {
      const mealsData = await mealApi(recipeID, 'recipe-detail');
      if (mealsData) setRecipeInProgress(mealsData.meals);
    }
    if (pageTitle === 'Drinks') {
      const cocktailsData = await drinkApi(recipeID, 'recipe-detail');
      if (cocktailsData) setRecipeInProgress(cocktailsData.drinks);
    }
  };
  useEffect(() => {
    recipeDetails();
  }, [history, pathname]);

  return (
    <div>
      {
        recipeInProgress && recipeInProgress.map((e) => (<DetailsMealsDrinks
          recipe={ e }
          key={ e.idMeal || e.idDrink }
        />))
      }

      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
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
