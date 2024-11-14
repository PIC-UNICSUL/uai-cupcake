import { NotFound } from '@/pages/404'
import { useStore } from '@/store'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useStore()

  if (!user || !user.admin) {
    return <NotFound />
  }

  return children
}
