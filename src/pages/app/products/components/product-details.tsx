import { Edit, Trash2 } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { Product } from '@/@types/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useStore } from '@/store';

import { DeleteProduct } from './delete-product';
import { ProductEdit } from './product-edit';
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from '@/components/ui/tooltip';
import useWindowSize from '@/hooks/useWindowSize'; // Importando o hook

export const formatMoney = (value: number): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

const isUnavailable = (status: string, userType: string | undefined): boolean =>
  status === 'Indisponível' && userType === 'admin';

interface ProductDetailsProps {
  cupcake: Product;
  quantityInput: ReactNode;
}

export function ProductDetails({ cupcake, quantityInput }: ProductDetailsProps) {
  const [dialog, setDialog] = useState<'edit' | 'delete' | null>(null);
  const { width } = useWindowSize(); // Usando o hook para obter a largura da janela

  const { user } = useStore();

  const formattedPrice = formatMoney(cupcake.price);
  const unavailable = isUnavailable(cupcake.availability_status!, user?.user_type);

  const isScreenLarge = width > 767; // Verificando largura
  const isScreenMedium = width > 639; // Verificando largura

  return (
    <div
      className={`relative mt-4 w-full rounded-lg border bg-card p-4 shadow-sm ${
        unavailable ? 'cursor-not-allowed opacity-40' : ''
      }`}
    >
      {unavailable && (
        <p className="absolute right-5 top-5 z-10 text-lg font-semibold md:right-10 md:top-8 md:text-3xl">
          {cupcake.availability_status}
        </p>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col items-center sm:flex-row sm:h-28 gap-4 sm:gap-3">
          <img
            src={cupcake.img}
            alt={`${cupcake.name} - Imagem do cupcake`}
            className="h-28 w-28 sm:min-w-24 sm:max-w-24 rounded-md object-cover sm:h-full"
          />
          <div className="flex flex-col justify-between gap-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className='md:max-w-28'>
                    <p className="text-lg font-semibold">{isScreenLarge && cupcake.name.length > 12
                      ? cupcake.name.substring(0, 12).concat('...')
                      : cupcake.name}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{cupcake.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="max-w-28 min-w-20">
                <Badge className="text-sm">{cupcake.category}</Badge>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm">
                    {isScreenLarge && cupcake.description.length > 80
                      ? cupcake.description.substring(0, 50).concat('...')
                      : cupcake.description}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{cupcake.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isScreenMedium ? (
              <p className="text-lg font-semibold md:text-xl">
                {formattedPrice}
              </p>
            ) : null}
          </div>
        </div>

        {user?.user_type === 'admin' ? (
          <AdminControls
            isOpen={dialog}
            setDialog={setDialog}
            cupcake={cupcake}
          />
        ) : (
          !unavailable && (
            <div
              className={`flex ${isScreenMedium ? 'flex-col' : 'flex-row justify-between w-full items-end gap-4'}`}
            >
              {!isScreenMedium && (
                <p className="text-lg font-semibold">{formattedPrice}</p>
              )}
              <div className="flex flex-col items-center">
                <span className="p-1 text-muted-foreground">Quantidade</span>
                <div className="flex items-center gap-2 sm:gap-4">
                  {quantityInput}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// Componentes auxiliares para controle de administrador
interface AdminControlsProps {
  isOpen: 'edit' | 'delete' | null;
  setDialog: (dialog: 'edit' | 'delete' | null) => void;
  cupcake: Product;
}

function AdminControls({ isOpen, setDialog, cupcake }: AdminControlsProps) {
  return (
    <div className="flex gap-2">
      <Dialog open={isOpen === 'delete'} onOpenChange={() => setDialog(null)}>
        <DialogTrigger asChild>
          <Button
            size="custom"
            variant="ghost"
            onClick={() => setDialog('delete')}
          >
            <Trash2 className="h-5 w-5 text-rose-500" />
          </Button>
        </DialogTrigger>
        <DeleteProduct cupcake={cupcake} onClose={() => setDialog(null)} />
      </Dialog>

      <Dialog open={isOpen === 'edit'} onOpenChange={() => setDialog(null)}>
        <DialogTrigger asChild>
          <Button
            size="custom"
            variant="ghost"
            onClick={() => setDialog('edit')}
          >
            <Edit className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <ProductEdit cupcake={cupcake} onClose={() => setDialog(null)} />
      </Dialog>
    </div>
  );
}
