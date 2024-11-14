import { ChevronDown, Contact, List, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { useStore } from '@/store'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const { signout, user } = useStore()
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="custom"
          className="flex select-none items-center gap-2 p-2 text-xs sm:text-sm"
        >
          Meu perfil
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex w-full flex-col">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {user?.name}
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-normal text-muted-foreground">
            {user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/orders" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            <span>Meus pedidos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/profile" className="flex items-center">
            <Contact className="mr-2 h-4 w-4" />
            <span>Meus dados</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-rose-500 dark:text-rose-400"
          onClick={() => [signout(), navigate('/')]}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
