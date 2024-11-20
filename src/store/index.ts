import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { AuthState, CartState, OrdersState, ProductState } from '@/@types/types'

import { createAuthSlice } from './AuthSlice'
import { createCartSlice } from './CartSlice'
import { createOrderSlice } from './OrderSlice'
import { createProductSlice } from './ProductSlice'

export type StoreState = CartState & OrdersState & AuthState & ProductState

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createProductSlice(...a),
        ...createOrderSlice(...a),
        ...createAuthSlice(...a),
        ...createCartSlice(...a),
      }),
      {
        name: 'uaiCupcakes-store', // Nome da chave no localStorage
        version: 1, // Versionamento da store
        // partialize: (state) => ({ orders: state.orders, user: state.user }),
      },
    ),
    {
      name: 'uaiCupcake',
    },
  ),
)
