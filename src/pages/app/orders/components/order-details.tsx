import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { useStore } from '@/store'

import { formatMoney } from '../../products/components/product-details'
import { CartItem, OrderStatus } from '@/@types/types'

interface OrderDetailsProps {
  id: number
  order: CartItem[]
  total: number
  date: string
  status: OrderStatus
  buyerName?: string
  buyerEmail?: string
  buyerPhone?: string
}

const confirmStatusFormSchema = zod.object({
  status: zod.nativeEnum(OrderStatus),
})

export type ConfirmStatusFormData = zod.infer<typeof confirmStatusFormSchema>

export function OrderDetails({
  order,
  id,
  total,
  date,
  status,
  buyerEmail,
  buyerName,
  buyerPhone
}: OrderDetailsProps) {
  const confirmStatusForm = useForm<ConfirmStatusFormData>({
    resolver: zodResolver(confirmStatusFormSchema),
    defaultValues: {
      status,
    },
  })

  const { updateOrderStatus, user } = useStore()

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = confirmStatusForm

  const handleConfirmStatus = async (data: ConfirmStatusFormData) => {
    updateOrderStatus(id, data.status)
    toast.success('Status do pedido atualizado com sucesso!')
  }

  return (
    <DialogContent className="rounded-lg sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Pedido: {id}
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
                  {order.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">
                        {item.categories[0]}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMoney(item.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatMoney(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <Table className="">
              <TableFooter className="border-0 border-b-2">
                <TableRow>
                  <TableCell colSpan={4}>Total do pedido</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatMoney(total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        <Separator className="my-6 h-px w-full" />
        {user?.admin ? (
          <FormProvider {...confirmStatusForm}>
            <form onSubmit={handleSubmit(handleConfirmStatus)}>
              <div className="mb-8 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div>
                    <p className="text-sm font-semibold">NOME</p>
                    <p className="text-sm text-muted-foreground">
                      {buyerName}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <p>Status:</p>
                    <SelectMenu
                      defaultValue={status}
                      onValueChange={(value) =>
                        setValue('status', value as OrderStatus)
                      }
                      size="base"
                    >
                      <SelectItem value={OrderStatus.pending}>
                        Pendente
                      </SelectItem>
                      <SelectItem value={OrderStatus.preparation}>
                        Em preparo
                      </SelectItem>
                      <SelectItem value={OrderStatus.ready}>Pronto</SelectItem>
                      <SelectItem value={OrderStatus.delivered}>
                        Entregue
                      </SelectItem>
                      <SelectItem value={OrderStatus.cancelled}>
                        Cancelado
                      </SelectItem>
                    </SelectMenu>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm font-semibold">CONTATO</p>
                    <p className="text-sm text-muted-foreground">
                      {buyerPhone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">E-MAIL</p>
                    <p className="text-sm text-muted-foreground">
                      {buyerEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Criado</p>
                    <p className="text-sm text-muted-foreground">{date}</p>
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
        ) : (
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-4">
              <div>
                <p className="text-sm font-semibold">NOME</p>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm font-semibold">STATUS</p>
                <p className="text-sm text-muted-foreground">{status}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-sm font-semibold">CONTATO</p>
                <p className="text-sm text-muted-foreground">{user?.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">E-MAIL</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Criado</p>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  )
}
