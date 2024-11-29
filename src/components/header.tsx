import {
  CircleUserRound,
  Contact,
  Home,
  List,
  LogOut,
  Mail,
  Menu,
  PlusCircle,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { User, userType } from '@/@types/types'
import { useStore } from '@/store'

import { AccountMenu } from './account-menu'
import { Cart } from './cart'
import { Logo } from './logo'
import { NavLink } from './nav-link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useAuth } from '@/contexts/auth-context'

export function Header() {
  const {user, signout, promoteToAdmin, cartQuantity, cartItems } =
    useStore()

  const { isAuthenticated, role, logout} = useAuth();
  const navigate = useNavigate()

  const handlePromoteToAdmin = useCallback(() => {
    if (user && user.user_id) promoteToAdmin(user.user_id)
  }, [user, promoteToAdmin])

  const handleSignOut = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  const cartQuantityLabel = useMemo(
    () => (cartQuantity > 0 ? cartItems.length : ''),
    [cartQuantity],
  )

  return (
    <header className="fixed z-10 w-full bg-white border-b">
      <div className="flex items-center justify-between h-16 gap-4 px-6 lg-gap-6">
        <Logo className="hidden w-6 h-6 fill-foreground sm:block" />
        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        {/* Links de Navegação */}
        <NavigationLinks />

        {/* Área de Ações do Usuário */}
        <div className="flex items-center ml-auto -mr-4 sm:-mr-0 sm:gap-1 sm:space-x-2">
          {isAuthenticated ? (
            <UserMenu
              user={user}
              cartQuantityLabel={cartQuantityLabel}
              onSignOut={handleSignOut}
              onPromoteToAdmin={handlePromoteToAdmin}
              role={role}
            />
          ) : (
            <GuestMenu />
          )}
        </div>

        {/* Trigger do Menu Mobile */}
        <MobileMenu onPromoteToAdmin={handlePromoteToAdmin} />
      </div>
    </header>
  )
}

// Componentes Separados para Links de Navegação, Menu de Usuário e Menu Mobile
function NavigationLinks() {
  return (
    <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
      <NavLink to="/">
        <Home className="w-4 h-4" />
        Início
      </NavLink>
      <NavLink to="/products">
        <UtensilsCrossed className="w-4 h-4" />
        Cupcakes
      </NavLink>
      <NavLink to="/contact">
        <Mail className="w-4 h-4" />
        Contato
      </NavLink>
    </nav>
  )
}

function GuestMenu() {
  return (
    <div className="hidden space-x-2 sm:flex">
      <NavLink to="/sign-in">Entrar</NavLink>
      <NavLink to="/sign-up">Cadastrar</NavLink>
    </div>
  )
}

interface UserMenuProps {
  user: User | null
  cartQuantityLabel: number | ''
  onSignOut: () => void
  onPromoteToAdmin: () => void
  role: string | null
}

function AdminMenu({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="hidden space-x-2 sm:flex">
      <NavLink to="/orders">Pedidos</NavLink>
      <Button
        className="text-rose-500 dark:text-rose-400"
        size="custom"
        variant="ghost"
        onClick={onSignOut}
      >
        Sair
      </Button>
    </div>
  )
}

function UserMenu({
  user,
  cartQuantityLabel,
  onSignOut,
  onPromoteToAdmin,
  role
}: UserMenuProps) {
  return (
    <>
      {role === 'ADMIN' ? (
        <AdminMenu onSignOut={onSignOut} />
      ) : (
        <CustomerMenu
          cartQuantityLabel={cartQuantityLabel}
          user={user}
          onPromoteToAdmin={onPromoteToAdmin}
        />
      )}
    </>
  )
}

interface CustomerMenuProps {
  cartQuantityLabel: number | ''
  user: User | null
  onPromoteToAdmin: () => void
}

function CustomerMenu({
  cartQuantityLabel,
  user,
  onPromoteToAdmin,
}: CustomerMenuProps) {
  const [isCartOpen, setCartOpen] = useState(false)

  const handleCloseCart = () => setCartOpen(false)

  return (
    <>
      <div className="flex justify-center border rounded-lg hover:bg-muted">
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger className="flex items-center gap-2 px-2 py-2">
            <ShoppingCart className="w-4 h-4 sm:h-5 sm:w-5" />
            <span
              className={`text-xs font-semibold sm:text-sm ${cartQuantityLabel === 0 && 'hidden'}`}
            >
              {cartQuantityLabel}
            </span>
          </SheetTrigger>
          <Cart onClose={handleCloseCart} />
        </Sheet>
      </div>
      <div className="hidden sm:block">
        <AccountMenu />
      </div>
      {user?.email === 'admin@email.com' && user.user_type !== 'admin' && (
        <Button
          size="custom"
          variant="ghost"
          onClick={onPromoteToAdmin}
          className="hidden p-2 sm:block"
        >
          Admin
        </Button>
      )}
    </>
  )
}

interface MobileMenuProps {
  onPromoteToAdmin: () => void
}

function MobileMenu({ onPromoteToAdmin }: MobileMenuProps) {
  const { user, signout } = useStore()
  const { isAuthenticated,  role, logout} = useAuth();
  const navigate = useNavigate()
 

  const handleSignOut = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="p-2">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[200px] p-4">
          <nav className="flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex flex-col w-full">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {user?.name}
                  </span>
                  <span className="overflow-hidden text-xs font-normal text-ellipsis whitespace-nowrap text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
                <Separator />
                {role === 'ADMIN' ? (
                  <>
                    <NavLink to="/orders">Pedidos</NavLink>
                    <div>
                      <Button
                        className="text-rose-500 dark:text-rose-400"
                        size="custom"
                        variant="ghost"
                        onClick={handleSignOut}
                      >
                        Sair
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/orders" className="flex items-center gap-2">
                      <List className="w-4 h-4" />
                      <span>Meus pedidos</span>
                    </Link>
                    <Link to="/profile" className="flex items-center">
                      <Contact className="w-4 h-4 mr-2" />
                      <span>Meus dados</span>
                    </Link>
                    <div>
                      <Button
                        className="text-rose-500 dark:text-rose-400"
                        size="custom"
                        variant="ghost"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Sair</span>
                      </Button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <NavLink to="/sign-in">
                  <CircleUserRound className="w-4 h-4" />
                  Entrar
                </NavLink>
                <NavLink to="/sign-up">
                  <PlusCircle className="w-4 h-4" />
                  Cadastrar
                </NavLink>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
