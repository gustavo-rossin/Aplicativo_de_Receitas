import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [storage, setStorage] = useState({});
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user') || '{}');
    setStorage(email);
  }, []);
  const history = useHistory();

  const handleClickDone = () => {
    const path = '/done-recipes';
    history.push(path);
  };

  const handleClickFavorite = () => {
    const path = '/favorite-recipes';
    history.push(path);
  };

  const handleClickLogout = () => {
    const path = '/';
    history.push(path);
    localStorage.clear();
  };

  return (
    <div>
      <Header pageTitle="Profile" />
      <p data-testid="profile-email">{storage.email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClickDone }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClickFavorite }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
