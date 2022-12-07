import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as S from './styles/Profile.style';

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
    <S.profileContainer>
      <Header pageTitle="Profile" />
      <S.pageTitle>PROFILE</S.pageTitle>
      <S.email data-testid="profile-email">{storage.email}</S.email>
      <S.buttonsContainer>
        <S.buttonContainer>
          <S.buttonIcon className="material-icons">
            <S.button
              type="button"
              data-testid="profile-done-btn"
              onClick={ handleClickDone }
            >
              done
            </S.button>
          </S.buttonIcon>
          <S.textBtn onClick={ handleClickDone }>
            Done Recipes
          </S.textBtn>
        </S.buttonContainer>

        <S.buttonContainer>
          <S.buttonIcon className="material-icons">
            <S.button
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ handleClickFavorite }
            >
              favorite
            </S.button>
          </S.buttonIcon>
          <S.textBtn onClick={ handleClickFavorite }>
            Favorite Recipes
          </S.textBtn>
        </S.buttonContainer>

        <S.buttonContainer>
          <S.buttonIcon className="material-icons">
            <S.button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ handleClickLogout }
            >
              logout
            </S.button>
          </S.buttonIcon>
          <S.textBtn onClick={ handleClickLogout }>
            Logout
          </S.textBtn>
        </S.buttonContainer>

      </S.buttonsContainer>
      <S.footerContainer>
        <Footer />
      </S.footerContainer>
    </S.profileContainer>
  );
}

export default Profile;
