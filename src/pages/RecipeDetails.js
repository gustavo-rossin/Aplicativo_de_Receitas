import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import mealApi from '../services/MealDbApi';
import drinkApi from '../services/CockTailDbApi';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';

function RecipeDetails() {
  const { apiResponse, setApiResponse } = useContext(MealsContext);

  const history = useHistory();

  console.log(apiResponse);

  const recipeId = history.location.pathname.split('/')[2];

  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';

  const searchId = async () => {
    if (pageTitle === 'Meals') {
      const response = await mealApi(recipeId, 'recipe-detail');
      setApiResponse(response.meals);
    } else {
      const response = await drinkApi(recipeId, 'recipe-detail');
      setApiResponse(response.drinks);
    }
  };

  useEffect(() => {
    searchId();
  }, []);

  return (
    <div>
      {
        apiResponse && apiResponse.map((e) => (
          <DetailsMealsDrinks
            key={ e.idDrink || e.idMeal }
            recipe={ e }

          />))
      }

    </div>
  );
}

export default RecipeDetails;
