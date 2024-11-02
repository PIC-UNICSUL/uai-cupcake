import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { Product, ProductState, productStatus } from '@/@types/types'
import { Cupcakes } from '@/mock/Cupcakes'

export const createProductSlice: StateCreator<
  ProductState,
  [],
  [['zustand/immer', never]]
> = immer((set, get) => ({
  products: Cupcakes,

  // Função para buscar um produto pelo ID
  fetchProduct: (id: number): Product | undefined => {
    const product = get().products.find((product) => product.product_id === id)
    return product
  },

  // Função para adicionar um produto
  addProduct: (
    newProduct: Omit<
      Product,
      'product_id' | 'created_at' | 'availability_status'
    >,
  ) => {
    set((state) => {
      state.products.push({
        ...newProduct,
        product_id: get().products.length + 1,
        created_at: new Date(),
        availability_status: productStatus.available,
      })
    })
  },

  // Função para remover um produto
  removeProduct: (productId: number) => {
    set((state) => {
      state.products = state.products.filter(
        (product) => product.product_id !== productId,
      )
    })
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
      )
    })
  },

  // Função para atualizar o status de disponibilidade
  updateAvailabilityStatus: (id: number, status: productStatus) => {
    set((state) => {
      state.products = state.products.map((product) =>
        product.product_id === id
          ? { ...product, availability_status: status }
          : product,
      )
    })
  },
}))

// addProduct: (newProduct: Product) => {
//           set((state) => {
//             const newProductWithId = { ...newProduct, product_id: Number(newProduct.product_id) };
//             return {
//               products: [...state.products, newProductWithId],
//             };
//           });
//         },

//       removeProduct: (productId: number) => {
//           set((state) => {
//             const updatedProducts = produce(state.products, (draft) => {
//               const productIndex = draft.findIndex(product => product.product_id === productId);
//               if (productIndex !== -1) {
//                 draft.splice(productIndex, 1); // Remove o produto pelo índice
//               }
//             });
//             return { products: updatedProducts };
//           });
//       },

//         updateProduct: (updatedProduct: Product) => {
//           set((state) => {
//             const updatedProducts = produce(state.products, (draft) => {
//               const productIndex = draft.findIndex(product => product.product_id === updatedProduct.product_id);
//               if (productIndex !== -1) {
//                 draft[productIndex] = { ...draft[productIndex], ...updatedProduct }; // Atualiza o produto existente
//               }
//             });
//             return { products: updatedProducts };
//           });
//         },

//         fetchProduct: (id: number) => {
//           const cupcake = Cupcakes.filter((cupcake) => cupcake.product_id === id);

//           return cupcake
//         },

//         updateAvailabilityStatus: (id: number, status: productStatus) => {
//           set((state) => ({
//               products: state.products.map((product) =>
//                   product.product_id === id ? { ...product, availability_status: status } : product
//               ),
//           }));
//         },

// {
//   name: 'uaiCupcakes:products', // Nome da chave no localStorage
//   storage: customStorage, // Define o armazenamento personalizado
//   partialize: (state) => ({ products: state.products }),
// }
