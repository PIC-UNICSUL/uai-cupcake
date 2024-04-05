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
import { ScrollArea } from '@/components/ui/scroll-area'
import { SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
    <DialogContent className="sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Pedido: 12
        </DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <div className="space-y-6">
          <div>
            <ScrollArea className="h-52">
              <Table className="w-full">
                <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Categoria</TableHead>
                    <TableHead className="text-right">Qtd.</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>Pistache</TableCell>
                    <TableCell className="text-right">Tradicional</TableCell>
                    <TableCell className="text-right">4</TableCell>
                    <TableCell className="text-right">R$ 15,00</TableCell>
                    <TableCell className="text-right">R$ 60,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pistache</TableCell>
                    <TableCell className="text-right">Tradicional</TableCell>
                    <TableCell className="text-right">4</TableCell>
                    <TableCell className="text-right">R$ 15,00</TableCell>
                    <TableCell className="text-right">R$ 60,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pistache</TableCell>
                    <TableCell className="text-right">Tradicional</TableCell>
                    <TableCell className="text-right">4</TableCell>
                    <TableCell className="text-right">R$ 15,00</TableCell>
                    <TableCell className="text-right">R$ 60,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pistache</TableCell>
                    <TableCell className="text-right">Tradicional</TableCell>
                    <TableCell className="text-right">4</TableCell>
                    <TableCell className="text-right">R$ 15,00</TableCell>
                    <TableCell className="text-right">R$ 60,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pistache</TableCell>
                    <TableCell className="text-right">Tradicional</TableCell>
                    <TableCell className="text-right">4</TableCell>
                    <TableCell className="text-right">R$ 15,00</TableCell>
                    <TableCell className="text-right">R$ 60,00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>

            <Table className="">
              <TableFooter className="border-0 border-b-2">
                <TableRow>
                  <TableCell colSpan={4}>Total do pedido</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ 60,00
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        <Separator className="my-6 h-px w-full" />

        <FormProvider {...confirmStatusForm}>
          <form onSubmit={handleSubmit(handleConfirmStatus)}>
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <p className="text-sm font-semibold">NOME</p>
                  <p className="text-sm text-muted-foreground">
                    Lucas Monentenegro
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <p>Status:</p>
                  <SelectMenu defaultValue="pending" size="base">
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="prodessing">Em preparo</SelectItem>
                    <SelectItem value="ready">Pronto</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectMenu>
                </div>
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
                <div>
                  <p className="text-sm font-semibold">Criado há</p>
                  <p className="text-sm text-muted-foreground">12/12/2012</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
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
      </div>
    </DialogContent>
  )
}

/* <div className="mb-8 flex flex-col gap-4">
          <div className="flex gap-4">
            <div>
              <p className="text-sm font-semibold">NOME</p>
              <p className="text-sm text-muted-foreground">
                Lucas Monentenegro
              </p>
            </div>

            <div>
              <div>
                <p className="text-sm font-semibold uppercase">Status</p>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-sm font-semibold">CONTATO</p>
              <p className="text-sm text-muted-foreground">(99) 99999-9999</p>
            </div>
            <div>
              <p className="text-sm font-semibold">E-MAIL</p>
              <p className="text-sm text-muted-foreground">email@email.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Criado há</p>
              <p className="text-sm text-muted-foreground">12/12/2012</p>
            </div>
          </div>
        </div> */
