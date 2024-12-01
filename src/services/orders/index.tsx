import api from '../api';

const RESOURSE = '/order';

const OrderService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get(`${RESOURSE}/me`);
    return response.data;
  },
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get(`/admin${RESOURSE}`);
    return response.data;
  },
  createOrder: async (payload: CreateOrderReq): Promise<Order> => {
    const response = await api.post(RESOURSE, payload);
    return response.data;
  },
  updateOrderStatus: async (payload: UpdateOrderStatusReq) => {
    const response = await api.put('/admin/order/status', payload);
    return response.data;
  },
};

export { OrderService };
