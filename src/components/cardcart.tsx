import { Trash2 } from 'lucide-react'

import { useStore } from '@/store'
import { formatMoney } from '@/pages/app/products/components/product-details'

import { QuantityInput } from './quantity-input'
import { CartItem } from '@/@types/types'

interface CupcakeCardCartProps {
  cupcake: CartItem
}

export function CardCart({ cupcake }: CupcakeCardCartProps) {
  const { removeCartItem, changeCartItemQuantity } = useStore()

  function handleIncrease() {
    changeCartItemQuantity(cupcake.id, 'increase')
  }

  function handleDecrease() {
    changeCartItemQuantity(cupcake.id, 'decrease')
  }

  function handleRemove() {
    removeCartItem(cupcake.id)
  }

  const formattedPrice = formatMoney(cupcake.price)

  return (
    <div className="flex w-full items-center gap-4">
      <div className="max-w-10">
        <img
          src={cupcake.img}
          alt=""
          className="max-h-20 min-h-14 min-w-12 rounded-sm object-cover"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4 w-32">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">{cupcake.name}</p>
          <span className="font-bold">{formattedPrice}</span>
        </div>
        <div className="flex items-end gap-2">
          <QuantityInput
            size="small"
            quantity={cupcake.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
          />
          <button
            className="block rounded-sm border bg-transparent px-2 py-2 hover:bg-muted"
            onClick={handleRemove}
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      </div>
    </div>
  )
}
