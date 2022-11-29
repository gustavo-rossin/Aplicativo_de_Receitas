import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do componente Footer', () => {
  it('Teste de integração', () => {
    renderWithRouter(<Recipes />);
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();
    const mealIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);
    userEvent.click(mealIcon);
  });
});
