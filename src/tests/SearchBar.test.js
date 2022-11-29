import React from 'react';
import { renderWithRouter, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes para o Componente Search bar', () => {
  it('1) Verifica o que o usuário digitou', () => {
    renderWithRouter(<App />);
    const inputSearch = screen.getByTestId('search-input');
    // const inputButton = screen.getByTestId('exec-search-btn');
    userEvent.type(inputSearch, 'chicken');
    expect(inputSearch).toHaveValue('chicken');

    const inputAltText = screen.getByAltText('recipeImg');
    expect(inputAltText).toBeInTheDocument();
  });

  it('2) A search bar busca na api a informação de uma \'Three Fish Pie\' ', async () => {
    const mealMock = [
      {
        idMeal: 52882,
        strMeal: 'Three Fish Pie',
        strCategory: 'Seafood',
        strIngredient1: 'Potatoes',
        strIngredient2: 'Butter',
        strIngredient3: 'Milk',
        strIngredient4: 'Gruy\u00e8re',
        strIngredient5: 'Butter',
      },
    ];

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealMock),
    }));

    renderWithRouter(<App />);
    expect(global.fetch).toBeCalledTimes(0);
    // const inputIngredient = screen.getByTestId('ingredient-search-radio');
  });
});
