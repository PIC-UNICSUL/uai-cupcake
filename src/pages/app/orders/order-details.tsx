import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { SelectMenu } from '@/components/menus'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

enum StatusDetails {
  pending = 'Pendente',
  prodessing = 'Em preparo',
  ready = 'Pronto',
  delivered = 'Entregue',
  canceled = 'Cancelado',
}

const confirmStatusFormSchema = zod.object({
  status: zod.nativeEnum(StatusDetails),
})

export type ConfirmStatusFormData = zod.infer<typeof confirmStatusFormSchema>

export function OrderDetails() {
  const confirmStatusForm = useForm<ConfirmStatusFormData>({
    resolver: zodResolver(confirmStatusFormSchema),
    defaultValues: {
      status: StatusDetails.pending,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = confirmStatusForm

  const handleConfirmStatus = async (data: ConfirmStatusFormData) => {
    console.log(data)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 12</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <FormProvider {...confirmStatusForm}>
        <form onSubmit={handleSubmit(handleConfirmStatus)}>
          <div className="mb-2 flex items-center justify-end gap-2">
            <p>Status:</p>
            <SelectMenu defaultValue="pending" size="base">
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="prodessing">Em preparo</SelectItem>
              <SelectItem value="ready">Pronto</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
            </SelectMenu>
          </div>

          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N. PEDIDO</TableHead>
                  <TableHead>QUANTIDADE</TableHead>
                  <TableHead>VALOR TOTAL</TableHead>
                  <TableHead>DATA DA COMPRA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-muted-foreground">
                    12
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    1
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    R$ 12,00
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">
                    12/12/2012
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator className="my-6 h-px w-full" />

            <div className="mb-8 flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold">NOME</p>
                <p className="text-sm text-muted-foreground">
                  Lucas Monentenegro
                </p>
              </div>
              <div className="flex gap-6">
                <div>
                  <p className="text-sm font-semibold">CONTATO</p>
                  <p className="text-sm text-muted-foreground">
                    (99) 99999-9999
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">E-MAIL</p>
                  <p className="text-sm text-muted-foreground">
                    email@email.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" className="px-14 py-6">
              Cancelar
            </Button>
            <Button
              variant="outline"
              className="px-14 py-6"
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
      </FormProvider>
    </DialogContent>
  )
}
