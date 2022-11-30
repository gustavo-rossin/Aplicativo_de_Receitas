import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider({ children }) {
  const [apiResponse, setApiResponse] = useState([]);
  const [idResponse, setIdResponse] = useState([]);

  return (
    <MealsContext.Provider
      value={
        useMemo(() => ({
          apiResponse,
          setApiResponse,
          idResponse,
          setIdResponse }), [apiResponse, setApiResponse, idResponse, setApiResponse])
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
