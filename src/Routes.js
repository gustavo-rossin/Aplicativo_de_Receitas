import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

export default class Routes extends Component {
  render() {
    return (

      <Switch>
        <Route exact path="/home" component={ withRouter(Home) } />
        <Route exact path="/" component={ withRouter(Login) } />
        <Route exact path="/meals" component={ withRouter(Recipes) } />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ withRouter(RecipeInProgress) }
        />
        <Route exact path="/drinks" component={ withRouter(Recipes) } />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ withRouter(RecipeInProgress) }
        />
        <Route exact path="/drinks/:id" component={ withRouter(RecipeDetails) } />
        <Route exact path="/meals/:id" component={ withRouter(RecipeDetails) } />
        <Route exact path="/done-recipes" component={ withRouter(DoneRecipes) } />
        <Route path="/favorite-recipes" component={ withRouter(FavoriteRecipes) } />
        <Route path="/profile" component={ withRouter(Profile) } />
        <Route path="*" component={ withRouter(NotFound) } />
      </Switch>

    );
  }
}
