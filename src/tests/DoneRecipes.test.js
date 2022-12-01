import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import doneRecipesMock from './helpers/mocks/doneRecipesMock';

beforeEach(() => localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock)));

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  cleanup();
});

describe('testa a página Done Recipes', () => {
  test('se os componentes estão renderizados corretamente', () => {
    renderWithRouter(<DoneRecipes />);

    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    expect(filterAllButton).toBeInTheDocument();

    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    expect(filterMealButton).toBeInTheDocument();

    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrinkButton).toBeInTheDocument();

    const recipesImages = screen.getAllByTestId(/horizontal-image/);
    recipesImages.forEach((image) => expect(image).toBeInTheDocument());

    const recipesNames = screen.getAllByTestId(/horizontal-name/);
    recipesNames.forEach((name) => expect(name).toBeInTheDocument());

    const recipesTopText = screen.getAllByTestId(/horizontal-top-text/);
    recipesTopText.forEach((topText) => expect(topText).toBeInTheDocument());

    expect(recipesTopText[0]).toHaveTextContent('Italian - Vegetarian');
    expect(recipesTopText[1]).toHaveTextContent('Alcoholic');

    const recipesDoneDates = screen.getAllByTestId(/horizontal-done-date/);
    recipesDoneDates.forEach((doneDate) => expect(doneDate).toBeInTheDocument());

    const recipesTags = screen.getAllByTestId(/horizontal-tag/);
    recipesTags.forEach((tag) => expect(tag).toBeInTheDocument());

    const recipesShareButton = screen.getAllByTestId(/horizontal-share-btn/);
    recipesShareButton.forEach((button) => expect(button).toBeInTheDocument());
  });

  test('se os botões de filtro funcionam corretamente', async () => {
    renderWithRouter(<DoneRecipes />);

    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMealButton);

    expect(screen.queryByText(/Arrabiata/)).toBeInTheDocument();
    expect(screen.queryByText(/Aquamarine/)).not.toBeInTheDocument();

    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filterDrinkButton);

    expect(screen.queryByText(/Arrabiata/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Aquamarine/)).toBeInTheDocument();

    const filterAllButton = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterAllButton);

    expect(screen.queryByText(/Arrabiata/)).toBeInTheDocument();
    expect(screen.queryByText(/Aquamarine/)).toBeInTheDocument();
  });

  test('se ao clicar na imagem da receita, redireciona para página de detalhes da receita', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    const arrabiataImage = screen.getByTestId('0-horizontal-image');
    userEvent.click(arrabiataImage);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('se ao clicar no nome da receita, redireciona para página de detalhes da receita', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    const arrabiataName = screen.getByTestId('0-horizontal-name');
    userEvent.click(arrabiataName);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('se ao clicar no botão de compartilhar, a url é copiada e é mostrada a mensagem "Link copied!"', async () => {
    let clipboardData;
    global.navigator.clipboard = {
      writeText: jest.fn((data) => { clipboardData = data; }),
    };

    renderWithRouter(<DoneRecipes />);

    const arrabiataShareButton = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(arrabiataShareButton);

    const linkCopiedMessage = screen.getByText('Link copied!');

    expect(linkCopiedMessage).toBeInTheDocument();

    await waitFor(
      () => expect(linkCopiedMessage).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    expect(clipboardData).toContain('meals/52771');
  });

  test('localStorage vazio para cobertura de testes', () => {
    localStorage.clear();

    renderWithRouter(<DoneRecipes />);
  });
});
