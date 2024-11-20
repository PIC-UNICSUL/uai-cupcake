import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AuthLayout() {
  return (
    <div>
      <Header />
      <div className="container h-screen flex-col items-center justify-center pt-14 antialiased lg:grid lg:min-h-screen lg:max-w-none lg:grid-cols-2 lg:px-0 lg:pt-0">
        <div className="hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
          <div className="flex h-full items-center justify-center gap-3 text-7xl font-medium text-foreground">
            <span className="font-bold">UAI Cupcakes</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
