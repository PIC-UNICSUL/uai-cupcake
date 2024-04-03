import { Minus, Plus } from 'lucide-react'

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
          <img src="/cupcakeDes.jpg" alt="" className="w-[150px]" />
          <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">Nome</p>
            <p className="text-sm">Categoria</p>
            <p className="text-sm">Descrição</p>
            <p className="text-xl font-semibold">R$ 00,00</p>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-md">
          <span className="text-muted-foreground">Quantidade</span>
          <div className="flex items-center rounded-md border">
            <button
              className="cursor-pointer border-none bg-none py-4 pl-4 text-foreground duration-100 disabled:cursor-default disabled:opacity-40"
              onClick={onDecrease}
              disabled={quantity <= 1}
            >
              <Minus size={13} />
            </button>
            <span className="align-center bg-trasparent mx-1 flex w-5 items-center justify-center border-none px-6 py-4 focus:outline-none">
              {quantity}
            </span>
            <button
              className="cursor-pointer border-none bg-none py-4 pr-4 text-foreground duration-100 disabled:cursor-default disabled:opacity-40 "
              onClick={onIncrease}
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
