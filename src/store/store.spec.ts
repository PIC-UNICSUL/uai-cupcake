import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '.';
import { User, CartItem, OrderStatus } from '@/@types/types';

// Mock de localStorage
const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = String(value);
      },
      clear() {
        console.log('Clearing localStorage');
        store = {};
      },
      removeItem(key: string) {
        console.log(`Removing item from localStorage: ${key}`);
        delete store[key];
      },
    };
})();
  
Object.defineProperty(global, 'localStorage', { value: localStorageMock });


describe('Store tests', () => {
  beforeEach(() => {
    useStore.setState({
      user: null,
      signed: false,
      cartItems: [],
      cartQuantity: 0,
      cartItemsTotal: 0,
      orders: [],
    });
    localStorage.clear();
  });

//   AUTH TESTS
  it('should initialize user from storage', () => {
    const mockUser = { email: 'test@example.com', password: '12345', name: 'Test User' };
    
    localStorage.setItem('uaiCupcakes:user_token', JSON.stringify({ email: mockUser.email }));
    localStorage.setItem('uaiCupcakes:users_bd', JSON.stringify([mockUser]));

    const { initializeUserFromStorage } = useStore.getState();
    
    initializeUserFromStorage();

    const { user, signed } = useStore.getState()

    expect(user).toEqual(mockUser);
    expect(signed).toBe(true);
  });

  it('should sign in a valid user', () => {
    const mockUser: User = { email: 'test@example.com', password: '12345', name: 'Test User', id: '1' };
    
    localStorage.setItem('uaiCupcakes:users_bd', JSON.stringify([mockUser]));
    
    const { signin } = useStore.getState();

    signin(mockUser.email, mockUser.password);

    const { user, signed } = useStore.getState();

    expect(user).toEqual(mockUser);
    expect(signed).toBe(true);
  });

  it('should fail to sign in with an incorrect password', () => {
    const mockUser: User = { email: 'test@example.com', password: '12345', name: 'Test User', id: '1' };
    
    localStorage.setItem('uaiCupcakes:users_bd', JSON.stringify([mockUser]));

    const { signin } = useStore.getState();
    const result = signin(mockUser.email, 'wrongpassword');

    expect(result).toBe('E-mail ou senha incorretos');
  });

  it('should sign up a new user and save to storage', () => {
    const mockUser: User = { email: 'newuser@example.com', password: '12345', name: 'New User' };

    const { signup } = useStore.getState();
    signup(mockUser);

    const savedUsers = JSON.parse(localStorage.getItem('uaiCupcakes:users_bd') || '[]');
    expect(savedUsers.length).toBe(1);
    expect(savedUsers[0].email).toBe(mockUser.email);
  });

// CART TESTS
  it('should add cupcakes to the cart and calculate totals', () => {
    const mockCupcake: CartItem = { id: 1, name: 'Chocolate Cupcake', price: 5, quantity: 2, categories: ['Doce', 'Tradicional'], description: "Um delicioso cupcake", img: "https://example.com/cupcake.jpg" };

    const { addCupcakesToCart } = useStore.getState();
    addCupcakesToCart([mockCupcake]);
    
    const { cartItems, cartItemsTotal } = useStore.getState();

    expect(cartItems.length).toBe(1);
    expect(cartItemsTotal).toBe(10);
  });

  it('should increase cart item quantity', () => {
    const mockCupcake: CartItem = { id: 1, name: 'Chocolate Cupcake', price: 5, quantity: 2, categories: ['Doce', 'Tradicional'], description: "Um delicioso cupcake", img: "https://example.com/cupcake.jpg" };

    const { addCupcakesToCart, changeCartItemQuantity, cartItems } = useStore.getState();
    addCupcakesToCart([mockCupcake]);
    changeCartItemQuantity(mockCupcake.id, 'increase');

    expect(cartItems[0].quantity).toBe(3);
  });

  it('should decrease cart item quantity', () => {
    const mockCupcake: CartItem = { id: 1, name: 'Chocolate Cupcake', price: 5, quantity: 2, categories: ['Doce', 'Tradicional'], description: "Um delicioso cupcake", img: "https://example.com/cupcake.jpg" };

    const { addCupcakesToCart, changeCartItemQuantity, cartItems } = useStore.getState();
    addCupcakesToCart([mockCupcake]);
    changeCartItemQuantity(mockCupcake.id, 'decrease');

    expect(cartItems[0].quantity).toBe(1);
  });

  it('should remove a cart item', () => {
    const mockCupcake: CartItem = { id: 1, name: 'Chocolate Cupcake', price: 5, quantity: 2, categories: ['Doce', 'Tradicional'], description: "Um delicioso cupcake", img: "https://example.com/cupcake.jpg" };

    const { addCupcakesToCart, removeCartItem, cartItems } = useStore.getState();
    addCupcakesToCart([mockCupcake]);
    removeCartItem(mockCupcake.id);

    expect(cartItems.length).toBe(0);
  });

  it('should clean the cart', () => {
    const mockCupcake: CartItem = { id: 1, name: 'Chocolate Cupcake', price: 5, quantity: 2, categories: ['Doce', 'Tradicional'], description: "Um delicioso cupcake", img: "https://example.com/cupcake.jpg" };

    const { addCupcakesToCart, cleanCart } = useStore.getState();
    addCupcakesToCart([mockCupcake]);
    cleanCart();
    
    const { cartItems } = useStore.getState();
    
    expect(cartItems.length).toBe(0);
  });

  // ORDERS TESTS
  it('should add a new order and save to localStorage', () => {
    const mockUser: User = { email: 'test@example.com', password: '12345', name: 'Test User', id: '1' };
    const mockCupcake: CartItem = { id: 1, name: 'Chocolate Cupcake', price: 5, quantity: 2, categories: ['Doce', 'Tradicional'], description: "Um delicioso cupcake", img: "https://example.com/cupcake.jpg" };

    const { addOrder } = useStore.getState();
    addOrder(mockUser, [mockCupcake], 10);
    
    const { orders } = useStore.getState();

    expect(orders.length).toBe(1);
    const savedOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    expect(savedOrders.length).toBe(1);
    expect(savedOrders[0].userEmail).toBe(mockUser.email);
  });

  it('should fetch user-specific orders', () => {
    const mockOrder = {
      orderId: 1,
      items: [],
      total: 100,
      date: new Date().toISOString(),
      status: OrderStatus.pending,
      userEmail: 'test@example.com',
      userName: 'Test User',
      userPhone: '123456789',
    };

    localStorage.setItem('all_orders', JSON.stringify([mockOrder]));

    const { fetchUserOrders } = useStore.getState();
    fetchUserOrders(mockOrder.userEmail);

    const { orders } = useStore.getState();

    expect(orders.length).toBe(1);
    expect(orders[0].userEmail).toBe(mockOrder.userEmail);
  });

  it('should update order status', () => {
    const mockOrder = {
      orderId: 1,
      items: [],
      total: 100,
      date: new Date().toISOString(),
      status: OrderStatus.pending,
      userEmail: 'test@example.com',
    };
    localStorage.setItem('all_orders', JSON.stringify([mockOrder]));

    const { updateOrderStatus } = useStore.getState();
    updateOrderStatus(1, OrderStatus.delivered);

    const { orders } = useStore.getState();

    expect(orders[0].status).toBe(OrderStatus.delivered);
    const savedOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    expect(savedOrders[0].status).toBe(OrderStatus.delivered);
  });
});