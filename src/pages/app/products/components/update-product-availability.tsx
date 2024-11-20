import { useState } from 'react'
import { toast } from 'sonner'

import { Product, productStatus } from '@/@types/types'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useStore } from '@/store'

interface UpdateProductAvailabilityProps {
  cupcake: Product
  newStatus: productStatus
  onClose: () => void
}

export function UpdateProductAvailability({
  cupcake,
  newStatus,
  onClose,
}: UpdateProductAvailabilityProps) {
  const { updateAvailabilityStatus } = useStore()
  const [loading, setLoading] = useState(false)

  const isAvailable = newStatus === productStatus.available
  const actionText = isAvailable ? 'disponível' : 'indisponível'
  const buttonText = isAvailable
    ? 'Sim, desejo deixar disponível'
    : 'Sim, desejo deixar indisponível'
  const successMessage = `Status do produto alterado para ${actionText} com sucesso`
  const errorMessage = `Erro ao alterar o status do produto para ${actionText}`

  async function handleUpdateStatus() {
    try {
      setLoading(true)

      await updateAvailabilityStatus(cupcake.product_id, newStatus)

      toast.success(successMessage)
      onClose()
    } catch (error) {
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Alteração de disponibilidade</DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-[1.1rem] top-1 z-10 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Fechar"
        >
          ✕
        </button>
      </DialogHeader>

      <div className="mb-2 opacity-70">
        <p>
          O cupcake <strong>{cupcake.name}</strong> ficará {actionText}.
        </p>
        <p>Deseja concluir essa operação?</p>
      </div>

      <div className="flex gap-5">
        {!isAvailable && (
          <Button variant="secondary" type="button" onClick={onClose}>
            Não, quero voltar
          </Button>
        )}
        <Button
          variant={isAvailable ? 'secondary' : 'destructive'}
          onClick={handleUpdateStatus}
          disabled={loading}
        >
          {loading ? 'Alterando...' : buttonText}
        </Button>
      </div>
    </DialogContent>
  )
}
