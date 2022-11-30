import PropTypes from 'prop-types';
import React from 'react';

function Recommendation({ recommended, index }) {
  return (
    <div data-testid={ `${index}-recommendation-card` }>
      <p
        data-testid={ `${index}-recommendation-title` }
      >
        {recommended.strMeal || recommended.strDrink}
      </p>
      <img
        src={ recommended.strMealThumb || recommended.strDrinkThumb }
        alt="recipeImg"
        width="180"
      />
    </div>

  );
}

Recommendation.propTypes = {
  index: PropTypes.number.isRequired,
  recommended: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recommendation;
