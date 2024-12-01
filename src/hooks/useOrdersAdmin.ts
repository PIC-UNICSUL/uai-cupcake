import { OrderService } from '@/services/orders';
import { useQuery } from '@tanstack/react-query';

const useOrdersAdmin = (role?: string) => {
  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ['orders-admin'],
    queryFn: () => OrderService.getAllOrders(),
    enabled: role === 'ADMIN' || false,
  });
  return {
    orders: data,
    isLoading,
    error,
  };
};

export { useOrdersAdmin };
