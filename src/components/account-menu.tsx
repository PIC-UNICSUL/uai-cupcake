import { ChevronDown, Contact, List, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'

export function AccountMenu() {
  const navigate = useNavigate()
  const { logout ,user} = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="custom"
          className="flex items-center gap-2 p-2 text-xs select-none sm:text-sm"
        >
          Meu perfil
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col w-full">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {user?.name}
          </span>
          <span className="overflow-hidden text-xs font-normal text-ellipsis whitespace-nowrap text-muted-foreground">
            {user?.mail}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/orders" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            <span>Meus pedidos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/profile" className="flex items-center">
            <Contact className="w-4 h-4 mr-2" />
            <span>Meus dados</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-rose-500 dark:text-rose-400"
          onClick={() => [logout(), navigate('/')]}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
