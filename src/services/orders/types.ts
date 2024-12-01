type OrderStatus =
  | 'PENDING'
  | 'PREPARATION'
  | 'READY'
  | 'DELIVERED'
  | 'CANCELED';

interface Order {
  id: string;
  user: User;
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
}

interface OrderItem {
  productId: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface CreateOrderReq {
  orderItems: OrderItemReq[];
}

interface OrderItemReq {
  id: string;
  quantity: number;
}

interface UpdateOrderStatusReq {
  id: string;
  status: OrderStatus;
  additionalInfo: string;
}
