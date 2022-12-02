import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MealsProvider from '../context/MealsProvider';
import RecipeInProgress from '../pages/RecipeInProgress';
import { aquaMarineDrink } from './helpers/mocks/oneDrinkMock';
import { etonMessMock } from './helpers/mocks/oneMealMock';
import renderWithRouter from './helpers/renderWithRouter';

const meals52791 = '/meals/52791/in-progress';
const drinks178319 = '/drinks/178319/in-progress';

describe('Testes da página de \'Recipe in Progress \'', () => {
  it('1) Teste de renderização de \'meals/id/in-progress\'', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(etonMessMock),
    });

    renderWithRouter(
      <MealsProvider>
        <RecipeInProgress />
      </MealsProvider>,
      meals52791,
    );
    const title = await screen.findByRole('heading', { name: /eton mess/i });
    expect(title).toBeInTheDocument();
  });

  it('2) Teste de renderização de \'drinks/id/in-progress\'', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(aquaMarineDrink),
    });

    renderWithRouter(
      <MealsProvider>
        <RecipeInProgress />
      </MealsProvider>,
      drinks178319,
    );

    const title = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(title).toBeInTheDocument();
  });

  it('3) Teste dos botões share/favorite/finalizar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(etonMessMock),
    });

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => 'copy',
      },
    });

    renderWithRouter(
      <MealsProvider>
        <RecipeInProgress />
      </MealsProvider>,
      meals52791,
    );
    const title = await screen.findByRole('heading', { name: /eton mess/i });
    expect(title).toBeInTheDocument();
    const shareBtn = screen.getByRole('button', { name: /share/i });
    userEvent.click(shareBtn);
    screen.getByText('Link copied!');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishRecipeBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon');

    userEvent.click(favoriteBtn);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteBtn).toHaveAttribute('src', 'blackHeartIcon');
    expect(favorites).toHaveLength(1);

    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', 'whiteHeartIcon');

    const newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newFavorites).toHaveLength(0);
  });
});
