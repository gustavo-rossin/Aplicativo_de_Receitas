import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da Página de Login', () => {
  it('Verifica se o usuário digitou um email/senha válida', () => {
    render(<App />);
    const inputMail = screen.getByTestId('email-input');
    expect(inputMail).toBeInTheDocument();
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    const buttonSubmit = screen.getByTestId('login-submit-btn');
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).toBeDisabled();
    userEvent.type(inputMail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345678');
    expect(buttonSubmit).not.toBeDisabled();

    userEvent.click(buttonSubmit);
  });
});
