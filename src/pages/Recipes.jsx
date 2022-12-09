/* eslint-disable react/jsx-max-depth */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipe from '../components/Recipe';
import MealsContext from '../context/MealsContext';
import categoryApi from '../services/CategoryApi';
import CockTailDbApi from '../services/CockTailDbApi';
import MealDbApi from '../services/MealDbApi';
import * as S from './styles/Recipes.style';
import 'bootstrap/dist/css/bootstrap.min.css';

function Recipes() {
  const history = useHistory();
  const maxValue = 12;
  const maxCategories = 5;
  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';
  const { apiResponse, setApiResponse } = useContext(MealsContext);
  const [categoryResponse, setCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const initialMargin = -40;
  const [leftMargin, setLeftMargin] = useState(initialMargin);

  const slideRight = () => {
    const magicN1 = -150;
    const magicN2 = 60;
    if (leftMargin > magicN1) {
      setLeftMargin(leftMargin - magicN2);
    }
  };

  const slideLeft = () => {
    const magicN2 = 60;
    if (leftMargin < 0) {
      setLeftMargin(leftMargin + magicN2);
    }
  };

  const getDefaultRecipes = useCallback(async () => {
    let data;
    if (pageTitle === 'Meals') {
      data = await MealDbApi('', 'nome');
      if (data.meals) setApiResponse(data.meals);
    }
    if (pageTitle === 'Drinks') {
      data = await CockTailDbApi('', 'nome');
      if (data.drinks) setApiResponse(data.drinks);
    }
  }, [setApiResponse, pageTitle]);

  const getCategories = useCallback(async () => {
    const categories = await categoryApi(pageTitle);
    setCategory(categories);
  }, [pageTitle, setCategory]);

  useEffect(() => {
    getDefaultRecipes();
    getCategories();
  }, [getDefaultRecipes, getCategories]);

  const handleClick = (id) => {
    if (pageTitle === 'Meals') {
      history.push(`/meals/${id}`);
    }
    if (pageTitle === 'Drinks') {
      history.push(`/drinks/${id}`);
    }
  };

  const getMealsOrDrinksByCategory = async (category) => {
    if (currentCategory === category) {
      await getDefaultRecipes();
      return setCurrentCategory('');
    }
    if (pageTitle === 'Meals') {
      const mealsByCategory = await MealDbApi(category, 'category');
      setCurrentCategory(category);
      setApiResponse(mealsByCategory.meals);
    }
    if (pageTitle === 'Drinks') {
      const drinksByCategory = await CockTailDbApi(category, 'category');
      setCurrentCategory(category);
      setApiResponse(drinksByCategory.drinks);
    }
  };

  return (
    <S.recipePageContainer>
      <Header
        displaySearch
      />
      <S.pageTitle>
        { pageTitle }
      </S.pageTitle>
      <S.rightArrow className="material-icons" onClick={ slideRight }>
        chevron_right
      </S.rightArrow>
      <S.leftArrow className="material-icons" onClick={ slideLeft }>
        chevron_left
      </S.leftArrow>
      <S.categoryContainer>

        <S.slideDiv style={ { marginLeft: leftMargin } }>
          <S.titleButonContainer>
            <S.buttonsCategory
              type="button"
              data-testid="All-category-filter"
              checked={ currentCategory === '' }
              onClick={ () => { getDefaultRecipes(); setCurrentCategory(''); } }
            >
              <S.buttonIcon className="material-icons">
                restaurant_menu
              </S.buttonIcon>
            </S.buttonsCategory>
            <S.categoryTitle>All</S.categoryTitle>
          </S.titleButonContainer>
          { categoryResponse.map((e) => (
            <S.titleButonContainer key={ e.strCategory }>
              <S.buttonsCategory
                type="button"
                data-testid={ `${e.strCategory}-category-filter` }
                name="category"
                checked={ currentCategory === e.strCategory }
                onClick={ () => getMealsOrDrinksByCategory(e.strCategory) }
              >
                <S.buttonIcon className="material-icons">
                  local_bar
                </S.buttonIcon>
              </S.buttonsCategory>
              <S.categoryTitle>
                {e.strCategory}
              </S.categoryTitle>
            </S.titleButonContainer>
          )).filter((e, i) => i < maxCategories) }
        </S.slideDiv>

      </S.categoryContainer>
      <S.recipesContainer>
        {
          apiResponse && apiResponse.map((e, i) => (
            <Recipe
              key={ e.idDrink || e.idMeal }
              recipe={ e }
              index={ i }
              onClick={ () => handleClick(e.idDrink || e.idMeal) }
            />
          )).filter((e, i) => i < maxValue)
        }
      </S.recipesContainer>
      <Footer />
    </S.recipePageContainer>
  );
}

export default Recipes;
