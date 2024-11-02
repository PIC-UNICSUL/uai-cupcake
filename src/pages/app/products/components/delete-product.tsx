import { useState } from 'react'
import { toast } from 'sonner'

import { Product, productStatus } from '@/@types/types'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useStore } from '@/store'

interface DeleteProductProps {
  cupcake: Product
  onClose: () => void
}

export function DeleteProduct({ cupcake, onClose }: DeleteProductProps) {
  const { updateAvailabilityStatus } = useStore()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    try {
      setLoading(true)

      await updateAvailabilityStatus(
        cupcake.product_id,
        productStatus.unavailable,
      )

      toast.success('Produto excluído com sucesso')
      onClose() // Fecha o modal apenas se a exclusão for bem-sucedida
    } catch (error) {
      toast.error('Erro ao excluir o produto')
    } finally {
      setLoading(false)
    }
  }
  // function handleDelete() {
  //     updateAvailabilityStatus(cupcake.id, productStatus.unavailable);
  //     toast.success('Produto excluído com sucesso')
  // }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmação de exclusão</DialogTitle>
      </DialogHeader>

      <div className="mb-2 opacity-70">
        <p>
          O cupcake <strong>{cupcake.name}</strong> não ficará mais disponível.
        </p>
        <p>Deseja concluir essa operação?</p>
      </div>

      <div className="flex gap-5">
        <DialogClose asChild>
          <Button variant="secondary" type="button">
            Não, quero voltar
          </Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
          {loading ? 'Excluindo...' : 'Sim, desejo excluir'}
        </Button>
      </div>
    </DialogContent>
  )
}
