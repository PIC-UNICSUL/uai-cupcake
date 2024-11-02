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

// export const useStore = create<StoreState>()((...a) => ({
//     ...createProductSlice(...a),
//     ...createOrderSlice(...a),
//     ...createAuthSlice(...a),
//     ...createCartSlice(...a),
// }))

// return {
//         user: null,
//         signed: false,
//         cartItems: [],
//         cartQuantity: 0,
//         cartItemsTotal: 0,
//         orders: [],
//         products: Cupcakes,

//         initializeUserFromStorage: () => {
//             const userToken = localStorage.getItem(UAICUPCAKES_USER_TOKEN_STORAGE_KEY);
//             const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);

//             if (userToken && usersStorage) {
//               const parsedUserToken = JSON.parse(userToken);
//               const users: User[] = JSON.parse(usersStorage);

//               const hasUser = users.find(
//                 (storedUser) => storedUser.user_id === parsedUserToken.userId
//               );

//               if (hasUser) {
//                 set({ user: hasUser, signed: true });
//               }
//             }
//           },

//         signin: (email: string, password: string) => {
//             const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
//             if (!usersStorage) return 'Usuário não cadastrado';

//             const users: User[] = JSON.parse(usersStorage);
//             const hasUser = users.find((user) => user.email === email);

//             if (hasUser) {
//               if (hasUser.password_hash === password) {
//               const token = uuidv4();
//               localStorage.setItem(
//                 UAICUPCAKES_USER_TOKEN_STORAGE_KEY,
//                 JSON.stringify({ userId: hasUser.user_id, token })
//               );
//               set({ user: hasUser, signed: true });
//               } else {
//               return 'E-mail ou senha incorretos';
//               }
//             } else {
//               return 'Usuário não cadastrado';
//             }
//         },

//         signup: (user: User) => {
//             const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
//             const users: User[] = usersStorage ? JSON.parse(usersStorage) : [];

//             const normalizedEmail = user.email.trim().toLowerCase();
//             const hasUser = users.find(
//                 (client) => client.email.trim().toLowerCase() === normalizedEmail
//             );

//             if (hasUser) {
//                 return 'Já tem uma conta com esse E-mail';
//             }

//             const newUser = {
//                 ...user,
//                 email: normalizedEmail,
//                 password_hash: user.password_hash,
//                 user_id: uuidv4(),
//                 user_type: user.user_type || "customer",
//                 created_at: new Date(),
//             };

//             const newUsers = produce(users, (draft) => {
//                 draft.push(newUser);
//             });

//             localStorage.setItem(UAICUPCAKES_USERS_STORAGE_KEY, JSON.stringify(newUsers));
//         },

//         signout: () => {
//             set({ user: null, signed: false });
//             localStorage.removeItem(UAICUPCAKES_USER_TOKEN_STORAGE_KEY);
//         },

//         updateUser: (updatedUser: Partial<User>) => {
//           const { user } = get();

//           if (!user) return 'Nenhum usuário logado';

//           const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);

//           if (!usersStorage) return 'Erro ao atualizar usuário';

//           const users: User[] = JSON.parse(usersStorage);
//           const userIndex = users.findIndex(
//               (storedUser) => storedUser.email === user.email
//           );

//           if (userIndex === -1) return 'Usuário não encontrado';

//           const userDataWithTimestamp = {
//             ...updatedUser,
//             updated_at: new Date(),
//           };

//           if (updatedUser.email) {
//             const normalizedNewEmail = updatedUser.email.trim().toLowerCase();
//             const emailAlreadyExists = users.some(
//                 (storedUser) => storedUser.email.trim().toLowerCase() === normalizedNewEmail && storedUser.email !== user.email
//             );

//             if (emailAlreadyExists) {
//                 return 'E-mail já está registrado em outra conta';
//             }
//           }

//           const updatedUsers = produce(users, (draft) => {
//               draft[userIndex] = { ...draft[userIndex], ...userDataWithTimestamp };
//           });

//           localStorage.setItem(
//               UAICUPCAKES_USERS_STORAGE_KEY,
//               JSON.stringify(updatedUsers)
//           );
//           set({ user: { ...user, ...userDataWithTimestamp } });
//         },

//         fetchUsers: () => {
//           const usersStorage = JSON.parse(localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY) || '[]');

//           return usersStorage as User[];
//         },

//         fetchUserById: (userId: string) => {
//           const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);

//           if (usersStorage) {
//             const users: User[] = JSON.parse(usersStorage);
//             const foundUser = users.find(user => user.user_id === userId);

//             if (foundUser) {
//               set({ user: foundUser });
//             } else {
//               set({ user: null });
//             }
//           }
//         },

//         promoteToAdmin: (userId: string) => {
//             const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
//             if (!usersStorage) return 'Erro ao buscar usuários';

//             const users: User[] = JSON.parse(usersStorage);
//             const userIndex = users.findIndex((user) => user.user_id === userId);
//             if (userIndex === -1) return 'Usuário não encontrado';

//             const updatedUsers = produce(users, (draft) => {
//                 draft[userIndex].user_type = userType.admin;
//             });

//             localStorage.setItem(
//                 UAICUPCAKES_USERS_STORAGE_KEY,
//                 JSON.stringify(updatedUsers)
//             );

//             return 'Usuário promovido a administrador';
//         },

//         isAdmin: () => {
//             const user = get().user
//             return user?.user_type === userType.admin;
//         },

//         // CART

//         calculateCartTotals: () => {
//           const { cartItems, products } = get();
//           const cartQuantity = cartItems.length;

//           const cartItemsTotal = cartItems.reduce((total, cartItem) => {
//             const product = products.find(p => p.product_id === cartItem.product_id);
//             return product ? total + product.price * cartItem.quantity : total;
//           }, 0);

//           set({ cartQuantity, cartItemsTotal });
//         },

//         addProductsToCart: (products: OrderItems[]) => {
//           set((state: CartState) => {
//             const updatedCartItems = [...state.cartItems];

//             products.forEach((product) => {
//               const productIndex = updatedCartItems.findIndex(
//                 (item) => item.product_id === product.product_id
//               );

//               if (productIndex >= 0) {
//                 updatedCartItems[productIndex] = {
//                   ...updatedCartItems[productIndex],
//                   quantity: updatedCartItems[productIndex].quantity + product.quantity,
//                 };
//               } else {
//                 updatedCartItems.push(product);
//               }
//             });

//             return { cartItems: updatedCartItems };
//           });

//           get().calculateCartTotals();
//         },

//         changeCartItemQuantity: (orderItemId: number, type: 'increase' | 'decrease') => {
//           set((state: CartState) => {
//             const updatedCartItems = state.cartItems.map((item) => {
//               if (item.order_item_id === orderItemId) {
//                 const updatedQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
//                 return { ...item, quantity: Math.max(updatedQuantity, 0) };
//               }
//               return item;
//             });

//             return { cartItems: updatedCartItems };
//           });

//           get().calculateCartTotals();
//         },

//         removeCartItem: (orderItemId: number) => {
//           set((state: CartState) => {
//             const updatedCartItems = state.cartItems.filter(
//               (item) => item.order_item_id !== orderItemId
//             );

//             return { cartItems: updatedCartItems };
//           });

//           get().calculateCartTotals();
//         },

//         cleanCart: () => {
//           set(() => {
//             const emptyCartItems: OrderItems[] = [];
//             return { cartItems: emptyCartItems };
//           });

//           get().calculateCartTotals();
//         },

//         setCartItemsFromStorage: (email: string) => {
//           const UAICUPCAKES_ITEMS_STORAGE_KEY = `uaiCupcakes:cartItems_${email}`;
//           const storedCartItems = localStorage.getItem(UAICUPCAKES_ITEMS_STORAGE_KEY);

//           if (storedCartItems) {
//             set((state: CartState) => {
//               const parsedItems: OrderItems[] = JSON.parse(storedCartItems);
//               return { cartItems: parsedItems };
//             });

//             get().calculateCartTotals();
//           }
//         },

//         // PRODUCTS

//         addProduct: (newProduct: Product) => {
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

//         // ORDERS

//         fetchUserOrders: (userEmail: string) => {
//           const savedOrders = localStorage.getItem('all_orders');
//           const savedUsers = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);

//           if (savedOrders && savedUsers) {
//             const allOrders: Order[] = JSON.parse(savedOrders);
//             const allUsers: User[] = JSON.parse(savedUsers);

//             const user = allUsers.find((user: User) => user.email === userEmail);

//             if (user) {
//               const userOrders = allOrders.filter((order: Order) => order.user_id === user.user_id);

//               set({ orders: userOrders });

//             } else {
//               set({ orders: [] });
//             }
//           }
//         },

//         fetchAllOrders: () => {
//             const savedOrders = localStorage.getItem('all_orders');
//             if (savedOrders) {
//               set({ orders: JSON.parse(savedOrders) });
//             }
//         },

//         addOrder: (user: User, orderItems: OrderItems[], total: number) => {
//           const generateUniqueOrderId = (): number => {
//             let newOrderId = 0;
//             let isUnique = false;

//             while (!isUnique) {
//               newOrderId = Math.floor(Math.random() * 1001);
//               const savedOrders = localStorage.getItem('all_orders');
//               const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
//               isUnique = !allOrders.some((order: Order) => order.order_id === newOrderId);
//             }

//             return newOrderId;
//           };

//           set((state: OrdersState) => {
//             const orderId = generateUniqueOrderId();

//             const newOrder: Order = {
//               order_id: orderId,
//               price: total,
//               status: OrderStatus.pending,
//               user_id: user.user_id || '',
//               created_at: new Date(),
//             };

//             const newOrderItems = orderItems.map((item) => ({
//               ...item,
//               order_id: orderId,
//               created_at: new Date(),
//             }));

//             const savedOrders = localStorage.getItem('all_orders');
//             const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
//             localStorage.setItem('all_orders', JSON.stringify([...allOrders, newOrder]));

//             const savedOrderItems = localStorage.getItem('all_order_items');
//             const allOrderItems = savedOrderItems ? JSON.parse(savedOrderItems) : [];
//             localStorage.setItem('all_order_items', JSON.stringify([...allOrderItems, ...newOrderItems]));

//             return { orders: [...state.orders, newOrder] };
//           });
//         },

//         fetchAllOrderItems: () => {
//           const allOrderItems = JSON.parse(localStorage.getItem('all_order_items') || '[]');
//           return allOrderItems as OrderItems[];
//         },

//         updateOrderStatus: (orderId: number, status: OrderStatus, receiverName?: string) => {
//           const savedOrders = localStorage.getItem('all_orders')
//           const allOrders = savedOrders ? JSON.parse(savedOrders) : []

//           const updatedOrders = allOrders.map((order: Order) =>
//             order.order_id === orderId
//               ? { ...order, status, receiverName: status === OrderStatus.delivered ? receiverName : order.receiverName }
//               : order
//           )

//           set({ orders: updatedOrders})

//           localStorage.setItem('all_orders', JSON.stringify(updatedOrders))
//         },

//         clearOrders: (userId: string) => {
//           const savedOrders = localStorage.getItem('all_orders');
//           const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
//           const updatedOrders = allOrders.filter((order: Order) => order.user_id !== userId);
//           set({ orders: [] });
//           localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
//       },
//     }
// })
