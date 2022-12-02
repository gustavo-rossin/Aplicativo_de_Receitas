import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function RenderDoneRecipe({ recipeToRender, index }) {
  console.log(recipeToRender.tags);
  const [linkIsCopied, setIsCopied] = useState(false);

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

  return (
    <div>
      <Link
        to={ recipeToRender.type === 'meal'
          ? `/meals/${recipeToRender.id}`
          : `/drinks/${recipeToRender.id}` }
      >
        <img
          src={ recipeToRender.image }
          alt={ recipeToRender.name }
          data-testid={ `${index}-horizontal-image` }
          width="200"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { recipeToRender.name }
        </h3>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          recipeToRender.type === 'meal'
            ? `${recipeToRender.nationality} - ${recipeToRender.category}`
            : recipeToRender.alcoholicOrNot
        }
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipeToRender.doneDate }
      </p>
      { recipeToRender.tags.map((tag) => (
        <p
          key={ `${index}-${tag}` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </p>))}
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => shareRecipe(recipeToRender) }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { linkIsCopied && (
        <p>
          Link copied!
        </p>
      )}
    </div>
  );
}

RenderDoneRecipe.propTypes = {}.isRequired;

export default RenderDoneRecipe;
