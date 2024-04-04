import { Helmet } from 'react-helmet-async'

import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { ProfileEdit } from './profile-edit'

export function Profile() {
  return (
    <>
      <Helmet title="Perfil" />
      <p className="pb-10 text-4xl font-semibold">Meu Perfil</p>
      <div className="grid h-96 w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <NavLink to="/orders">
              <p className="text-2xl">Meus pedidos</p>
            </NavLink>
            <NavLink to="/profile">
              <p className="text-2xl">Meus dados</p>
            </NavLink>
          </div>
          <Separator orientation="vertical" className="h-full" />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-lg font-semibold">NOME</p>
            <p className="text-lg text-muted-foreground">Maria Lopes</p>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="text-lg font-semibold">CONTATO</p>
              <p className="text-lg text-muted-foreground">(11) 98901-2376</p>
            </div>
            <div>
              <p className="text-lg font-semibold">E-MAIL</p>
              <p className="text-lg text-muted-foreground">email@email.com</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">SENHA</p>
            <p className="text-lg text-muted-foreground">********</p>
          </div>
          <div className="w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-10">Alterar</Button>
              </DialogTrigger>
              <ProfileEdit />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}
