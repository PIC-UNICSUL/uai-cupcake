import { Helmet } from 'react-helmet-async';

import { NavLink } from '@/components/nav-link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ProfileEdit } from './components/profile-edit';
import { useAuth } from '@/contexts/auth-context';

export function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Helmet title="Perfil" />
      <p className="pb-0 text-xl font-semibold sm:pb-10 sm:text-2xl md:text-4xl">
        Meu Perfil
      </p>
      <div className="grid h-96 w-full sm:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="flex items-start lg:gap-12">
          <div className="flex gap-2 sm:flex-col sm:gap-4">
            <NavLink to="/orders">
              <span className="text-lg sm:text-xl md:text-2xl">
                Meus pedidos
              </span>
            </NavLink>
            <NavLink to="/profile">
              <span className="text-lg sm:text-xl md:text-2xl">Meus dados</span>
            </NavLink>
          </div>
          <Separator
            orientation="vertical"
            className="hidden h-full md:block"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-semibold sm:text-base md:text-lg">
              NOME
            </p>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              {user?.name}
            </p>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="text-sm font-semibold sm:text-base md:text-lg">
                CONTATO
              </p>
              <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
                {user?.phone}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold sm:text-base md:text-lg">
                E-MAIL
              </p>
              <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
                {user?.mail}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold sm:text-base md:text-lg">
              SENHA
            </p>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              ********
            </p>
          </div>
          <div className="w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-8 md:px-10">Alterar</Button>
              </DialogTrigger>
              <ProfileEdit
                name={user?.name ?? ''}
                email={user?.mail ?? ''}
                phone={user?.phone ?? ''}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
