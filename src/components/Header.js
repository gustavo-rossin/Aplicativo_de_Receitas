import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import iconRecipe from '../images/iconeRecipe.svg';
import logo from '../images/headerLogo.svg';
import * as S from './styles/Header.style';

function Header({ displaySearch }) {
  const history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <S.header>
      <S.topBar>
        <S.iconRecipe src={ iconRecipe } alt="icon" />
        <S.headerLogo src={ logo } alt="logo" />
        {
          displaySearch && (
            <S.searchIcon className="material-icons">
              <S.buttonSearch
                type="button"
                onClick={ () => setIsSearching(!isSearching) }
              >
                search
              </S.buttonSearch>
            </S.searchIcon>
          )
        }
        <S.profileIcon className="material-icons">
          <S.buttonProfile
            type="button"
            onClick={ () => history.push('/profile') }
          >
            account_circle
          </S.buttonProfile>
        </S.profileIcon>

      </S.topBar>
      <S.searchBarContainer>
        { isSearching && <SearchBar setIsSearching={ setIsSearching } />}
      </S.searchBarContainer>
    </S.header>
  );
}

Header.propTypes = {
  displaySearch: PropTypes.bool,
};

Header.defaultProps = {
  displaySearch: false,
};

export default Header;
