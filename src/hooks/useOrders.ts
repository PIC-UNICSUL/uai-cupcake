import { OrderService } from '@/services/orders';
import { useQuery } from '@tanstack/react-query';

const useOrders = (role?: string) => {
  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () => OrderService.getOrders(),
    enabled: role === 'CUSTOMER' || false,
  });
  return {
    orders: data,
    isLoading,
    error,
  };
};

export { useOrders };
