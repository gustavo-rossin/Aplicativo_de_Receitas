import React from 'react';
import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

afterEach(() => cleanup());

describe('Testa a pagina Profile', () => {
  it('testa os componentes da tela Profile', async () => {
    global.localStorage.setItem('user', JSON.stringify({ email: 'o@o.com' }));

    renderWithRouter(<Profile />);

    const title = screen.getByRole('heading', { name: /profile/i });
    const email = screen.getByText('o@o.com');
    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFav = screen.getByTesteId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    const drinkIcon = screen.getByRole('img', { name: /drinkicon/i });
    const mealIcon = screen.getByRole('img', { name: /mealicon/i });

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(btnDone).toBeInTheDocument();
    expect(btnFav).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });

  it('testa se o botão de done recipes funciona corretamente', async () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);
    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  it('testa se o botão de favoritos funciona corretamente', async () => {
    const { history } = renderWithRouter(<Profile />);
    global.localStorage.clear();
    const btnFav = screen.getByTesteId('profile-favorite-btn');
    userEvent.click(btnFav);
    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
  });

  it('testa se o botão de logout funciona corretamente', async () => {
    const { history } = renderWithRouter(<Profile />);
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);

    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });
});
