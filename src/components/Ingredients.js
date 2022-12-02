import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Ingredients.css';
import MealsContext from '../context/MealsContext';

function Ingredients({ ingredient, index }) {
  const history = useHistory();

  const { setFinishedIngredients } = useContext(MealsContext);

  const [isDone, setIsDone] = useState(false);
  const recipeID = history.location.pathname.replace(/[^0-9]/g, '');
  const pageTitle = history.location.pathname.includes('meals') ? 'meals' : 'drinks';

  const verifyIngredientInLocalStorage = () => {
    const inProgressRecipe = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    if (pageTitle === 'meals') {
      const isInProgress = inProgressRecipe.meals[recipeID] || [];
      const verifyIngredient = isInProgress.some((e) => e === ingredient);
      if (verifyIngredient) {
        setIsDone(true);
        setFinishedIngredients(isInProgress);
      }
    } else {
      const isInProgress = inProgressRecipe.drinks[recipeID] || [];
      const verifyIngredient = isInProgress.some((e) => e === ingredient);
      if (verifyIngredient) {
        setIsDone(true);
        setFinishedIngredients(isInProgress);
      }
    }
  };

  const inProgress = (type) => {
    const inProgressRecipe = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    const isInProgress = inProgressRecipe[type][recipeID] || [];
    const verifyIngredient = isInProgress.some((e) => e === ingredient);
    if (verifyIngredient) {
      const filter = isInProgress.filter((e) => e !== ingredient);
      inProgressRecipe[type][recipeID] = filter;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
      setFinishedIngredients(inProgressRecipe);
    } else {
      const newArr = [...isInProgress, ingredient];
      inProgressRecipe[type][recipeID] = newArr;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
      setFinishedIngredients([...isInProgress, ingredient]);
    }
  };

  const handleClick = () => {
    setIsDone(!isDone);
    inProgress(pageTitle);
  };

  useEffect(() => {
    verifyIngredientInLocalStorage();
  }, []);

  if (history.location.pathname.includes('in-progress')) {
    return (
      <label
        htmlFor={ ingredient }
        data-testid={ `${index}-ingredient-step` }
        className={ isDone ? 'linethrough' : 'unmarked' }

      >
        <input
          id={ ingredient }
          type="checkbox"
          onChange={ handleClick }
          checked={ isDone }
        />
        {ingredient }

      </label>
    );
  }

  return (
    <li data-testid={ `${index}-ingredient-name-and-measure` }>
      { ingredient }
    </li>
  );
}

Ingredients.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default Ingredients;
