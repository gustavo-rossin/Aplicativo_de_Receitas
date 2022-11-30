import PropTypes from 'prop-types';
import React from 'react';

function Ingredients({ ingredient, index }) {
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
