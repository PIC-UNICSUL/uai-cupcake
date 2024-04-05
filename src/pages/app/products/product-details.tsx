import { ShoppingCart } from 'lucide-react'

import { QuantityInput } from '@/components/quantity-input'
import { Button } from '@/components/ui/button'

interface ProductDetailsProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function ProductDetails({
  quantity,
  onIncrease,
  onDecrease,
}: ProductDetailsProps) {
  return (
    <div className="pb-4">
      <div className="flex w-full items-end justify-between">
        <div className="flex gap-3">
          <img src="/cupcakeDes.jpg" alt="" className="w-[150px] rounded-md" />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">Nome</p>
            <p className="text-sm">Categoria</p>
            <p className="text-sm">Descrição</p>
            <p className="text-xl font-semibold">R$ 00,00</p>
          </div>
        </div>
        <div className="flex flex-col rounded-md">
          <span className="p-1 text-muted-foreground">Quantidade</span>
          <div className="flex items-center gap-4">
            <QuantityInput
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
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
