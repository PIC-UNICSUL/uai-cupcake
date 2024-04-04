import { Home, ShoppingCart, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { Cart } from './cart'
import { Logo } from './logo'
import { NavLink } from './nav-link'
import { Separator } from './ui/separator'
import { Sheet, SheetTrigger } from './ui/sheet'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Logo className="h-6 w-6 fill-foreground" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/products">
            <UtensilsCrossed className="h-4 w-4" />
            Cupcakes
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1 space-x-2">
          <div className="flex justify-center rounded-lg border hover:bg-muted">
            <Sheet>
              <SheetTrigger className="p-2">
                <span className="absolute right-[150px] top-[5px] z-[5]  rounded-full bg-primary px-2 py-[0.1rem] text-muted">
                  1
                </span>
                <ShoppingCart className="h-5 w-5" />
              </SheetTrigger>
              <Cart />
            </Sheet>
          </div>
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
