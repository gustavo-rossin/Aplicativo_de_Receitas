import React from 'react';
import PropTypes from 'prop-types';

function Recipe({ onClick, recipe, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <h3 data-testid={ `${index}-card-name` }>
        { recipe.strMeal || recipe.strDrink }
        {' '}
      </h3>
      <button type="button" onClick={ onClick }>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="recipeImg"
          width="200"
          data-testid={ `${index}-card-img` }
        />
      </button>
    </div>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Recipe;
