import React, { useContext, useEffect, useState } from 'react';
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
  const [isDone, setIsDone] = useState(false);

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

  const progressRedirect = () => {
    if (pageTitle === 'Meals') {
      history.push(`/meals/${recipeId}/in-progress`);
    } else {
      history.push(`/drinks/${recipeId}/in-progress`);
    }
  };

  useEffect(() => {
    apiRequests();
    verifyIsDone();
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

      {
        !isDone && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ progressRedirect }
          >
            Start Recipe

          </button>)
      }

    </div>
  );
}

export default RecipeDetails;
