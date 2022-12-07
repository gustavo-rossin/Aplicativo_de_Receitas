import PropTypes from 'prop-types';
import React from 'react';
import Ingredients from './Ingredients';
import * as S from './styles/DetailsMealsDrinks.style';

function DetailsMealsDrinks({ recipe }) {
  const extractRecipeInfos = (key) => Object.entries(recipe)
    .filter((e) => e[0].includes(key) && e[1]).map((e) => e[1]);

  const ingredientName = extractRecipeInfos('strIngredient');
  const measure = extractRecipeInfos('strMeasure');
  const ingredients = ingredientName.map((e, i) => `${e} ${measure[i]}`);

  return (
    <div>

      <S.topImg
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipeImg"
        data-testid="recipe-photo"
        width="200"
      />
      <S.recipeTitle data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </S.recipeTitle>

      <div>
        <S.ingredientTitle>Ingredients</S.ingredientTitle>
        <S.ingredientsUl>
          {
            ingredients && ingredients
              .map((e, i) => <Ingredients ingredient={ e } key={ e } index={ i } />)
          }
        </S.ingredientsUl>
      </div>

      <S.categoryContainer>
        <span className="material-icons">
          fastfood
        </span>
        <S.categoryTitle data-testid="recipe-category">
          { recipe.strAlcoholic || recipe.strCategory }
        </S.categoryTitle>

      </S.categoryContainer>
      <S.instructionTitle>Instructions</S.instructionTitle>
      <S.instructionContainer>
        <S.instructionText data-testid="instructions">
          { recipe.strInstructions }
        </S.instructionText>
      </S.instructionContainer>

      <iframe
        title={ recipe.strMeal || recipe.strDrink }
        data-testid="video"
        width="90%"
        height="315"
        src={ recipe.strYoutube || recipe.strVideo }
      />
    </div>
  );
}

DetailsMealsDrinks.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
    strVideo: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsMealsDrinks;
