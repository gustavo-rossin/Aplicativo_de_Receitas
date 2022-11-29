import React, { useContext } from 'react';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Recipe from '../components/Recipe';
import MealsContext from '../context/MealsContext';

function Recipes() {
  const history = useHistory();
  const maxValue = 12;
  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';
  const { apiResponse } = useContext(MealsContext);
  return (
    <div>
      <Footer />
      <Header
        pageTitle={ pageTitle }
        displaySearch
      />
      {
        apiResponse && apiResponse.map((e, i) => (
          <Recipe
            key={ e.idDrink || e.idMeal }
            recipe={ e }
            index={ i }
          />
        )).filter((_e, i) => i < maxValue)
      }
    </div>
  );
}

export default Recipes;
