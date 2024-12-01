import { ProductService } from '@/services/products';
import { useQuery } from '@tanstack/react-query';

const useProducts = (filters?: ParamsGetProducts) => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => ProductService.getProducts(filters),
  });
  return {
    products: data,
    isLoading,
    error,
  };
};

export { useProducts };
