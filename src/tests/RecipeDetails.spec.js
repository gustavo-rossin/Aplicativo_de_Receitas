import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import { etonMessMock } from './helpers/mocks/oneMealMock';
import { aquaMarineDrink } from './helpers/mocks/oneDrinkMock';
import RecipeDetails from '../pages/RecipeDetails';

import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
const meals52791 = '/meals/52791';

describe('Testes da página de detalhes', () => {
  it('Teste de renderização rota /meals/id', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(etonMessMock),
    });

    renderWithRouter(
      <MealsProvider>
        <RecipeDetails />
      </MealsProvider>,
      meals52791,
    );
    const title = await screen.findByRole('heading', { name: /eton mess/i });
    expect(title).toBeInTheDocument();

    const ingredientsTitle = screen.getByRole('heading', { name: /ingredients/i,
    });
    expect(ingredientsTitle).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.innerHTML).toHaveLength(365);

    const category = screen.getByText(/dessert/i);
    expect(category).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toHaveTextContent(etonMessMock.meals[0].strInstructions);

    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('src', 'https://www.youtube.com//embed/43WgiNq54L8');

    const recommendationTitle = screen.getByRole('heading', { name: /recommendation/i,
    });

    expect(recommendationTitle).toBeInTheDocument();

    const startBtn = screen.getByRole('button', { name: /start recipe/i });
    expect(startBtn).toBeInTheDocument();
  });

  it('Teste dos renderização drinks/id', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(aquaMarineDrink),
    });

    renderWithRouter(
      <MealsProvider>
        <RecipeDetails />
      </MealsProvider>,
      '/drinks/178319',
    );

    const title = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(title).toBeInTheDocument();

    const ingredientsTitle = screen.getByRole('heading', { name: /ingredients/i,
    });
    expect(ingredientsTitle).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.innerHTML).toHaveLength(210);

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toHaveTextContent(aquaMarineDrink.drinks[0].strInstructions);

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toHaveTextContent('Alcoholic');
  });

  it('Teste dos botões share/favorite', async () => {
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
        <RecipeDetails />
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

  it('Teste is done, inProgress Meal', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(etonMessMock),
    });

    const object = [
      {
        id: '52791',
      },
    ];

    const progress = {
      meals: {
        52791: 'xablau',
      },
      drinks: {
        52791: 'oi',
      },
    };
    localStorage.setItem('doneRecipes', JSON.stringify(object));
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

    renderWithRouter(
      <MealsProvider>
        <RecipeDetails />
      </MealsProvider>,
      meals52791,
    );
    const title = await screen.findByRole('heading', { name: /eton mess/i });
    expect(title).toBeInTheDocument();
    const btnRedirect = screen.getByRole('button', {
      name: /continue recipe/i,
    });
    userEvent.click(btnRedirect);
  });

  it('Teste is done, inProgress Drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(aquaMarineDrink),
    });

    const object = [
      {
        id: '178319',
      },
    ];

    const progress = {
      meals: {
        178319: 'xablau',
      },
      drinks: {
        178319: 'oi',
      },
    };
    localStorage.setItem('doneRecipes', JSON.stringify(object));
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));

    renderWithRouter(
      <MealsProvider>
        <RecipeDetails />
      </MealsProvider>,
      '/drinks/178319',
    );
    const title = await screen.findByRole('heading', { name: /aquamarine/i });
    expect(title).toBeInTheDocument();
    const btnRedirect = screen.getByRole('button', {
      name: /continue recipe/i,
    });
    userEvent.click(btnRedirect);
  });

  it('Teste recomendações', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(etonMessMock),
    });
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksByIngredient),
    });

    renderWithRouter(
      <MealsProvider>
        <RecipeDetails />
      </MealsProvider>,
      meals52791,
    );
    await screen.findByText('Eton Mess');
    await screen.getByTestId('1-recommendation-card');
  });
});
