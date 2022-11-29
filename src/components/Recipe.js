import React from 'react';
import PropTypes from 'prop-types';

function Recipe({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h3 data-testid={ `${index}-card-name` }>
        { recipe.strMeal || recipe.strDrink }
        {' '}
      </h3>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipeImg"
        width="200"
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipe;
