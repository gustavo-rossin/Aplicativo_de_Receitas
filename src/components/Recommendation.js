import PropTypes from 'prop-types';
import React from 'react';
import * as S from './styles/Recommendation.style';

function Recommendation({ recommended, index }) {
  return (
    <div data-testid={ `${index}-recommendation-card` }>
      <S.recommendationTitle
        data-testid={ `${index}-recommendation-title` }
      >
        {recommended.strMeal || recommended.strDrink}
      </S.recommendationTitle>
      <S.recommendationImg
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
