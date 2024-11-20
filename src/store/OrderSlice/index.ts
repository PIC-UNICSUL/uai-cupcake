import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
  Order,
  OrderItems,
  OrdersState,
  OrderStatus,
  User,
} from '@/@types/types'
import { useStore } from '@/store'

const ALL_ORDERS_STORAGE_KEY = 'all_orders'
export const ALL_ORDER_ITEMS_STORAGE_KEY = 'all_order_items'

const getAllOrders = (): Order[] => {
  const savedOrders = localStorage.getItem(ALL_ORDERS_STORAGE_KEY)
  return savedOrders ? JSON.parse(savedOrders) : []
}

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(ALL_ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

const generateUniqueOrderId = (): number => {
  let newOrderId: number
  const allOrders = getAllOrders()

  do {
    newOrderId = Math.floor(Math.random() * 1001)
  } while (allOrders.some((order) => order.order_id === newOrderId))

  return newOrderId
}

export const createOrderSlice: StateCreator<
  OrdersState,
  [],
  [['zustand/immer', never]]
> = immer((set) => ({
  orders: [],

  fetchUserOrders: (userEmail: string) => {
    if (!userEmail) {
      console.warn('Email do usuário está indefinido ou vazio')
      return
    }

    const allUsers = JSON.parse(
      localStorage.getItem('uaiCupcakes:users_bd') || '[]',
    )
    // console.log('Usuários carregados do localStorage:', allUsers);

    const user = allUsers.find((user: User) => user.email === userEmail)

    if (!user) {
      console.warn(`Nenhum usuário encontrado com o email: ${userEmail}`)
      return
    }

    const userOrders = getAllOrders().filter(
      (order) => order.user_id === user.user_id,
    )
    set({ orders: userOrders })
  },

  fetchAllOrders: () => {
    set({ orders: getAllOrders() })
  },

  addOrder: (user: User, orderItems: OrderItems[], total: number) => {
    const orderId = generateUniqueOrderId()

    const newOrder: Order = {
      order_id: orderId,
      price: total,
      status: OrderStatus.pending,
      user_id: user.user_id || '',
      created_at: new Date(),
    }

    const allOrders = getAllOrders()
    saveOrders([...allOrders, newOrder])

    const newOrderItems = orderItems.map((item) => ({
      ...item,
      order_id: orderId,
      created_at: new Date(),
    }))
    const existingOrderItems = JSON.parse(
      localStorage.getItem(ALL_ORDER_ITEMS_STORAGE_KEY) || '[]',
    )
    localStorage.setItem(
      ALL_ORDER_ITEMS_STORAGE_KEY,
      JSON.stringify([...existingOrderItems, ...newOrderItems]),
    )

    set((state) => ({ orders: [...state.orders, newOrder] }))
    // Limpar o carrinho após adicionar o pedido
    useStore.getState().cleanCart(user.email)
  },

  fetchAllOrderItems: (order_id: number): OrderItems[] => {
    const allOrderItems: OrderItems[] = JSON.parse(
      localStorage.getItem('all_order_items') || '[]',
    )

    return allOrderItems.filter((item) => item.order_id === order_id)
    // return JSON.parse(localStorage.getItem(ALL_ORDER_ITEMS_STORAGE_KEY) || '[]')
  },

  updateOrderStatus: (
    orderId: number,
    status: OrderStatus,
    receiverName?: string,
  ) => {
    const allOrders = getAllOrders()

    const updatedOrders = allOrders.map((order: Order) =>
      order.order_id === orderId
        ? {
            ...order,
            status,
            updated_at: new Date(),
            receiver_name: receiverName || order.receiver_name,
          }
        : order,
    )

    console.log('updatedOrders: ', updatedOrders)

    saveOrders(updatedOrders)
    set({ orders: updatedOrders })
  },

  clearOrders: (userId: string) => {
    const allOrders = getAllOrders()
    const updatedOrders = allOrders.filter((order) => order.user_id !== userId)

    saveOrders(updatedOrders)
    set({ orders: updatedOrders })
  },
}))
