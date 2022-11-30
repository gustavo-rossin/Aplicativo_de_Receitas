import React, { useState, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import MealDbApi from '../services/MealDbApi';
import MealsContext from './MealsContext';
// import CockTailDbApi from '../services/CockTailDbApi';

function MealsProvider({ children }) {
  const [apiResponse, setApiResponse] = useState([]);
  const [idResponse, setIdResponse] = useState([]);

  // const history = useHistory();

  // useEffect(() => {
  //   const getDefaultRecipes = async () => {
  //     let data;
  //     if (history.location.pathname === 'meals') {
  //       data = await MealDbApi('', 'nome');
  //       if (data.meals) setApiResponse(data.meals);
  //       console.log(data.meals);
  //     }
  //     if (history.location.pathname === 'drinks') {
  //       data = await CockTailDbApi('', 'nome');
  //       if (data.drinks) setApiResponse(data.drinks);
  //     }
  //   };

  //   getDefaultRecipes();
  // }, []);

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
