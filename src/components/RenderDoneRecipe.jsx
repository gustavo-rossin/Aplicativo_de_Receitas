import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles/RenderDoneRecipe.style';

function RenderDoneRecipe({ recipeToRender, index }) {
  console.log(recipeToRender.tags);
  const [wasCopied, setIsCopied] = useState(false);

  const getRecipeUrl = (recipe) => {
    const currentUrl = window.location.href.split('/done-recipes');
    const recipeType = `${recipe.type}s`;
    const detailsUrl = `${currentUrl[0]}/${recipeType}/${recipe.id}`;

    return detailsUrl;
  };

  const shareRecipe = (recipe) => {
    const THREE_SECONDS = 3000;
    const recipeUrl = getRecipeUrl(recipe);

    navigator.clipboard.writeText(recipeUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), THREE_SECONDS);
  };

  const formatDoneDate = (date) => {
    const splitDate = date.split('T')[0].split('-');
    const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    const splitHours = date.split('T')[1].split('.')[0].split(',');
    return [formattedDate, splitHours];
  };

  const formattedDate = formatDoneDate(recipeToRender.doneDate);

  return (
    <S.recipeMainContainer>
      <S.recipeContainer>
        <S.recipeImg
          src={ recipeToRender.image }
          alt={ recipeToRender.name }
          data-testid={ `${index}-horizontal-image` }
          width="200"
        />

        <S.InfosContainter>
          <Link
            to={ recipeToRender.type === 'meal'
              ? `/meals/${recipeToRender.id}`
              : `/drinks/${recipeToRender.id}` }
          >
            <S.recipeTitle data-testid={ `${index}-horizontal-name` }>
              { recipeToRender.name }
            </S.recipeTitle>
          </Link>
          <S.nationality data-testid={ `${index}-horizontal-top-text` }>
            {
              recipeToRender.type === 'meal'
                ? `${recipeToRender.nationality} - ${recipeToRender.category}`
                : recipeToRender.alcoholicOrNot
            }
          </S.nationality>
          <S.doneDate data-testid={ `${index}-horizontal-done-date` }>
            {`Done in: ${formattedDate[0]}  at ${formattedDate[1]}` }
          </S.doneDate>
        </S.InfosContainter>
      </S.recipeContainer>
      <S.tagsContainer>
        { recipeToRender.tags.map((tag) => (
          <S.tag
            key={ `${index}-${tag}` }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </S.tag>))}
      </S.tagsContainer>
      {
        wasCopied ? <S.linkCopied>Link copied!</S.linkCopied> : (
          <S.shareIcon className="material-icons">
            <S.shareBtn
              type="button"
              data-testid="share-btn"
              onClick={ () => shareRecipe(recipeToRender) }
            >
              share
            </S.shareBtn>
          </S.shareIcon>)
      }
    </S.recipeMainContainer>
  );
}

RenderDoneRecipe.propTypes = {}.isRequired;

export default RenderDoneRecipe;
