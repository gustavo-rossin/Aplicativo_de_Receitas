import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealDbApi from '../services/MealDbApi';
import CockTailDbApi from '../services/CockTailDbApi';
import Recipe from '../components/Recipe';
import MealsContext from '../context/MealsContext';
import categoryApi from '../services/CategoryApi';

function Recipes() {
  const history = useHistory();
  const maxValue = 12;
  const maxCategories = 5;
  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';
  const { apiResponse, setApiResponse } = useContext(MealsContext);
  const [categoryResponse, setCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  const getDefaultRecipes = useCallback(async () => {
    let data;
    if (pageTitle === 'Meals') {
      data = await MealDbApi('', 'nome');
      if (data.meals) setApiResponse(data.meals);
      console.log(data.meals);
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
    <div>
      <Footer />
      <Header
        pageTitle={ pageTitle }
        displaySearch
      />
      <button
        type="button"
        data-testid="All-category-filter"
        checked={ currentCategory === '' }
        onClick={ () => { getDefaultRecipes(); setCurrentCategory(''); } }
      >
        All
      </button>
      { categoryResponse.map((e) => (
        <input
          type="radio"
          key={ e.strCategory }
          data-testid={ `${e.strCategory}-category-filter` }
          name="category"
          checked={ currentCategory === e.strCategory }
          onClick={ () => getMealsOrDrinksByCategory(e.strCategory) }
        />
      )).filter((e, i) => i < maxCategories) }
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
    </div>
  );
}

export default Recipes;
