import { useAuth } from '@/contexts/auth-context';
import { SignIn } from '@/pages/auth/sign-in'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <SignIn />
  }

  return children
}
