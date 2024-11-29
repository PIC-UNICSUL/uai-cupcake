import { ProductService } from '@/services/products';
import {  useQuery, } from '@tanstack/react-query';

const useProducts = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => ProductService.getProducts(),
  });
  return {
    products: data,
    isLoading,
    error,
  };
}

export { useProducts };