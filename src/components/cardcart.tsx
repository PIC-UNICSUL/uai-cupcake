import { Trash2 } from 'lucide-react'

import { OrderItems, Product } from '@/@types/types'
import { formatMoney } from '@/pages/app/products/components/product-details'
import { useStore } from '@/store'

import { QuantityInput } from './quantity-input'

interface CupcakeCardCartProps {
  cartItem: OrderItems
}

export function CardCart({ cartItem }: CupcakeCardCartProps) {
  const { removeCartItem, changeCartItemQuantity, products, user } = useStore()

  const cupcake = products.find(
    (product) => product.product_id === cartItem.product_id,
  ) as Product

  function handleIncrease() {
    changeCartItemQuantity(cartItem.order_item_id, 'increase', user?.email!)
  }

  function handleDecrease() {
    changeCartItemQuantity(cartItem.order_item_id, 'decrease', user?.email!)
  }

  function handleRemove() {
    removeCartItem(cartItem.order_item_id, user?.email!)
  }

  const formattedPrice = formatMoney(cupcake?.price * cartItem.quantity)

  return (
    <div className="flex w-full items-center gap-4 rounded-lg border bg-card p-1 shadow-sm">
      <div className="max-w-10">
        {cupcake?.img && (
          <img
            src={cupcake.img}
            alt={cupcake.name}
            className="max-h-20 min-h-14 min-w-12 rounded-sm object-cover"
          />
        )}
      </div>
      <div className="flex w-full justify-between">
        <div className="flex w-32 flex-col gap-4">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {cupcake?.name}
          </p>
          <span className="font-bold">{formattedPrice}</span>
        </div>
        <div className="flex items-end gap-2">
          <QuantityInput
            size="small"
            quantity={cartItem.quantity}
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
