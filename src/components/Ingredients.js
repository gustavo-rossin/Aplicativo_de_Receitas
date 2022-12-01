import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Ingredients.css';

function Ingredients({ ingredient, index }) {
  const history = useHistory();
  // const [isDone, setIsDone] = useState(false);
  // const recipeID = history.location.pathname.replace(/[^0-9]/g, '');
  // const pageTitle = history.location.pathname.includes('meals') ? 'meals' : 'drinks';

  const handleClick = () => {
    addIngredientInLocalStorage();
  };

  if (history.location.pathname.includes('in-progress')) {
    return (
      <label
        className={ isDone ? 'linethrough' : 'unmarked' }
        htmlFor={ ingredient }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          id={ ingredient }
          type="checkbox"
          onClick={ handleClick }
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
