import { useStore } from '@/store'
import { SignIn } from '@/pages/auth/sign-in'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useStore()

  if (!user) {
    return <SignIn />
  }

  return children
}
