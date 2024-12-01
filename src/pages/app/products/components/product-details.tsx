import { Edit, Eye, EyeOff } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { productStatus } from '@/@types/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useWindowSize from '@/hooks/useWindowSize';

import { ProductEdit } from './product-edit';
import { UpdateProductAvailability } from './update-product-availability';
import { useAuth } from '@/contexts/auth-context';

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

export function ProductDetails({
  cupcake,
  quantityInput,
}: ProductDetailsProps) {
  const [dialog, setDialog] = useState<'edit' | 'updateAvailability' | null>(
    null,
  );
  const { width } = useWindowSize();
  const { role, user } = useAuth();

  const formattedPrice = formatMoney(cupcake.price);
  const unavailable = isUnavailable(
    cupcake.availabilityStatus!,
    user?.role === 'ADMIN' ? 'admin' : undefined,
  );

  // const isScreenLarge = width > 767
  const isScreenMedium = width > 639;

  return (
    <div className="relative w-full p-4 mt-4 border rounded-lg shadow-sm bg-card">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div
          className={`flex w-full flex-col items-center gap-4 sm:h-28 sm:flex-row sm:gap-3 ${unavailable ? 'cursor-not-allowed opacity-40' : ''}`}
        >
          {cupcake.photos && (
            <img
              src={cupcake?.photos}
              alt={`${cupcake.name} - Imagem do cupcake`}
              className="object-cover rounded-md h-28 w-28 sm:h-full sm:min-w-24 sm:max-w-24"
            />
          )}
          <div className="flex flex-col items-stretch justify-between w-full gap-1">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-lg font-semibold">{cupcake.name}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{cupcake.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                <Badge className="text-sm">{cupcake.category}</Badge>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm line-clamp-3 sm:line-clamp-2">
                    {cupcake.description}
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

        {role === 'ADMIN' ? (
          <AdminControls
            isOpen={dialog}
            setDialog={setDialog}
            cupcake={cupcake}
          />
        ) : (
          !unavailable && (
            <div
              className={`flex ${isScreenMedium ? 'flex-col' : 'w-full flex-row items-end justify-between gap-4'}`}
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
  isOpen: 'edit' | 'updateAvailability' | null;
  setDialog: (dialog: 'edit' | 'updateAvailability' | null) => void;
  cupcake: Product;
}

function AdminControls({ isOpen, setDialog, cupcake }: AdminControlsProps) {
  const unavailable = cupcake.availabilityStatus === 'UNAVAILABLE';

  return (
    <div className="flex gap-2">
      <Dialog
        open={isOpen === 'updateAvailability'}
        onOpenChange={(isOpen) =>
          setDialog(isOpen ? 'updateAvailability' : null)
        }
      >
        <DialogTrigger asChild>
          <Button
            size="custom"
            variant="ghost"
            onClick={() => setDialog('updateAvailability')}
          >
            {unavailable ? (
              <Eye className="w-5 h-5 text-green-500" />
            ) : (
              <EyeOff className="w-5 h-5 text-rose-500" />
            )}
          </Button>
        </DialogTrigger>
        <UpdateProductAvailability
          cupcake={cupcake}
          onClose={() => setDialog(null)}
          newStatus={
            unavailable ? productStatus.available : productStatus.unavailable
          }
        />
      </Dialog>

      <Dialog
        open={isOpen === 'edit'}
        onOpenChange={(isOpen) => setDialog(isOpen ? 'edit' : null)}
      >
        <DialogTrigger asChild>
          <Button
            size="custom"
            variant="ghost"
            onClick={() => setDialog('edit')}
          >
            <Edit className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <ProductEdit cupcake={cupcake} onClose={() => setDialog(null)} />
      </Dialog>
    </div>
  );
}
