import React from 'react';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Recipes() {
  const history = useHistory();
  const pageTitle = history.location.pathname.includes('meals') ? 'Meals' : 'Drinks';

  return (
    <div>
      <Footer />
      <Header
        pageTitle={ pageTitle }
        displaySearch
      />
    </div>
  );
}

export default Recipes;
