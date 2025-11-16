import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Header } from '../components/Header';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByText('kirana store')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderHeader();
    expect(screen.getByText('for merchants')).toBeInTheDocument();
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(screen.getByText('signup')).toBeInTheDocument();
  });

  it('renders cart button', () => {
    renderHeader();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });
});
