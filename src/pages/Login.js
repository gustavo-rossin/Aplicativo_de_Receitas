import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

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
    <form>
      <input
        type="email"
        onChange={ ({ target }) => setEmail(target.value) }
        placeholder="email"
        data-testid="email-input"

      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
        disabled={ isDisabled }
      >
        Entrar

      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
