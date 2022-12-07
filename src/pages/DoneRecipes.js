import React, { useEffect, useState } from 'react';
import RenderDoneRecipe from '../components/RenderDoneRecipe';
import Header from '../components/Header';
import * as S from './styles/DoneRecipes.style';

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
    <S.doneRecipeContainer>
      <Header pageTitle="Done Recipes" />
      <S.pageTitle>
        DONE RECIPES
      </S.pageTitle>
      <S.filtersContainer>
        <S.titleButonContainer>
          <S.buttonFilter
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setActiveFilter('') }
          >
            <S.buttonIcon className="material-icons">
              fastfood
            </S.buttonIcon>
          </S.buttonFilter>
          <S.categoryTitle>All</S.categoryTitle>
        </S.titleButonContainer>

        <S.titleButonContainer>
          <S.buttonFilter
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setActiveFilter('meal') }
          >
            <S.buttonIcon className="material-icons">
              restaurant_menu
            </S.buttonIcon>
          </S.buttonFilter>
          <S.categoryTitle>Meals</S.categoryTitle>
        </S.titleButonContainer>

        <S.titleButonContainer>
          <S.buttonFilter
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setActiveFilter('drink') }
          >
            <S.buttonIcon className="material-icons">
              local_bar
            </S.buttonIcon>
          </S.buttonFilter>
          <S.categoryTitle>Drinks</S.categoryTitle>
        </S.titleButonContainer>

      </S.filtersContainer>
      <S.recipesContainer>
        { mapDoneRecipes(doneRecipes, activeFilter) }
      </S.recipesContainer>
    </S.doneRecipeContainer>
  );
}

export default DoneRecipes;
