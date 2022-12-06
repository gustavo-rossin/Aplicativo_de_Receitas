import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa a pagina Favoritos', () => {
  const mealName = 'Breakfast Potatoes';
  const imageLink = 'https://www.themealdb.com/images/media/meals/1550441882.jpg';
  global.execCommand = jest.fn();
  beforeEach(() => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52965',
        type: 'meal',
        nationality: 'Canadian',
        category: 'Breakfast',
        alcoholicOrNot: '',
        name: mealName,
        image: imageLink,
      },
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '53060',
        type: 'meal',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      },
      {
        id: '17222',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'A1',
        image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      },
    ]));
  });

  const idFilter = 'filter-by-drink-btn';
  const idName = '0-horizontal-name';
  const idImage = '0-horizontal-image';
  const idSecond = '1-horizontal-name';
  const idThird = '3-horizontal-name';

  it('Testa se os botões estão presentes ná pagina', () => {
    renderWithRouter(<FavoriteRecipes />);
    const filter = screen.getByTestId('filter-by-all-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const drinkFilter = screen.getByTestId(idFilter);
    const firstElementImage = screen.getByTestId(idImage);
    const firstElementTopText = screen.getByTestId('0-horizontal-top-text');
    const firstElementName = screen.getByTestId(idName);
    const firstElementShare = screen.getByTestId('0-horizontal-share-btn');
    const firstElementBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const secondElementImage = screen.getByTestId('1-horizontal-image');
    const secondElementTopText = screen.getByTestId('1-horizontal-top-text');
    const secondElementName = screen.getByTestId(idSecond);
    const secondElementShare = screen.getByTestId('1-horizontal-share-btn');
    const secondElementBtn = screen.getByTestId('1-horizontal-favorite-btn');

    expect(filter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(firstElementImage).toBeInTheDocument();
    expect(firstElementName).toBeInTheDocument();
    expect(firstElementBtn).toBeInTheDocument();
    expect(firstElementShare).toBeInTheDocument();
    expect(secondElementName).toBeInTheDocument();
    expect(secondElementImage).toBeInTheDocument();
    expect(secondElementBtn).toBeInTheDocument();
    expect(secondElementShare).toBeInTheDocument();
    expect(firstElementTopText).toBeInTheDocument();
    expect(secondElementTopText).toBeInTheDocument();
  });
  it('Testa que caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, um botão de compartilhar e um de "desfavoritar"', () => {
    renderWithRouter(<FavoriteRecipes />);

    const firstElementImage = screen.getByTestId(idImage);
    const firstElementTopText = screen.getByTestId('0-horizontal-top-text');
    const firstElementName = screen.getByTestId(idName);
    const firstElementShare = screen.getByTestId('0-horizontal-share-btn');
    const firstElementBtn = screen.getByTestId('0-horizontal-favorite-btn');

    expect(firstElementImage).toHaveProperty('src', imageLink);
    expect(firstElementName).toHaveTextContent(mealName);
    expect(firstElementTopText).toHaveTextContent('Canadian - Breakfast');
    expect(firstElementBtn.innerHTML).toBe('<img src="blackHeartIcon.svg" alt="blackHeart" name="Breakfast Potatoes">');
    expect(firstElementBtn).toHaveAttribute('src', 'blackHeartIcon');
    expect(firstElementShare).toHaveAttribute('src', 'shareIcon');
    expect(firstElementShare.innerHTML).toBe('<img src="shareIcon.svg" alt="share">');
  });
  it('Testa que caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar"', () => {
    renderWithRouter(<FavoriteRecipes />);

    const drinkElementImage = screen.getByTestId('3-horizontal-image');
    const drinkElementTopText = screen.getByTestId('3-horizontal-top-text');
    const drinkElementName = screen.getByTestId(idThird);
    const drinkElementShare = screen.getByTestId('3-horizontal-share-btn');
    const drinkElementBtn = screen.getByTestId('3-horizontal-favorite-btn');
    expect(drinkElementImage).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg');
    expect(drinkElementTopText).toHaveTextContent('Alcoholic');
    expect(drinkElementName).toHaveTextContent('A1');
    expect(drinkElementBtn.innerHTML).toBe('<img src="blackHeartIcon.svg" alt="blackHeart" name="A1">');
    expect(drinkElementBtn).toHaveAttribute('src', 'blackHeartIcon');
    expect(drinkElementShare).toHaveAttribute('src', 'shareIcon');
    expect(drinkElementShare.innerHTML).toBe('<img src="shareIcon.svg" alt="share">');
  });
  it('Testa que botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', () => {
    let clipboardData;
    global.navigator.clipboard = {
      writeText: jest.fn((data) => { clipboardData = data; }),
    };
    renderWithRouter(<FavoriteRecipes />);
    const secondElementShare = screen.getByTestId('1-horizontal-share-btn');
    const drinkElementShare = screen.getByTestId('3-horizontal-share-btn');
    userEvent.click(secondElementShare);
    expect(clipboardData).toContain('http://localhost:3000/meals/52977');
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    userEvent.click(drinkElementShare);
    expect(clipboardData).toContain('http://localhost:3000/drinks/17222');
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  it('Testa que botão de desfavoritar deve remover a receita da lista de receitas favoritas do `localStorage` e da tela', () => {
    renderWithRouter(<FavoriteRecipes />);
    const drinkElementBtn = screen.getByTestId('3-horizontal-favorite-btn');
    const drinkElementName = screen.getByTestId(idThird);
    userEvent.click(drinkElementBtn);
    expect(drinkElementName).not.toBeInTheDocument();
    const localStorage = JSON.parse(global.localStorage.getItem('favoriteRecipes'));
    expect(localStorage).toEqual([{ alcoholicOrNot: '', category: 'Breakfast', id: '52965', image: 'https://www.themealdb.com/images/media/meals/1550441882.jpg', name: 'Breakfast Potatoes', nationality: 'Canadian', type: 'meal' }, { alcoholicOrNot: '', category: 'Side', id: '52977', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', name: 'Corba', nationality: 'Turkish', type: 'meal' }, { alcoholicOrNot: '', category: 'Side', id: '53060', image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg', name: 'Burek', nationality: 'Croatian', type: 'meal' }]);
  });
  it('Testa o botão que filtram as receitas por comida', () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMeal);
    const firstElementName = screen.getByTestId(idName);
    const secondElementName = screen.getByTestId(idSecond);
    expect(firstElementName).toBeInTheDocument();
    expect(secondElementName).toBeInTheDocument();
  });
  it('Testa o botão que filtram as receitas por bebida', () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterDrink = screen.getByTestId(idFilter);
    const drinkElementName = screen.getByTestId(idThird);
    userEvent.click(filterDrink);
    expect(drinkElementName).toBeInTheDocument();
    expect(drinkElementName).toHaveTextContent('A1');
  });
  it('Ao clicar no botão "All" o filtro deve ser removido', () => {
    renderWithRouter(<FavoriteRecipes />);
    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrink);
    userEvent.click(filterAll);
    const drinkElementName = screen.getByTestId(idThird);
    const firstElementName = screen.getByTestId(idName);
    const secondElementName = screen.getByTestId('1-horizontal-name');
    expect(firstElementName).toBeInTheDocument();
    expect(secondElementName).toBeInTheDocument();
    expect(drinkElementName).toBeInTheDocument();
    expect(drinkElementName).toHaveTextContent('A1');
  });
  it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const firstElementImage = screen.getByTestId(idImage);
    userEvent.click(firstElementImage);
    expect(history.location.pathname).toEqual('/meals/52965');
  });
  it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const firstElementName = screen.getByTestId(idName);
    userEvent.click(firstElementName);
    expect(history.location.pathname).toEqual('/meals/52965');
  });
});
