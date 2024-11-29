import {  useQuery, } from '@tanstack/react-query';
import { UserService } from '@/services/user';

const useUser = (isAuthenticated?: boolean) => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ['user', isAuthenticated],
    queryFn: () => UserService.getUser(),
    enabled: isAuthenticated,
    
  });
  return {
    user: data,
    isLoading,
    error,
  };
};

export { useUser };
