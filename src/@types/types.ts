// PRODUCTS
export interface Cupcake {
    id: number
    name: string
    img: string
    description: string
    categories: string[]
    price: number
}

// AUTH
export interface User {
    id?: string
    admin?: boolean
    name?: string
    email: string
    password: string
    phone?: string
}
  
export interface AuthState {
    user: User | null
    signed: boolean
    signin: (email: string, password: string) => string | void
    signup: (user: User) => string | void
    signout: () => void
    updateUser: (updatedUser: Partial<User>) => string | void
    promoteToAdmin: (userId: string) => string | void
    isAdmin: () => void
    initializeUserFromStorage: () => void
}

// CART

export interface CartItem extends Cupcake {
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
    cartQuantity: number;
    cartItemsTotal: number;
    addCupcakesToCart: (cupcakes: CartItem[]) => void;
    changeCartItemQuantity: (cartItemId: number, type: 'increase' | 'decrease') => void;
    removeCartItem: (cartItemId: number) => void;
    cleanCart: () => void;
    setCartItemsFromStorage: (email: string) => void;
    calculateCartTotals: () => void;
}

// ORDERS

export enum OrderStatus {
    pending = 'Pendente',
    preparation = 'Preparando',
    ready = 'Pronto',
    delivered = 'Entregue',
    cancelled = 'Cancelado',
}
  
export interface Order {
    orderId: number;
    items: CartItem[];
    total: number;
    date: string;
    status: OrderStatus;
    userEmail: string;
    userName: string;
    userPhone: string;
}
  
export interface OrdersState {
    orders: Order[];
    fetchUserOrders: (userEmail: string) => void;
    fetchAllOrders: () => void;
    addOrder: (user: User,items: CartItem[], total: number) => void;
    updateOrderStatus: (orderId: number, status: OrderStatus) => void;
    clearOrders: (userEmail: string) => void;
}

