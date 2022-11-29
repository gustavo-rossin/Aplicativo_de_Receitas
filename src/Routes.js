import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/drinks" component={ Recipes } />
          <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}
