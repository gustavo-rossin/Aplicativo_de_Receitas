import React from 'react';
import { waitFor, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import MealsProvider from '../context/MealsProvider';
import mealMock, { mealBeefCategory } from './helpers/mocks/mealMock';
import drinkMock, { drinkOrdinaryCategory } from './helpers/mocks/drinkMock';
import { drinkCategories, mealsCategories } from './helpers/mocks/categoriesMock';
import Recipes from '../pages/Recipes';

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('testa a página Recipes', () => {
  test('se os botões de categoria são renderizados corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealMock),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealsCategories),
    });

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/meals',
    );

    const allButton = screen.getByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();
    await waitFor(() => {
      const categories = screen.getAllByTestId(/category-filter/);
      expect(categories).toHaveLength(6);
    });
  });

  test('se os botões de categoria funcionam corretamente em /meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealMock),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealsCategories),
    });

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/meals',
    );

    const beefCategory = await screen.findByTestId('Beef-category-filter');

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealBeefCategory),
    });

    userEvent.click(beefCategory);

    const beefAndMustardPie = await screen.findByText('Beef and Mustard Pie');
    expect(beefAndMustardPie).toBeInTheDocument();
    const beefAndOysterPie = await screen.findByText('Beef and Oyster pie');
    expect(beefAndOysterPie).toBeInTheDocument();

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealMock),
    });

    userEvent.click(beefCategory);

    const chickenHandi = await screen.findByText('Chicken Handi');
    expect(chickenHandi).toBeInTheDocument();
    expect(beefAndMustardPie).not.toBeInTheDocument();
  });

  test('se os botões de categoria funcionam corretamente em /drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkMock),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/drinks',
    );

    const ordinaryCategory = await screen.findByTestId('Ordinary Drink-category-filter');

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkOrdinaryCategory),
    });

    userEvent.click(ordinaryCategory);

    const icedTea = await screen.findByText('3-Mile Long Island Iced Tea');
    expect(icedTea).toBeInTheDocument();
    const fourTenGone = await screen.findByText('410 Gone');
    expect(fourTenGone).toBeInTheDocument();

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkMock),
    });

    userEvent.click(ordinaryCategory);

    const rumSour = await screen.findByText('Rum Sour');
    expect(rumSour).toBeInTheDocument();
    expect(icedTea).not.toBeInTheDocument();
  });

  test('se ao clicar em uma receita em /meals a pessoa é redirecionada a sua página de detalhes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealMock),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mealsCategories),
    });

    const { history } = renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/meals',
    );

    const chickenHandiImage = await screen.findByTestId('0-card-img');

    userEvent.click(chickenHandiImage);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52795'));
  });

  test('se ao clicar em uma receita em /drinks a pessoa é redirecionada a sua página de detalhes', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkMock),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(drinkCategories),
    });

    const { history } = renderWithRouter(
      <MealsProvider>
        <Recipes />
      </MealsProvider>,
      '/drinks',
    );

    const rumSourImg = await screen.findByTestId('0-card-img');

    userEvent.click(rumSourImg);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/52795'));
  });
});
