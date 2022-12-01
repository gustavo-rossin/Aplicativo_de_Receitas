import React, { useEffect, useState } from 'react';
import RenderDoneRecipe from '../components/RenderDoneRecipe';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(getDoneRecipes);
  }, []);

  const filterDoneRecipes = (recipes, filter) => (
    recipes.filter((recipe) => filter === '' || recipe.type === filter)
  );

  const mapDoneRecipes = (recipes, filter) => {
    const filteredRecipes = filterDoneRecipes(recipes, filter);
    return filteredRecipes.map((recipe, index) => (
      <RenderDoneRecipe
        key={ `${index}-${recipe.name}` }
        recipeToRender={ recipe }
        index={ index }
      />
    ));
  };

  return (
    <div>
      <Header pageTitle="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setActiveFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setActiveFilter('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setActiveFilter('drink') }
      >
        Drinks
      </button>
      { mapDoneRecipes(doneRecipes, activeFilter) }
    </div>
  );
}

export default DoneRecipes;
