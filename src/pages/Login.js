import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import logo from '../images/logo.svg';
import tomatepicture from '../images/tomate.svg';
import * as S from './styles/Login.style';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const validateInputs = () => {
    const setMinVal = 6;
    const regexEmail = /\S+@\S+\.\S+/;
    const validateMail = regexEmail.test(email);

    if (password.length > setMinVal && validateMail) {
      setDisabled(false);
    } else { setDisabled(true); }
  };

  useEffect(() => {
    validateInputs();
  }, [email, password]);

  const handleSubmit = () => {
    const user = {
      email,
    };

    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <S.loginStyle>
      <S.formLoginContainer>
        <S.imgsContainer>
          <S.logo src={ logo } alt="logo" />
          <S.tomate src={ tomatepicture } alt="tomate" />
        </S.imgsContainer>
        <S.inputContainer>
          <S.inputMailAndPassword
            type="email"
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Email"
            data-testid="email-input"
          />
          <S.inputMailAndPassword
            type="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <S.loginBtn
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleSubmit }
            disabled={ isDisabled }
          >
            Entrar
          </S.loginBtn>
        </S.inputContainer>
      </S.formLoginContainer>
    </S.loginStyle>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
