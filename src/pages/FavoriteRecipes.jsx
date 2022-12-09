import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import * as S from './styles/FavoriteRecipes.style';
import Footer from '../components/Footer';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [arrFavorites, setFavorites] = useState(favorites);
  const [copied, setCopied] = useState('');

  const filterAll = () => {
    setFavorites(favorites);
  };

  const filterMeals = () => {
    const filterMeal = favorites.filter((e) => e.type === 'meal');
    setFavorites(filterMeal);
  };

  const filterDrinks = () => {
    const filterDrink = favorites.filter((e) => e.type === 'drink');
    setFavorites(filterDrink);
  };

  const removeFavorite = (arr, id) => {
    const filterFavorite = arr.filter((e) => +e.id !== +id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterFavorite));
    setFavorites(filterFavorite);
  };

  const clipBoardShare = (id, type) => {
    if (type === 'meal') {
      copy(`http://localhost:3000/meals/${id}`);
      setCopied(id);
    }
    if (type === 'drink') {
      copy(`http://localhost:3000/drinks/${id}`);
      setCopied(id);
    }
  };

  const toggleFavorite = (id) => {
    removeFavorite(favorites, id);
  };
  return (
    <S.favoritePageContainer>
      <Header pageTitle="Favorite Recipes" />
      <S.pageTitle>FAVORITES</S.pageTitle>
      <S.filtersContainer>
        <S.titleButonContainer>
          <S.buttonFilter
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ filterAll }
          >
            <S.buttonIcon className="material-icons">
              fastfood
            </S.buttonIcon>
          </S.buttonFilter>
          <S.categoryTitle>All</S.categoryTitle>
        </S.titleButonContainer>

        <S.titleButonContainer>
          <S.buttonFilter
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ filterMeals }
          >
            <S.buttonIcon className="material-icons">
              restaurant_menu
            </S.buttonIcon>
          </S.buttonFilter>
          <S.categoryTitle>Meals</S.categoryTitle>
        </S.titleButonContainer>

        <S.titleButonContainer>
          <S.buttonFilter
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ filterDrinks }
          >
            <S.buttonIcon className="material-icons">
              local_bar
            </S.buttonIcon>
          </S.buttonFilter>
          <S.categoryTitle>Drinks</S.categoryTitle>
        </S.titleButonContainer>

      </S.filtersContainer>
      <S.recipesContainer>
        {
          arrFavorites.map((e, index) => (
            <S.recipeContainer key={ e.name }>

              <S.recipeImg
                data-testid={ `${index}-horizontal-image` }
                alt={ e.name }
                src={ e.image }
              />

              <S.InfosContainer>
                <NavLink to={ e.type === 'meal' ? `/meals/${e.id}` : `/drinks/${e.id}` }>
                  <S.recipeTitle
                    data-testid={
                      `${index}-horizontal-name`
                    }
                  >
                    {e.name}
                  </S.recipeTitle>
                </NavLink>
                <S.nationality data-testid={ `${index}-horizontal-top-text` }>
                  {`${e.nationality} - ${e.category}` || e.alcoholicOrNot}
                </S.nationality>
                <S.shareFavContainer>
                  <S.favoriteBtn
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => toggleFavorite(e.id) }
                  >
                    <S.favIcon className="material-icons">
                      favorite
                    </S.favIcon>
                  </S.favoriteBtn>
                  {
                    copied === e.id ? <S.linkCopied>Link copied!</S.linkCopied> : (
                      <S.shareIcon className="material-icons">
                        <S.shareBtn
                          type="button"
                          data-testid={ `${index}-horizontal-share-btn` }
                          onClick={ () => clipBoardShare(e.id, e.type) }
                          src="shareIcon"
                          name={ e.id }
                        >
                          share
                        </S.shareBtn>
                      </S.shareIcon>)
                  }
                </S.shareFavContainer>
              </S.InfosContainer>
            </S.recipeContainer>
          ))
        }
      </S.recipesContainer>
      {
        Object.keys(favorites).length === 0
          ? (
            <S.footerDiv>
              <Footer />
            </S.footerDiv>)
          : <Footer />
      }

    </S.favoritePageContainer>
  );
}

export default FavoriteRecipes;
