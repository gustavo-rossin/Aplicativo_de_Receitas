import React from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles/Home.style';
import logo from '../images/recipehome.png';
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';

function Home() {
  const history = useHistory();
  const redirect = () => {
    const user = localStorage.getItem('user');
    if (user) {
      history.push('/meals');
    } else {
      history.push('/');
    }
  };
  return (
    <S.homeContainer>
      <S.buttonRedirect type="button" onClick={ redirect }>
        <S.logo
          src={ logo }
          alt="logo"
        />
      </S.buttonRedirect>

      <S.linkedinGitContainer>
        <a href="https://www.linkedin.com/in/erick-argollo/" target="_blank" rel="noreferrer">
          <S.linkedinImg src={ linkedin } alt="linkedin" />
        </a>
        <a href="https://github.com/ErickArgollo" target="_blank" rel="noreferrer">
          <S.githubImg src={ github } alt="github" />
        </a>
      </S.linkedinGitContainer>
    </S.homeContainer>

  );
}

export default Home;
