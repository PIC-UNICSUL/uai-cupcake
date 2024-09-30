import { create } from 'zustand';
import { produce } from "immer"
import { v4 as uuidv4 } from 'uuid';

import { CartState, OrdersState, AuthState, User, CartItem, Order, OrderStatus } from '@/@types/types';

export type StoreState = CartState & OrdersState & AuthState;

const UAICUPCAKES_USER_TOKEN_STORAGE_KEY = 'uaiCupcakes:user_token'
const UAICUPCAKES_USERS_STORAGE_KEY = 'uaiCupcakes:users_bd'

export const useStore = create<StoreState>((set, get) => {
    return {
        user: null,
        signed: false,
        cartItems: [],
        cartQuantity: 0,
        cartItemsTotal: 0,
        orders: [],

        initializeUserFromStorage: () => {
            const userToken = localStorage.getItem(UAICUPCAKES_USER_TOKEN_STORAGE_KEY);
            const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
        
            if (userToken && usersStorage) {
              const parsedUserToken = JSON.parse(userToken);
              const users: User[] = JSON.parse(usersStorage);
        
              const hasUser = users.find(
                (storedUser) => storedUser.email === parsedUserToken.email
              );
        
              if (hasUser) {
                set({ user: hasUser, signed: true });
              }
            }
          },
        
        signin: (email: string, password: string) => {
            const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
            if (!usersStorage) return 'Usuário não cadastrado';
        
            const users: User[] = JSON.parse(usersStorage);
            const hasUser = users.find((user) => user.email === email);
        
            if (hasUser) {
                if (hasUser.password === password) {
                const token = uuidv4();
                localStorage.setItem(
                    UAICUPCAKES_USER_TOKEN_STORAGE_KEY,
                    JSON.stringify({ email, token })
                );
                set({ user: hasUser, signed: true });
                } else {
                return 'E-mail ou senha incorretos';
                }
            } else {
                return 'Usuário não cadastrado';
            }
        },
    
        signup: (user: User) => {
            const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
            const users: User[] = usersStorage ? JSON.parse(usersStorage) : [];
        
            const normalizedEmail = user.email.trim().toLowerCase();
            const hasUser = users.find(
                (client) => client.email.trim().toLowerCase() === normalizedEmail
            );
        
            if (hasUser) {
                return 'Já tem uma conta com esse E-mail';
            }
        
            const newUser = {
                ...user,
                email: normalizedEmail,
                id: uuidv4(),
                admin: user.admin || false,
            };
        
            const newUsers = produce(users, (draft) => {
                draft.push(newUser);
            });
        
            localStorage.setItem(UAICUPCAKES_USERS_STORAGE_KEY, JSON.stringify(newUsers));
        },
    
        signout: () => {
            set({ user: null, signed: false });
            localStorage.removeItem(UAICUPCAKES_USER_TOKEN_STORAGE_KEY);
        },
    
        updateUser: (updatedUser: Partial<User>) => {
            const { user } = get();
            if (!user) return 'Nenhum usuário logado';
        
            const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
            if (!usersStorage) return 'Erro ao atualizar usuário';
        
            const users: User[] = JSON.parse(usersStorage);
            const userIndex = users.findIndex(
                (storedUser) => storedUser.email === user.email
            );
            if (userIndex === -1) return 'Usuário não encontrado';
        
            const updatedUsers = produce(users, (draft) => {
                draft[userIndex] = { ...draft[userIndex], ...updatedUser };
            });
        
            localStorage.setItem(
                UAICUPCAKES_USERS_STORAGE_KEY,
                JSON.stringify(updatedUsers)
            );
            set({ user: { ...user, ...updatedUser } });
        },
    
        promoteToAdmin: (userId: string) => {
            const usersStorage = localStorage.getItem(UAICUPCAKES_USERS_STORAGE_KEY);
            if (!usersStorage) return 'Erro ao buscar usuários';
        
            const users: User[] = JSON.parse(usersStorage);
            const userIndex = users.findIndex((user) => user.id === userId);
            if (userIndex === -1) return 'Usuário não encontrado';
        
            const updatedUsers = produce(users, (draft) => {
                draft[userIndex].admin = true;
            });
        
            localStorage.setItem(
                UAICUPCAKES_USERS_STORAGE_KEY,
                JSON.stringify(updatedUsers)
            );
        
            return 'Usuário promovido a administrador';
        },
    
        isAdmin: () => {
            const user = get().user
            return user?.admin === true;
        },

        // CART

        calculateCartTotals: () => {
            const cartItems = get().cartItems;
            const cartQuantity = cartItems.length;
            const cartItemsTotal = cartItems.reduce((total, cartItem) => {
              return total + cartItem.price * cartItem.quantity;
            }, 0);
        
            set({ cartQuantity, cartItemsTotal });
        },    
        
        addCupcakesToCart: (cupcakes: CartItem[]) => {
            set((state: CartState) => {
              cupcakes.forEach((cupcake) => {
                const cupcakeAlreadyExistInCart = state.cartItems.findIndex(
                  (cartItem) => cartItem.id === cupcake.id
                );
                if (cupcakeAlreadyExistInCart >= 0) {
                  state.cartItems[cupcakeAlreadyExistInCart].quantity += cupcake.quantity;
                } else {
                  state.cartItems.push(cupcake);
                }
              });
              return { cartItems: state.cartItems };
            });
            get().calculateCartTotals();
        },
        
        changeCartItemQuantity: (cartItemId: number, type: 'increase' | 'decrease') => {
            set((state) => {
              const cupcakeExistsInCart = state.cartItems.findIndex((cartItem) => cartItem.id === cartItemId);
              if (cupcakeExistsInCart >= 0) {
                const item = state.cartItems[cupcakeExistsInCart];
                item.quantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
              }
              return { cartItems: state.cartItems };
            });
            get().calculateCartTotals();
        },
        
        removeCartItem: (cartItemId: number) => {
            set((state) => {
              const cupcakeExistsInCart = state.cartItems.findIndex((cartItem) => cartItem.id === cartItemId);
              if (cupcakeExistsInCart >= 0) {
                state.cartItems.splice(cupcakeExistsInCart, 1);
              }
              return { cartItems: state.cartItems };
            });
            get().calculateCartTotals();
        },
        
        cleanCart: () => {
            set((state: CartState) => {
              state.cartItems = [];
              return { cartItems: state.cartItems };
            });
            get().calculateCartTotals();
        },
        
        setCartItemsFromStorage: (email: string) => {
            const UAICUPCAKES_ITEMS_STORAGE_KEY = `uaiCupcakes:cartItems_${email}`;
            const storedCartItems = localStorage.getItem(UAICUPCAKES_ITEMS_STORAGE_KEY);
            if (storedCartItems) {
              set((state: CartState) => {
                state.cartItems = JSON.parse(storedCartItems);
                return { cartItems: state.cartItems };
              });
              get().calculateCartTotals();
            }
        },

        // ORDERS

        fetchUserOrders: (userEmail: string) => {
            const savedOrders = localStorage.getItem('all_orders');
            if (savedOrders) {
              const allOrders = JSON.parse(savedOrders);
              const userOrders = allOrders.filter((order: Order) => order.userEmail === userEmail);
              set({ orders: userOrders });
            }
        },
        
        fetchAllOrders: () => {
            const savedOrders = localStorage.getItem('all_orders');
            if (savedOrders) {
              set({ orders: JSON.parse(savedOrders) });
            }
        },
        
        addOrder: (user: User, items: CartItem[], total: number) => {
            const generateUniqueOrderId = (): number => {
              let newOrderId = 0;
              let isUnique = false;
        
              while (!isUnique) {
                newOrderId = Math.floor(Math.random() * 1001);
                const savedOrders = localStorage.getItem('all_orders');
                const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
                isUnique = !allOrders.some((order: Order) => order.orderId === newOrderId);
              }
        
              return newOrderId;
            };
        
            const newOrder: Order = {
              orderId: generateUniqueOrderId(),
              items,
              total,
              date: new Date().toISOString(),
              status: OrderStatus.pending,
              userEmail: user.email,
              userName: user.name || '',
              userPhone: user.phone || '',
            };
        
            const savedOrders = localStorage.getItem('all_orders');
            const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
            const updatedOrders = [...allOrders, newOrder];
        
            set({ orders: updatedOrders.filter(order => order.userEmail === newOrder.userEmail) });
            localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
        },
        
        updateOrderStatus: (orderId: number, status: OrderStatus) => {
            const savedOrders = localStorage.getItem('all_orders');
            const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
            const updatedOrders = allOrders.map((order: Order) =>
              order.orderId === orderId ? { ...order, status } : order
            );
        
            set({ orders: updatedOrders });
            localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
        },
        
        clearOrders: (userEmail: string) => {
            const savedOrders = localStorage.getItem('all_orders');
            const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
        
            const updatedOrders = allOrders.filter((order: Order) => order.userEmail !== userEmail);
            set({ orders: [] });
            localStorage.setItem('all_orders', JSON.stringify(updatedOrders));
        },
    }
})

// useCartStore.subscribe((state) => {
// const { user } = useAuthStore()
//   const UAICUPCAKES_ITEMS_STORAGE_KEY = `uaiCupcakes:cartItems_${user?.email}`;
//   if (user) {
//     localStorage.setItem(UAICUPCAKES_ITEMS_STORAGE_KEY, JSON.stringify(state.cartItems));
//   }
// });
