import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { CartState, OrderItems, Product } from '@/@types/types'
import { useStore } from '@/store'

// Chaves de armazenamento
const CART_ITEMS_STORAGE_KEY_PREFIX = 'uaiCupcakes:cartItems_'

const localStorageService = {
  saveCartItems: (email: string, cartItems: OrderItems[]) => {
    localStorage.setItem(
      `${CART_ITEMS_STORAGE_KEY_PREFIX}${email}`,
      JSON.stringify(cartItems),
    )
  },
  loadCartItems: (email: string): OrderItems[] => {
    const storedItems = localStorage.getItem(
      `${CART_ITEMS_STORAGE_KEY_PREFIX}${email}`,
    )
    return storedItems ? JSON.parse(storedItems) : []
  },
  removeCartItems: (email: string) => {
    localStorage.removeItem(`${CART_ITEMS_STORAGE_KEY_PREFIX}${email}`)
  },
}

// Função para calcular totais do carrinho
const calculateTotals = (cartItems: OrderItems[], products: Product[]) => {
  const cartQuantity = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  )
  const cartItemsTotal = cartItems.reduce((total, item) => {
    const product = products.find((p) => p.product_id === item.product_id)
    if (!product) {
      console.warn(`Produto não encontrado para o ID ${item.product_id}`)
      return total
    }
    return total + product.price * item.quantity
  }, 0)

  return { cartQuantity, cartItemsTotal }
}

export const createCartSlice: StateCreator<
  CartState,
  [],
  [['zustand/immer', never]]
> = immer((set, get) => ({
  cartItems: [],
  cartQuantity: 0,
  cartItemsTotal: 0,
  

  calculateCartTotals: () => {
    const { cartItems } = get()
    const products = useStore.getState().products
    const { cartQuantity, cartItemsTotal } = calculateTotals(
      cartItems,
      products,
    )
    set(() => ({
      cartQuantity,
      cartItemsTotal,
    }))
  },

  loadCartForUser: (email: string) => {
    const storedItems = localStorageService.loadCartItems(email)
    set(() => ({ cartItems: storedItems }))
    get().calculateCartTotals()
  },

  addProductsToCart: (newItems: OrderItems[], email: string) => {
    set((state) => {
      newItems.forEach((newItem) => {
        const existingItem = state.cartItems.find(
          (item) => item.product_id === newItem.product_id,
        )
        if (existingItem) {
          existingItem.quantity += newItem.quantity
        } else {
          state.cartItems.push(newItem)
        }
      })
    })
    get().calculateCartTotals() // Atualiza totais após adição
    get().persistCartItems(email)
  },

  changeCartItemQuantity: (
    orderItemId: number,
    type: 'increase' | 'decrease',
    email: string
  ) => {
    set((state) => {
      const item = state.cartItems.find(
        (item) => item.order_item_id === orderItemId,
      )
      if (item) {
        item.quantity = Math.max(
          item.quantity + (type === 'increase' ? 1 : -1),
          0,
        )
      }
    })
    get().calculateCartTotals()
    get().persistCartItems(email)
  },

  removeCartItem: (orderItemId: number, email: string) => {
    set((state) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.order_item_id !== orderItemId,
      )
    })
    get().calculateCartTotals() // Atualiza totais após remoção
    get().persistCartItems(email)
  },

  cleanCart: (email: string) => {
    set(() => ({
      cartItems: [],
      cartQuantity: 0,
      cartItemsTotal: 0,
    }))
    localStorageService.removeCartItems(email)
  },

  setCartItemsFromStorage: (email: string) => {
    const storedItems = localStorageService.loadCartItems(email)
    set(() => ({ cartItems: storedItems }))
    get().calculateCartTotals()
  },

  persistCartItems: (email: string) => {
    const { cartItems } = get()
    localStorageService.saveCartItems(email, cartItems)
  },
}))
