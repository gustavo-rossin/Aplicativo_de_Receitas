import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider({ children }) {
  const [apiResponse, setApiResponse] = useState([]);

  return (
    <MealsContext.Provider
      value={
        useMemo(() => ({ apiResponse, setApiResponse }), [apiResponse, setApiResponse])
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
