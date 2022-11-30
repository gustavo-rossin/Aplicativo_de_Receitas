import PropTypes from 'prop-types';
import React from 'react';
import Ingredients from './Ingredients';

function DetailsMealsDrinks({ recipe }) {
  const extractRecipeInfos = (key) => Object.entries(recipe)
    .filter((e) => e[0].includes(key) && e[1]).map((e) => e[1]);

  const ingredientName = extractRecipeInfos('strIngredient');
  const measure = extractRecipeInfos('strMeasure');
  const ingredients = ingredientName.map((e, i) => `${e} ${measure[i]}`);

  return (
    <div>
      <h1 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h1>

      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipeImg"
        data-testid="recipe-photo"
        width="200"
      />

      <div>
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients && ingredients
              .map((e, i) => <Ingredients ingredient={ e } key={ e } index={ i } />)
          }
        </ul>
      </div>

      <p data-testid="recipe-category">
        { recipe.strAlcoholic || recipe.strCategory }
      </p>

      <p data-testid="instructions">
        { recipe.strInstructions }
      </p>

      <iframe
        title={ recipe.strMeal || recipe.strDrink }
        data-testid="video"
        width="420"
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
