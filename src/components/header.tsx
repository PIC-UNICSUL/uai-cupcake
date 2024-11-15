import {
  CircleUserRound,
  Home,
  Mail,
  Menu,
  PlusCircle,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

import { useStore } from '@/store'

import { Logo } from './logo'
import { NavLink } from './nav-link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

import { User, userType } from '@/@types/types'
import { AccountMenu } from './account-menu'
import { Cart } from './cart'

export function Header() {
  const { signed, user, signout, promoteToAdmin, cartQuantity } = useStore()
  const navigate = useNavigate()

  const handlePromoteToAdmin = useCallback(() => {
    if (user && user.user_id) promoteToAdmin(user.user_id)
  }, [user, promoteToAdmin])

  const handleSignOut = useCallback(() => {
    signout()
    navigate('/')
  }, [signout, navigate])

  const cartQuantityLabel = useMemo(
    () => (cartQuantity > 0 ? cartQuantity : ''),
    [cartQuantity]
  )

  return (
    <header className="border-b fixed z-10 w-full bg-white">
      <div className="lg-gap-6 flex justify-between h-16 items-center gap-4 px-6">
        <Logo className="hidden h-6 w-6 fill-foreground sm:block" />
        <Separator orientation="vertical" className="hidden h-6 sm:block" />

        {/* Links de Navegação */}
        <NavigationLinks />

        {/* Área de Ações do Usuário */}
        <div className="ml-auto flex items-center gap-1 space-x-2">
          {signed ? (
            <UserMenu
              user={user}
              cartQuantityLabel={cartQuantityLabel}
              onSignOut={handleSignOut}
              onPromoteToAdmin={handlePromoteToAdmin}
            />
          ) : (
            <GuestMenu />
          )}
        </div>

        {/* Trigger do Menu Mobile */}
        {!signed && <MobileMenu />}
      </div>
    </header>
  )
}

// Componentes Separados para Links de Navegação, Menu de Usuário e Menu Mobile
function NavigationLinks() {
  return (
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
  )
}

function GuestMenu() {
  return (
    <div className="hidden space-x-2 sm:flex">
      <NavLink to="/sign-in">Entrar</NavLink>
      <NavLink to="/contact">Contato</NavLink>
    </div>
  )
}

interface UserMenuProps {
  user: User | null
  cartQuantityLabel: number | ''
  onSignOut: () => void
  onPromoteToAdmin: () => void
}

  

function AdminMenu({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="space-x-2 sm:flex">
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

function UserMenu({ user, cartQuantityLabel, onSignOut, onPromoteToAdmin }: UserMenuProps) {
  return (
    <>
        {user?.user_type === userType.admin ? (
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

function CustomerMenu({ cartQuantityLabel, user, onPromoteToAdmin }: CustomerMenuProps) {
  return (
    <>
      <div className="flex justify-center rounded-lg border hover:bg-muted">
        <Sheet>
            <SheetTrigger className="flex items-center gap-2 px-2 py-2">
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-semibold sm:text-sm">{cartQuantityLabel}</span>
            </SheetTrigger>
            <Cart />
        </Sheet>
      </div>
      <AccountMenu />
      {user?.email === 'admin@email.com' && user.user_type !== 'admin' && (
        <Button size="custom" variant="ghost" onClick={onPromoteToAdmin} className="p-2">
            Admin
        </Button>
      )}
    </>
  )
}

function MobileMenu() {
  return (
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
  )
}


// import {
//   CircleUserRound,
//   Home,
//   Mail,
//   Menu,
//   PlusCircle,
//   ShoppingCart,
//   UtensilsCrossed,
// } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// import { useStore } from '@/store'

// import { AccountMenu } from './account-menu'
// import { Cart } from './cart'
// import { Logo } from './logo'
// import { NavLink } from './nav-link'
// import { Button } from './ui/button'
// import { Separator } from './ui/separator'
// import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

// export function Header() {
//   const { signed, user, signout, promoteToAdmin, cartQuantity } = useStore()

//   const navigate = useNavigate()

//   const handleVersionAdmin = () => {
//     if (!user) return
//     promoteToAdmin(user.user_id!)
//   }

//   return (
//     <div className="border-b">
//       <div className="lg-gap-6 flex h-16 items-center gap-4 px-6">
//         <Logo className="hidden h-6 w-6 fill-foreground sm:block" />

//         <Separator orientation="vertical" className="hidden h-6 sm:block" />

//         <nav className="flex items-center space-x-4 lg:space-x-6">
//           <NavLink to="/">
//             <Home className="h-4 w-4" />
//             Início
//           </NavLink>
//           <NavLink to="/products">
//             <UtensilsCrossed className="h-4 w-4" />
//             Cupcakes
//           </NavLink>
//         </nav>

//         <div className="ml-auto flex items-center gap-1 space-x-2">
//           {signed ? (
//             <>
//               {user?.user_type == 'admin' ? (
//                 <div className="space-x-2 sm:flex">
//                   <NavLink to="/orders">Pedidos</NavLink>
//                   <Button
//                     className="text-rose-500 dark:text-rose-400"
//                     size="custom"
//                     variant="ghost"
//                     onClick={() => [signout(), navigate('/')]}
//                   >
//                     <span>Sair</span>
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex justify-center rounded-lg border hover:bg-muted">
//                     <Sheet>
//                       <SheetTrigger className="flex items-center gap-2 px-2 py-2">
//                         <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
//                         <span
//                           className={`${cartQuantity == 0 && 'hidden'} text-xs font-semibold sm:text-sm`}
//                         >
//                           {cartQuantity > 0 && cartQuantity}
//                         </span>
//                       </SheetTrigger>
//                       <Cart />
//                     </Sheet>
//                   </div>
//                   <AccountMenu />
//                   {user?.email == 'admin@email.com' &&
//                     user?.user_type !== 'admin' && (
//                       <Button
//                         size="custom"
//                         variant="ghost"
//                         onClick={() => handleVersionAdmin()}
//                         className="b p-2"
//                       >
//                         Admin
//                       </Button>
//                     )}
//                 </>
//               )}
//             </>
//           ) : (
//             <div className="hidden space-x-2 sm:flex">
//               <NavLink to="/sign-in">Entrar</NavLink>
//               <NavLink to="/contact">Contato</NavLink>
//             </div>
//           )}
//         </div>

//         {/* Mobile menu trigger */}
//         {signed ? null : (
//           <div className="ml-auto sm:hidden">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" className="p-2">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[200px] p-4">
//                 <nav className="flex flex-col space-y-4">
//                   <NavLink to="/sign-in">
//                     <CircleUserRound className="h-4 w-4" />
//                     Entrar
//                   </NavLink>
//                   <NavLink to="/sign-up">
//                     <PlusCircle className="h-4 w-4" />
//                     Cadastrar
//                   </NavLink>
//                   <NavLink to="/contact">
//                     <Mail className="h-4 w-4" />
//                     Contato
//                   </NavLink>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
