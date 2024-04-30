import { ShoppingCart } from 'lucide-react'

import { QuantityInput } from '@/components/quantity-input'
import { Button } from '@/components/ui/button'
import { CupcakesInfo } from './products'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

interface ProductDetailsProps {
  cupcake: CupcakesInfo
}

export function ProductDetails({
  cupcake
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity((state) => state + 1)
  }

  function handleDecrease() {
    setQuantity((state) => state - 1)
  }

  return (
    <div className="pb-4">
      <div className="flex w-full items-end justify-between">
        <div className="flex gap-3">
          <div className="w-[150px] h-28">
            <img src={cupcake.img} alt="" className="h-full w-full rounded-md" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-5 items-center">
              <p className="text-lg font-semibold">{cupcake.name}</p>
              {cupcake.categories.length > 1 ? cupcake.categories.map(category => {
                return <Badge className="text-sm">{category}</Badge>
              }): (
                <Badge className="text-sm">{cupcake.categories}</Badge>
              )}
              
            </div>
            <p className="text-sm w-4/5">{cupcake.description}</p>
            <p className="text-xl font-semibold">{(cupcake.priceInCents / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}</p>
          </div>
        </div>
        <div className="flex flex-col rounded-md">
          <span className="p-1 text-muted-foreground">Quantidade</span>
          <div className="flex items-center gap-4">
            <QuantityInput
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
            <Button title="Adicionar ao carrinho" className="p-6">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
