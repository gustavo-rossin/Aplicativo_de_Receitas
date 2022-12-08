import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import * as S from './styles/Recommendation.style';

function Recommendation({ recommended, index }) {
  const recipeType = recommended.strMeal ? 'meal' : 'drink';

  return (
    <div data-testid={ `${index}-recommendation-card` }>
      <Link to={ `/${recipeType}s/${recommended.idMeal || recommended.idDrink}` }>
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
      </Link>
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
    idDrink: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recommendation;
