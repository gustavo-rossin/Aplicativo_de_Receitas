import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, displaySearch }) {
  const history = useHistory();

  return (
    <div>

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
      {
        displaySearch && (
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search Button"
          />
        )
      }
      <h3
        data-testid="page-title"
      >
        { pageTitle }
      </h3>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  displaySearch: PropTypes.bool,
};

Header.defaultProps = {
  displaySearch: false,
};

export default Header;
