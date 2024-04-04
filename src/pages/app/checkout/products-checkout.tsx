import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ProductsCheckout() {
  return (
    <div className="flex w-[98%] items-end justify-between">
      <div className="flex gap-3">
        <img src="/cupcakeDes.jpg" alt="" className="w-[150px]" />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">Nome</p>
          <p className="text-sm">Descrição</p>
          <p className="text-sm">
            Quantidade: <span>10</span>
          </p>
          <p className="text-xl font-semibold">R$ 00,00</p>
        </div>
      </div>
      <div className="flex flex-col rounded-md">
        <div className="flex items-center gap-4">
          <Button
            variant="destructive"
            title="Adicionar ao carrinho"
            className="p-6"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
