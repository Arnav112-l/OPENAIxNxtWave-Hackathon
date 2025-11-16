import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../contexts/CartContext';
import { Product } from '../types';

describe('Cart Context', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('adds items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: 'test-1',
      name: 'Test Product',
      nameHi: 'टेस्ट उत्पाद',
      price: 100,
      unit: '1kg',
      category: 'staples',
      stock: 50,
      inStock: true,
      shopId: 'shop-1',
      image: '',
    };

    act(() => {
      result.current.addToCart(testProduct);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].productId).toBe('test-1');
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('removes items from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: 'test-1',
      name: 'Test Product',
      nameHi: 'टेस्ट उत्पाद',
      price: 100,
      unit: '1kg',
      category: 'staples',
      stock: 50,
      inStock: true,
      shopId: 'shop-1',
      image: '',
    };

    act(() => {
      result.current.addToCart(testProduct);
    });

    act(() => {
      result.current.updateQuantity('test-1', 0);
    });

    expect(result.current.cart.length).toBe(0);
  });

  it('calculates total price correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product1: Product = {
      id: 'test-1',
      name: 'Product 1',
      nameHi: 'उत्पाद 1',
      price: 100,
      unit: '1kg',
      category: 'staples',
      stock: 50,
      inStock: true,
      shopId: 'shop-1',
      image: '',
    };

    const product2: Product = {
      id: 'test-2',
      name: 'Product 2',
      nameHi: 'उत्पाद 2',
      price: 50,
      unit: '500g',
      category: 'dairy',
      stock: 30,
      inStock: true,
      shopId: 'shop-1',
      image: '',
    };

    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
    });

    expect(result.current.getTotalPrice()).toBe(150);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const testProduct: Product = {
      id: 'test-1',
      name: 'Test Product',
      nameHi: 'टेस्ट उत्पाद',
      price: 100,
      unit: '1kg',
      category: 'staples',
      stock: 50,
      inStock: true,
      shopId: 'shop-1',
      image: '',
    };

    act(() => {
      result.current.addToCart(testProduct);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart.length).toBe(0);
  });
});
