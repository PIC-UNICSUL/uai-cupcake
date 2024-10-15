import {
  CircleUserRound,
  Home,
  Mail,
  Menu,
  PlusCircle,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react'

import { useStore } from '@/store'

import { AccountMenu } from './account-menu'
import { Cart } from './cart'
import { Logo } from './logo'
import { NavLink } from './nav-link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { signed, user, signout, promoteToAdmin, cartQuantity } = useStore()

  const navigate = useNavigate()

  const handleVersionAdmin = () => {
    if (!user) return
    promoteToAdmin(user.id)
  }

  return (
    <div className="border-b">
      <div className="lg-gap-6 flex h-16 items-center gap-4 px-6">
        <Logo className="hidden h-6 w-6 fill-foreground sm:block" />

        <Separator orientation="vertical" className="hidden h-6 sm:block" />

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
          {signed ? (
            <>
              {user?.admin ? (
                <div className="space-x-2 sm:flex">
                  <NavLink to="/orders">Pedidos</NavLink>
                  <Button
                    className="text-rose-500 dark:text-rose-400"
                    size="custom"
                    variant="ghost"
                    onClick={() => [signout(), navigate('/')]}
                  >
                    <span>Sair</span>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center rounded-lg border hover:bg-muted">
                    <Sheet>
                      <SheetTrigger className="flex items-center gap-2 px-2 py-2">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className={`${cartQuantity == 0 && 'hidden'} text-xs sm:text-sm font-semibold`}>
                          {cartQuantity > 0 && cartQuantity}
                        </span>
                      </SheetTrigger>
                      <Cart />
                    </Sheet>
                  </div>
                  <AccountMenu />
                  {user?.email == "admin@email.com" && !user?.admin && (
                    <Button size="custom" variant="ghost" onClick={() => handleVersionAdmin()} className="p-2 b" >
                      Admin
                    </Button>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="hidden space-x-2 sm:flex">
              <NavLink to="/sign-in">Entrar</NavLink>
              <NavLink to="/contact">Contato</NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        {signed ? null : (
          <div className="ml-auto sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] p-4">
                <nav className="flex flex-col space-y-4">
                  <NavLink to="/sign-in">
                    <CircleUserRound className="h-4 w-4" />
                    Entrar
                  </NavLink>
                  <NavLink to="/sign-up">
                    <PlusCircle className="h-4 w-4" />
                    Cadastrar
                  </NavLink>
                  <NavLink to="/contact">
                    <Mail className="h-4 w-4" />
                    Contato
                  </NavLink>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  )
}
