import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DetailsMealsDrinks from '../components/DetailsMealsDrinks';
import Recommendation from '../components/Recommendation';
import MealsContext from '../context/MealsContext';
import drinkApi from '../services/CockTailDbApi';
import mealApi from '../services/MealDbApi';
import { verifyFavorite,
  saveFavorite,
  removeFavorite } from '../services/favoriteFunctions';
import * as S from './styles/RecipeDetails.style';

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
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { drinks: {}, meals: {} };
    if (pageTitle === 'Drinks') {
      const progress = Object.keys(inProgressRecipes.drinks)
        .some((e) => e === recipeId);
      if (progress) {
        setInProgress(true);
      }
    } else {
      const progress = Object.keys(inProgressRecipes.meals)
        .some((e) => e === recipeId);
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

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (isFavorite) {
      removeFavorite(favorites, recipeId);
    } else {
      saveFavorite(favorites, idResponse, pageTitle);
    }
    verifyFavorite(setFavorite, recipeId);
  };

  useEffect(() => {
    apiRequests();
    verifyIsDone();
    continueRecipes();
    verifyFavorite(setFavorite, recipeId);
  }, []);

  return (
    <S.detailsContainer>

      {
        idResponse && idResponse.map((e) => (
          <DetailsMealsDrinks
            key={ e.idDrink || e.idMeal }
            recipe={ e }
          />))
      }
      <S.shareFavContainer>
        {
          wasCopied ? <span>Link copied!</span> : (
            <S.shareIcon className="material-icons">
              <S.shareBtn
                type="button"
                data-testid="share-btn"
                onClick={ clipBoardShare }
              >
                share
              </S.shareBtn>
            </S.shareIcon>)
        }
        <S.favoriteBtn
          type="button"
          data-testid="favorite-btn"
          onClick={ toggleFavorite }
        >

          <S.favIcon
            className="material-icons"
            style={ {
              color: isFavorite ? '#FCC436' : 'white',
            } }
          >
            favorite
          </S.favIcon>

        </S.favoriteBtn>
      </S.shareFavContainer>
      <S.recommendationTitle>Recommendation</S.recommendationTitle>
      <S.caroussel className="caroussel">
        {
          apiResponse && apiResponse.map((e, i) => (
            <Recommendation
              key={ e.idDrink || e.idMeal }
              recommended={ e }
              index={ i }
            />
          )).filter((_e, i) => i < maxValue)
        }
      </S.caroussel>

      {
        !isDone && !inProgress ? (
          <S.startBtn
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            onClick={ progressRedirect }
          >
            Start Recipe

          </S.startBtn>) : (
          (
            <S.startBtn
              type="button"
              data-testid="start-recipe-btn"
              onClick={ progressRedirect }
            >
              Continue Recipe

            </S.startBtn>))
      }

    </S.detailsContainer>
  );
}

export default RecipeDetails;
