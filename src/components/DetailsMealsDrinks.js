import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Ingredients from './Ingredients';
import * as S from './styles/DetailsMealsDrinks.style';

function DetailsMealsDrinks({ recipe }) {
  const extractRecipeInfos = (key) => Object.entries(recipe)
    .filter((e) => e[0].includes(key) && e[1]).map((e) => e[1]);

  const history = useHistory();

  const ingredientName = extractRecipeInfos('strIngredient');
  const measure = extractRecipeInfos('strMeasure');
  const ingredients = ingredientName.map((e, i) => `${e} ${measure[i]}`);

  const recipeType = recipe.strMeal ? 'meal' : 'drink';

  const getEmbedVideo = (url) => {
    if (!url) return '';
    const splitUrl = url.split('watch?v=');
    const embededUrl = `${splitUrl[0]}/embed/${splitUrl[1]}`;
    return embededUrl;
  };

  const handleBackArrow = () => {
    if (history.location.pathname.includes('in-progress')) return history.goBack();
    history.push(`/${recipeType}s`);
  };

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
        <S.goBackArrow type="button" onClick={ handleBackArrow }>
          <span className="material-icons">
            arrow_back
          </span>
        </S.goBackArrow>
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

      <S.frame
        title={ recipe.strMeal || recipe.strDrink }
        data-testid="video"
        allowFullScreen
        width="100%"
        height="200"
        src={ getEmbedVideo(recipe.strYoutube || recipe.strVideo) }
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
