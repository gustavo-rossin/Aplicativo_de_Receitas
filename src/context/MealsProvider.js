import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider({ children }) {
  const [apiResponse, setApiResponse] = useState([]);
  const [idResponse, setIdResponse] = useState([]);
  const [finishedIngredients, setFinishedIngredients] = useState([]);
  return (
    <MealsContext.Provider
      value={
        useMemo(() => ({
          apiResponse,
          setApiResponse,
          idResponse,
          setIdResponse,
          finishedIngredients,
          setFinishedIngredients }), [apiResponse, idResponse, finishedIngredients])
      }
    >
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default MealsProvider;
