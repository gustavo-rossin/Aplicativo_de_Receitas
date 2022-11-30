import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes do componente Footer', () => {
  it('Teste de integração', () => {
    renderWithRouter(<Footer />);
    const drinkIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinkIcon).toBeInTheDocument();
    const mealIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealIcon).toBeInTheDocument();

    userEvent.click(drinkIcon);
    userEvent.click(mealIcon);
  });
});
