import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../service/renderWithRouter';
import Meals from '../pages/Meals';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import meals from '../../cypress/mocks/meals';
import firstLetter from '../mocks/FirstLetter';

describe('Teta o componente <SearchBar />:', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('verifica se um alerta é disparado caso não encontre a pesquisa:', async () => {
    // Renderizar o componente e faz um mock
    const mock = jest.spyOn(global, 'alert').mockImplementation((message) => message);

    renderWithRouter(<Meals />);

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));

    const fourCharacters = 'cake';

    // Resgatar o input
    const inputSearch = screen.getByRole('textbox');
    const inuptFisrtLetter = screen.getByDisplayValue(/first-letter/i);
    const btn = screen.getByRole('button', { name: /buscar/i });

    // Simular a escrita nele e esperar que tenha o value escrito, nao esquece de fazer contraprova
    userEvent.click(inuptFisrtLetter);
    userEvent.type(inputSearch, fourCharacters);

    userEvent.click(btn);
    expect(mock).toHaveBeenCalled();
  });
  it('Verifica se é possivel escrever no input de pesquisa:', () => {
    // Renderizar o componente
    renderWithRouter(<Meals />);
    const exampleSearch = 'anything';
    userEvent.click(screen.getByRole('img', { name: /search icon/i }));
    // Resgatar o input
    const inputSearch = screen.getByRole('textbox');
    // Simular a escrita nele e esperar que tenha o value escrito, nao esquece de fazer contraprova
    userEvent.type(inputSearch, exampleSearch);
    expect(inputSearch.value).toContain(exampleSearch);
  });
  it('Verifica se é possivel selecionar os input do tipo radio', () => {
    // Renderizar o componente
    renderWithRouter(<Meals />);
    userEvent.click(screen.getByRole('img', { name: /search icon/i }));
    // Acessar os elementos
    const ingredientOption = screen.getByTestId('ingredient-search-radio');
    expect(ingredientOption.checked).toBe(true);

    const nameOption = screen.getByTestId('name-search-radio');
    userEvent.click(nameOption);
    expect(nameOption.checked).toBe(true);

    const flOption = screen.getByTestId('first-letter-search-radio');
    userEvent.click(flOption);
    expect(flOption.checked).toBe(true);
  });
  it('Verifica se é pssivel fazer a pesquisa com ingredientes', async () => {
    // Renderizar o componente
    renderWithRouter(<Meals />);

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));

    const exampleSearch = 'egg';

    // Resgatar o input
    const inputSearch = screen.getByRole('textbox');
    const inputOption = screen.getByText(/ingredient:/i);
    const btn = screen.getByRole('button', { name: /buscar/i });

    // Simular a escrita nele e esperar que tenha o value escrito, nao esquece de fazer contraprova
    userEvent.click(inputOption);
    userEvent.type(inputSearch, exampleSearch);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsByIngredient),
    });

    userEvent.click(btn);

    const element = await screen.findByRole('img', { name: /Brown Stew Chicken/i });

    expect(element).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Verifica se é pssivel fazer a pesquisa com nome', async () => {
    // Renderizar o componente
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(<Meals />);

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));

    const exampleSearch = 'anything';

    // Resgatar o input
    const inputSearch = screen.getByRole('textbox');
    const inputOption = screen.getByTestId('name-search-radio');
    const btn = screen.getByRole('button', { name: /buscar/i });

    // Simular a escrita nele e esperar que tenha o value escrito, nao esquece de fazer contraprova
    userEvent.click(inputOption);
    userEvent.type(inputSearch, exampleSearch);
    userEvent.click(btn);

    const element = await screen.findByRole('img', { name: /Pancakes/i });

    expect(element).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(5);
  });
  it('Verifica se é pssivel fazer a pesquisa com a primeira letra', async () => {
    // Renderizar o componente
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(firstLetter),
    });
    renderWithRouter(<Meals />);

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));

    const exampleSearch = 'a';

    // Resgatar o input
    const inputSearch = screen.getByRole('textbox');
    const inputOption = screen.getByTestId('first-letter-search-radio');
    const btn = screen.getByRole('button', { name: /buscar/i });

    // Simular a escrita nele e esperar que tenha o value escrito, nao esquece de fazer contraprova
    userEvent.click(inputOption);
    userEvent.type(inputSearch, exampleSearch);
    userEvent.click(btn);

    const element = await screen.findByRole('img', { name: /Apple Frangipan Tart/i });

    expect(element).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(5);
  });
});
