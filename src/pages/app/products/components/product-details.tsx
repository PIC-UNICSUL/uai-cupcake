import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'

import { Cupcake } from '@/@types/types'
import { useStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { ProductEdit } from './product-edit'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

interface ProductDetailsProps {
  cupcake: Cupcake
  quantityInput: ReactNode
  handleDelete?: (id: number) => void
}

export function formatMoney(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

export function ProductDetails({
  cupcake,
  quantityInput,
  handleDelete
}: ProductDetailsProps) {
  const { user } = useStore()

  const formattedPrice = formatMoney(cupcake.price)

  const handleSave = (data: any) => {
    console.log(data)
  };

  return (
    <div className="mt-4">
      <div className="flex w-full items-end justify-between">
        <div className="flex h-28 gap-3">
          <div className="h-full">
            <img
              src={cupcake.img}
              alt=""
              className="h-full min-w-28 max-w-28 rounded-md"
            />
          </div>
          <div className="flex justify-between flex-col gap-1">
            <div className="flex items-center gap-5">
              <p className="text-lg font-semibold">{cupcake.name}</p>
              {cupcake.categories.length > 1 ? (
                cupcake.categories.map((category, id) => {
                  return (
                    <Badge key={id} className="text-sm">
                      {category}
                    </Badge>
                  )
                })
              ) : (
                <Badge className="text-sm">{cupcake.categories}</Badge>
              )}
            </div>
            <p className="w-4/5 text-sm">{cupcake.description.length > 80 ? cupcake.description.substring(0, 80).concat("...") : cupcake.description}</p>
            <p className="text-xl font-semibold">{formattedPrice}</p>
          </div>
        </div>
        {user?.admin == true ? (
          <div className="flex gap-2">
            <Button size="custom" variant="ghost" onClick={() => handleDelete?.(cupcake.id)}>
              <Trash2 className="h-5 w-5 text-rose-500" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="custom" variant="ghost">
                  <Edit className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <ProductEdit
                cupcake={cupcake}
                onSave={handleSave}
              />
            </Dialog>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-md">
            <span className="p-1 text-muted-foreground">Quantidade</span>
            <div className="flex items-center gap-4">{quantityInput}</div>
          </div>
        )}
      </div>
    </div>
  )
}
