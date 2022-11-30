import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import mealApi from '../services/MealDbApi';
import drinkApi from '../services/CockTailDbApi';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import Recommendation from '../components/Recommendation';
import './styles/RecipeDetails.css';

function RecipeDetails() {
  const { apiResponse,
    setApiResponse,
    setIdResponse,
    idResponse } = useContext(MealsContext);

  const history = useHistory();
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

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        Start Recipe

      </button>

    </div>
  );
}

export default RecipeDetails;
