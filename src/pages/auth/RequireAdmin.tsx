import { useAuth } from '@/contexts/auth-context';
import { NotFound } from '@/pages/404'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated , role} = useAuth();

  if (!isAuthenticated || role === 'ADMIN') {
    return <NotFound />
  }

  return children
}
