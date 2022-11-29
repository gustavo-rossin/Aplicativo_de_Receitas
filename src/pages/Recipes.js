import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Recipes() {
  const history = useHistory();
  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';

  return (
    <div>
      <Header
        pageTitle={ pageTitle }
        displaySearch
      />
    </div>
  );
}

export default Recipes;
