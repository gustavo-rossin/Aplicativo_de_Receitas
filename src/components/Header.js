import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageTitle, displaySearch }) {
  const history = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div>
      <div>
        {
          displaySearch && (
            <button
              type="button"
              onClick={ () => setIsSearching(!isSearching) }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search Button"
              />
            </button>
          )
        }
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Button"
          />
        </button>
        <h3
          data-testid="page-title"
        >
          { pageTitle }
        </h3>
      </div>
      <div>
        { isSearching && <SearchBar />}
      </div>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string,
  displaySearch: PropTypes.bool,
};

Header.defaultProps = {
  pageTitle: '',
  displaySearch: false,
};

export default Header;
