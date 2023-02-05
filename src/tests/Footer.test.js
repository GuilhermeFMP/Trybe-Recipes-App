import { screen } from '@testing-library/react';
import renderWithRouter from '../service/renderWithRouter';
import Footer from '../components/Footer';

describe('Testes do componente Footer', () => {
  beforeEach(() => {
    renderWithRouter(<Footer />);
  });
  it('Existe um componente footer', () => {
    const divFooter = screen.getByTestId('footer');
    expect(divFooter).toBeInTheDocument();
  });
  it('São renderizados duas imagens de ícones', () => {
    const iconDrink = screen.getByRole('img', { name: /drink icon/i });
    expect(iconDrink).toBeInTheDocument();
    const iconMeals = screen.getByRole('img', { name: /meal icon/i });
    expect(iconMeals).toBeInTheDocument();
  });
  it('Se há um ícone de drink', () => {
    const iconDrink = screen.getByAltText(/drink icon/i);
    expect(iconDrink).toBeInTheDocument();
  });
  it('Se há um ícone de meals', () => {
    const iconMeals = screen.getByAltText(/meal icon/i);
    expect(iconMeals).toBeInTheDocument();
  });
});
