import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { ProductState, productStatus } from '@/@types/types';
import { Cupcakes } from '@/mock/Cupcakes';

export const createProductSlice: StateCreator<
  ProductState,
  [],
  [['zustand/immer', never]]
> = immer((set, get) => ({
  products: Cupcakes,

  // Função para buscar um produto pelo ID
  fetchProduct: (id: number): Product | undefined => {
    const product = get().products.find((product) => product.product_id === id);
    return product;
  },

  // Função para adicionar um produto
  addProduct: (
    newProduct: Omit<
      Product,
      'product_id' | 'created_at' | 'availabilityStatus'
    >,
  ) => {
    set((state) => {
      state.products.push({
        ...newProduct,
        product_id: get().products.length + 1,
        created_at: new Date(),
        availabilityStatus: productStatus.available,
      });
    });
  },

  // Função para remover um produto
  removeProduct: (productId: number) => {
    set((state) => {
      state.products = state.products.filter(
        (product) => product.product_id !== productId,
      );
    });
  },

  // Função para atualizar um produto
  updateProduct: (
    updatedProduct: Partial<Product> & { product_id: number },
  ) => {
    set((state) => {
      state.products = state.products.map((product) =>
        product.product_id === updatedProduct.product_id
          ? { ...product, ...updatedProduct }
          : product,
      );
    });
  },

  // Função para atualizar o status de disponibilidade
  updateAvailabilityStatus: (id: number, status: productStatus) => {
    set((state) => {
      state.products = state.products.map((product) =>
        product.product_id === id
          ? { ...product, availabilityStatus: status }
          : product,
      );
    });
  },
}));
