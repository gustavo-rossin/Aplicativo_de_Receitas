import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';

describe('testa o componente Header', () => {
  test('se o componente é renderizado corretamente', () => {
    renderWithRouter(<Header pageTitle="Test" displaySearch />);

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Test');
  });

  test('se o botão de display de pesquisa e de perfil funcionam corretamente', async () => {
    const { history } = renderWithRouter(<Header displaySearch />);

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();

    const profileButton = screen.getByTestId('profile-top-btn');
    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
});
