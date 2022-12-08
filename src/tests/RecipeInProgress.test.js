import { screen, waitFor } from '@testing-library/react';
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

  it('3) Teste dos botões share/favorite', async () => {
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

    userEvent.click(favoriteBtn);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favorites).toHaveLength(1);

    userEvent.click(favoriteBtn);

    const newFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(newFavorites).toHaveLength(0);
  });

  it('4) Teste do botão finalizar de meal', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(etonMessMock),
    });

    const { history } = renderWithRouter(
      <MealsProvider>
        <RecipeInProgress />
      </MealsProvider>,
      meals52791,
    );
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    const title = await screen.findByRole('heading', { name: /eton mess/i });
    expect(title).toBeInTheDocument();
    const strawberries = screen.getByTestId('0-ingredient-step');

    const cream = screen.getByTestId('1-ingredient-step');
    const meringue = screen.getByTestId('2-ingredient-step');
    const ginger = screen.getByTestId('3-ingredient-step');
    const mint = screen.getByTestId('4-ingredient-step');

    userEvent.click(strawberries);
    userEvent.click(cream);
    userEvent.click(meringue);
    userEvent.click(ginger);
    userEvent.click(mint);
    expect(strawberries).toHaveClass('linethrough');
    expect(cream).toHaveClass('linethrough');
    expect(meringue).toHaveClass('linethrough');
    expect(ginger).toHaveClass('linethrough');
    expect(mint).toHaveClass('linethrough');

    userEvent.click(finishRecipeBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  it('5) Teste do botão finalizar de drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(aquaMarineDrink),
    });

    const { history } = renderWithRouter(
      <MealsProvider>
        <RecipeInProgress />
      </MealsProvider>,
      drinks178319,
    );
    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    const title = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(title).toBeInTheDocument();

    const ingredient0 = screen.getByTestId('0-ingredient-step');
    const ingredient1 = screen.getByTestId('1-ingredient-step');
    const ingredient2 = screen.getByTestId('2-ingredient-step');

    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    expect(ingredient0).toHaveClass('linethrough');
    expect(ingredient1).toHaveClass('linethrough');
    expect(ingredient2).toHaveClass('linethrough');

    userEvent.click(finishRecipeBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });
});
