import { SignIn } from '@/pages/auth/sign-in'
import { useStore } from '@/store'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useStore()

  if (!user) {
    return <SignIn />
  }

  return children
}
