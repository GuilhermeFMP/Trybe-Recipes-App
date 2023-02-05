import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da página de Login', () => {
  const email = 'email-input';
  const password = 'password-input';
  const button = 'login-submit-btn';
  const emailTest = 'test@test.com';
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Tela de Login possui input de email e senha', () => {
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const submitButton = screen.getByTestId(button);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('Tela de Login possui botão de submit', () => {
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(submitButton).toBeInTheDocument();
  });
  it('Botão submit inicia desativado', () => {
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(submitButton).toBeDisabled();
  });
  it('Botão submit é ativado ao preencher corretamente os inputs', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });

    userEvent.type(emailInput, 'teste@test.com');
    expect(submitButton).toBeDisabled();

    userEvent.type(passwordInput, '1234567');
    expect(submitButton).toBeEnabled();
  });
  it('Verifica se é possível digitar o email', () => {
    const exampleEmail = emailTest;
    const emailInput = screen.getByTestId(email);

    userEvent.type(emailInput, exampleEmail);
    expect(emailInput).toHaveProperty('value', exampleEmail);
  });
  it('Verifica se é possível digitar a senha', () => {
    const examplePassword = '1234567';
    const passwordInput = screen.getByTestId(email);

    userEvent.type(passwordInput, examplePassword);
    expect(passwordInput).toHaveProperty('value', examplePassword);
  });
});
