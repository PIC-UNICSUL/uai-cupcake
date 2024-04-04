import { Minus, Plus } from 'lucide-react'

interface QuantityInputProps {
  size?: 'medium' | 'small'
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantityInput({
  size = 'medium',
  quantity,
  onIncrease,
  onDecrease,
}: QuantityInputProps) {
  return (
    <div
      className={`flex items-center rounded-md border ${(size === 'medium' && 'p-4') || (size === 'small' && 'px-2 py-1')}`}
    >
      <button
        className="h-[0.875rem] w-[0.875rem] cursor-pointer border-none bg-none text-foreground duration-100 hover:text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:text-foreground"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <Minus size={13} />
      </button>
      <span className="align-center bg-trasparent mx-1 flex w-7  items-center justify-center border-none focus:outline-none">
        {quantity}
      </span>
      <button
        className="h-[0.875rem] w-[0.875rem] cursor-pointer border-none bg-none text-foreground duration-100 hover:text-primary disabled:cursor-default disabled:opacity-40 disabled:hover:text-foreground"
        onClick={onIncrease}
      >
        <Plus size={13} />
      </button>
    </div>
  )
}
