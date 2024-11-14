import { Trash2 } from 'lucide-react'

import { OrderItems, Product } from '@/@types/types'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

import { formatMoney } from '../../products/components/product-details'

interface ProductDetails {
  cupcake: OrderItems & Pick<Product, 'name' | 'description' | 'img' | 'price'>
}

export function ProductsCheckout({ cupcake }: ProductDetails) {
  const { removeCartItem } = useStore()

  const formattedPrice = formatMoney(cupcake.price)

  function handleRemove() {
    removeCartItem(cupcake.order_item_id)
  }

  return (
    <div className="flex w-[98%] items-end justify-between rounded-lg border bg-card p-2 shadow-sm">
      <div className="flex gap-3">
        <img src={cupcake.img} alt="" className="h-32 min-w-[150px] rounded" />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">{cupcake.name}</p>
          <p className="text-sm">
            {cupcake.description.length > 60
              ? cupcake.description.substring(0, 60).concat('...')
              : cupcake.description}
          </p>
          <p className="text-sm font-semibold">
            Quantidade: <span>{cupcake.quantity}</span>
          </p>
          <p className="text-xl font-semibold">{formattedPrice}</p>
        </div>
      </div>
      <div className="flex flex-col rounded-md">
        <div className="flex items-center gap-4">
          <Button
            variant="destructive"
            title="Remover do carrinho"
            className="p-6"
            onClick={handleRemove}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
