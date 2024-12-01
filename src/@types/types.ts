// PRODUCTS

export enum productStatus {
  available = 'AVAILABLE',
  unavailable = 'UNAVAILABLE',
}

export interface ProductState {
  products: Product[];
  fetchProduct: (id: number) => Product | undefined;
  updateAvailabilityStatus: (id: number, status: productStatus) => void;
  addProduct: (
    product: Omit<Product, 'product_id' | 'created_at' | 'availabilityStatus'>,
  ) => void;
  updateProduct: (
    updatedProduct: Omit<Product, 'product_id' | 'img'> & {
      product_id: number;
    },
  ) => void;
  removeProduct: (id: number) => void;
}

// AUTH

export enum userType {
  customer = 'customer',
  admin = 'admin',
}
export interface User {
  id: string;
  name: string;
  mail: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface AuthState {
  user: User | null;
  signed: boolean;
  signin: (email: string, password: string) => string | void;
  signup: (user: User) => string | void;
  signout: () => void;
  fetchUsers: () => User[];
  updateUser: (updatedUser: Partial<User>) => string | void;
  promoteToAdmin: (userId: string) => string | void;
  isAdmin: () => void;
  initializeUserFromStorage: () => void;
}

// CART

export interface OrderItems {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  created_at: Date;
}

export interface CartState {
  cartItems: OrderItems[];
  cartQuantity: number;
  cartItemsTotal: number;
  addProductsToCart: (cupcakes: OrderItems[], email: string) => void;
  changeCartItemQuantity: (
    cartItemId: number,
    type: 'increase' | 'decrease',
    email: string,
  ) => void;
  removeCartItem: (cartItemId: number, email: string) => void;
  cleanCart: (email: string) => void;
  setCartItemsFromStorage: (email: string) => void;
  loadCartForUser: (email: string) => void;
  calculateCartTotals: () => void;
  persistCartItems: (email: string) => void;
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
  order_id: number;
  price: number;
  status: OrderStatus;
  user_id: string;
  receiver_name?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface OrdersState {
  orders: Order[];
  fetchUserOrders: (userEmail: string) => void;
  fetchAllOrders: () => void;
  fetchAllOrderItems: (order_id: number) => OrderItems[];
  addOrder: (user: User, items: OrderItems[], total: number) => void;
  updateOrderStatus: (
    orderId: number,
    status: OrderStatus,
    receiverName?: string,
  ) => void;
  clearOrders: (userEmail: string) => void;
}
