import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles/Recipe.style';

function Recipe({ onClick, recipe, index }) {
  return (
    <S.recipeContainer
      data-testid={ `${index}-recipe-card` }
    >
      <S.imgBtn type="button" onClick={ onClick }>
        <S.recipeImg
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt="recipeImg"
          width="200"
          data-testid={ `${index}-card-img` }
        />
      </S.imgBtn>
      <S.recipeTitle data-testid={ `${index}-card-name` }>
        { recipe.strMeal || recipe.strDrink }
        {' '}
      </S.recipeTitle>
    </S.recipeContainer>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Recipe;
