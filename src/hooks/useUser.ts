import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/services/user';
import { AuthService } from '@/services/auth';

const useUser = () => {
  const token = AuthService.getToken();
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ['user', token],
    queryFn: () => UserService.getUser(),
    enabled: !!token,
  });
  return {
    user: data,
    isLoading,
    error,
  };
};

export { useUser };
