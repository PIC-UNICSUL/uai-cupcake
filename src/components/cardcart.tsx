import { Trash2 } from 'lucide-react'
import { useState } from 'react'

import { QuantityInput } from './quantity-input'

export function CardCart() {
  const [quantity, setQuantity] = useState(1)

  function handleIncrease() {
    setQuantity((prev) => prev + 1)
  }

  function handleDecrease() {
    setQuantity((prev) => prev - 1)
  }

  return (
    <div className="flex w-full items-center gap-4">
      <div className="max-w-[100px]">
        <img src="/cupcakeDes.jpg" alt="" className="rounded-sm object-cover" />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4">
          <p className="">Nome</p>
          <span className="font-bold">R$ 00,00</span>
        </div>
        <div className="flex items-end gap-2">
          <QuantityInput
            size="small"
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
          <button className="block rounded-sm border bg-transparent px-2 py-2 hover:bg-muted">
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      </div>
    </div>
  )
}
