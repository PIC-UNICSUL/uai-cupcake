
// EM MANUTENÇÃO
import { beforeEach, describe, expect, it } from 'vitest'

import {
  OrderStatus,
  Product,
  productStatus,
  User,
  userType,
} from '@/@types/types'

import { useStore } from '.'

// Mock de localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = String(value)
    },
    clear() {
      store = {}
    },
    removeItem(key: string) {
      delete store[key]
    },
  }
})()

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('Store tests', () => {
  beforeEach(() => {
    useStore.setState({
      user: null,
      signed: false,
      cartItems: [],
      cartQuantity: 0,
      cartItemsTotal: 0,
      orders: [],
      products: [],
    })
    localStorage.clear()
  })

  // AUTH TESTS
  it('should initialize user from storage', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password_hash: '12345',
      name: 'Test User',
      user_id: '1',
      phone: '1234567890',
      created_at: new Date(),
    }

    localStorage.setItem(
      'uaiCupcakes:user_token',
      JSON.stringify({ email: mockUser.email }),
    )
    localStorage.setItem('uaiCupcakes:users_bd', JSON.stringify([mockUser]))

    const { initializeUserFromStorage } = useStore.getState()

    initializeUserFromStorage()

    const { user, signed } = useStore.getState()

    expect(user).toEqual(mockUser)
    expect(signed).toBe(true)
  })

  it('should sign in a valid user', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password_hash: '12345',
      name: 'Test User',
      user_id: '1',
      phone: '1234567890',
      created_at: new Date(),
    }

    localStorage.setItem('uaiCupcakes:users_bd', JSON.stringify([mockUser]))

    const { signin } = useStore.getState()

    signin(mockUser.email, mockUser.password_hash)

    const { user, signed } = useStore.getState()

    expect(user).toEqual(mockUser)
    expect(signed).toBe(true)
  })

  it('should fail to sign in with an incorrect password', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password_hash: '12345',
      name: 'Test User',
      user_id: '1',
      phone: '1234567890',
      created_at: new Date(),
    }

    localStorage.setItem('uaiCupcakes:users_bd', JSON.stringify([mockUser]))

    const { signin } = useStore.getState()
    const result = signin(mockUser.email, 'wrongpassword')

    expect(result).toBe('E-mail ou senha incorretos')
  })

  it('should sign up a new user and save to storage', () => {
    const mockUser: User = {
      email: 'newuser@example.com',
      password_hash: '12345',
      name: 'New User',
      phone: '1234567890',
      created_at: new Date(),
      user_id: '2',
    }

    const { signup } = useStore.getState()
    signup(mockUser)

    const savedUsers = JSON.parse(
      localStorage.getItem('uaiCupcakes:users_bd') || '[]',
    )
    expect(savedUsers.length).toBe(1)
    expect(savedUsers[0].email).toBe(mockUser.email)
  })

  // CART TESTS
  it('should add products to the cart and calculate totals', () => {
    const { addProductsToCart, calculateCartTotals } = useStore.getState()

    addProductsToCart([
      {
        product_id: 1,
        quantity: 2,
        created_at: new Date(),
        order_item_id: 1,
        order_id: 1,
      },
    ])
    calculateCartTotals()

    const { cartItems, cartQuantity, cartItemsTotal } = useStore.getState()

    expect(cartItems).toHaveLength(1)
    expect(cartQuantity).toBe(2) // Verificando a quantidade correta
    expect(cartItemsTotal).toBeGreaterThan(0)
  })

  it('should increase item quantity in the cart', () => {
    const { addProductsToCart, changeCartItemQuantity, calculateCartTotals } =
      useStore.getState()

    addProductsToCart([
      {
        product_id: 1,
        quantity: 1,
        created_at: new Date(),
        order_item_id: 1,
        order_id: 1,
      },
    ])
    changeCartItemQuantity(1, 'increase') // Supondo que 1 é o order_item_id
    calculateCartTotals()

    const { cartItemsTotal } = useStore.getState()
    expect(cartItemsTotal).toBeGreaterThan(0)
  })

  it('should remove an item from the cart', () => {
    const { addProductsToCart, removeCartItem } = useStore.getState()
    addProductsToCart([
      {
        product_id: 1,
        quantity: 1,
        created_at: new Date(),
        order_item_id: 1,
        order_id: 1,
      },
    ])
    removeCartItem(1) // Supondo que 1 é o order_item_id

    const { cartItems } = useStore.getState()
    expect(cartItems).toHaveLength(0)
  })

  // PRODUCTS TEST
  it('should add a new product', () => {
    const { addProduct, products } = useStore.getState()
    const newProduct: Product = {
      product_id: 123,
      name: 'Cupcake',
      price: 5.0,
      availability_status: productStatus.available,
      img: ' ',
      description: '',
      category: '',
    }
    addProduct(newProduct)

    const { products: updatedProducts } = useStore.getState()
    expect(updatedProducts).toContainEqual(newProduct)
  })

  it('should update a product availability status', () => {
    const { addProduct, updateAvailabilityStatus, products } =
      useStore.getState()

    const newProduct: Product = {
      product_id: 1,
      name: 'Cupcake',
      price: 5.0,
      availability_status: productStatus.available,
      img: ' ',
      description: '',
      category: '',
    }
    addProduct(newProduct)

    updateAvailabilityStatus(1, productStatus.unavailable) // Passando o ID correto
    const updatedProduct = products.find((product) => product.product_id === 1)

    expect(updatedProduct?.availability_status).toBe(productStatus.unavailable)
  })

  it('should remove a product', () => {
    const { addProduct, removeProduct } = useStore.getState()
    const productId = 1
    addProduct({
      name: 'Cupcake',
      price: 5.0,
      img: ' ',
      description: '',
      category: '',
    })

    removeProduct(productId)

    const { products: updatedProducts } = useStore.getState()
    expect(updatedProducts).not.toContainEqual(
      expect.objectContaining({ product_id: productId }),
    )
  })

  it('should update a product', () => {
    const { addProduct, updateProduct, products } = useStore.getState()
    const productId = 1
    addProduct({
      name: 'Cupcake',
      price: 5.0,
      img: ' ',
      description: '',
      category: '',
    })

    updateProduct({
      product_id: productId,
      name: 'Cupcake',
      price: 10.0,
      availability_status: productStatus.available,
      description: '',
      category: '',
    })

    const updatedProduct = products.find(
      (product) => product.product_id === productId,
    )

    expect(updatedProduct?.price).toBe(10.0)
  })

  // ORDERS TESTS
  it('should add a new order', () => {
    const { addOrder } = useStore.getState()
    const user: User = {
      user_id: 'user123',
      email: 'user@example.com',
      user_type: userType.customer,
      phone: '10203012000',
      password_hash: 'd',
      name: 'd',
      created_at: new Date(),
    }

    addOrder(
      user,
      [
        {
          order_item_id: 1,
          order_id: 1,
          product_id: 1,
          quantity: 2,
          created_at: new Date(),
        },
      ],
      10.0,
    )

    const { orders: updatedOrders } = useStore.getState()
    expect(updatedOrders).toHaveLength(1)
    expect(updatedOrders[0].user_id).toBe(user.user_id)
  })

  it('should update order status', () => {
    const { addOrder, updateOrderStatus, orders } = useStore.getState()
    const user: User = {
      user_id: 'user123',
      email: 'user@example.com',
      user_type: userType.customer,
      phone: '10203012000',
      password_hash: 'd',
      name: 'd',
      created_at: new Date(),
    }

    addOrder(
      user,
      [
        {
          order_item_id: 1,
          order_id: 1,
          product_id: 1,
          quantity: 2,
          created_at: new Date(),
        },
      ],
      10.0,
    )

    const orderId = orders[0].order_id
    updateOrderStatus(orderId, OrderStatus.ready)

    const updatedOrder = orders.find((order) => order.order_id === orderId)
    expect(updatedOrder?.status).toBe(OrderStatus.ready)
  })
})
