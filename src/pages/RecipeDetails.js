import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import mealApi from '../services/MealDbApi';
import drinkApi from '../services/CockTailDbApi';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';

function RecipeDetails() {
  const { apiResponse,
    setApiResponse,
    setIdResponse,
    idResponse } = useContext(MealsContext);

  const history = useHistory();
  console.log(apiResponse);

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

  useEffect(() => {
    apiRequests();
  }, []);

  return (
    <div>
      {
        idResponse && idResponse.map((e) => (
          <DetailsMealsDrinks
            key={ e.idDrink || e.idMeal }
            recipe={ e }

          />))
      }

    </div>
  );
}

export default RecipeDetails;
