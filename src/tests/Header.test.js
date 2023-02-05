import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../service/renderWithRouter';
import App from '../App';

describe('Testa o componente <Header />:', () => {
  it('Verifica se atualiza para a rota \'/meal\'  e se os elementos de <Header /> são renderizados:', async () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/insira sua senha/i);
    userEvent.type(inputEmail, 'email@valido.com');
    userEvent.type(inputPass, 'senhaValida');

    const btnSubmit = screen.getByTestId('login-submit-btn');
    expect(btnSubmit).toBeEnabled();
    userEvent.click(btnSubmit);

    expect(await screen.findByRole('heading', { name: /meals/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /profile icon/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /search icon/i }));
    expect(await screen.findByRole('img', { name: /drink icon/i }));
    expect(await screen.findByRole('img', { name: /meal icon/i }));
  });
  it('Verifica se ao clicar no botão search os elementos de pesquisa aparecem:', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    userEvent.click(await screen.findByRole('img', { name: /search icon/i }));

    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });
  it('Verifica a funcionalidade do icone profile se redireciona par /profile:', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    userEvent.click(await screen.findByRole('img', { name: /profile icon/i }));

    waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });
});
