import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as zod from 'zod'

import { OrderItems, OrderStatus } from '@/@types/types'
import { SelectMenu } from '@/components/menus'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { formatOrderDate } from '@/utils/date-utils'

import { formatMoney } from '../../products/components/product-details'
import { useAuth } from '@/contexts/auth-context'

interface OrderDetailsProps {
  id: number
  order: OrderItems[]
  total: string
  date: string
  updatedDate?: Date
  status: OrderStatus
  buyerName?: string
  buyerEmail?: string
  buyerPhone?: string
  receiverName?: string
}

// Função de fábrica para instanciar o schema
const createConfirmStatusFormSchema = () =>
  zod.object({
    status: zod.nativeEnum(OrderStatus),
    receiverName: zod.string().optional(),
  })

export type ConfirmStatusFormData = zod.infer<
  ReturnType<typeof createConfirmStatusFormSchema>
>

export function OrderDetails({
  order,
  id,
  total,
  date,
  status,
  buyerEmail,
  buyerName,
  buyerPhone,
  updatedDate,
  receiverName,
}: OrderDetailsProps) {
  const { updateOrderStatus, user, fetchProduct } = useStore()
  const { role } = useAuth()
  
  const confirmStatusForm = useForm<ConfirmStatusFormData>({
    resolver: zodResolver(createConfirmStatusFormSchema()),
    defaultValues: {
      status,
      receiverName: receiverName || undefined,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = confirmStatusForm

  const calculateSubtotal = (price: number, quantity: number) =>
    formatMoney(price * quantity)

  const handleConfirmStatus = async (data: ConfirmStatusFormData) => {
    if (data.status === OrderStatus.delivered && !data.receiverName) {
      toast.error('Por favor, insira o nome de quem retirou o pedido.')
      return
    }

    updateOrderStatus(id, data.status, data.receiverName)
    toast.success('Status do pedido atualizado com sucesso!')
  }

  const renderContactInfo = (label: string, value: string | undefined) => (
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  )

  return (
    <DialogContent className="rounded-lg sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          Pedido: {id}
        </DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
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
              {order.map((item) => {
                const product = fetchProduct(item.product_id)
                return (
                  <TableRow key={item.order_item_id}>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell className="text-right">
                      {product?.category}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatMoney(product?.price || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      {calculateSubtotal(product?.price || 0, item.quantity)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>

        <Table>
          <TableFooter className="border-0 border-b-2">
            <TableRow>
              <TableCell colSpan={4}>Total do pedido</TableCell>
              <TableCell className="font-medium text-right">{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <Separator className="w-full h-px my-6" />
        {role === 'ADMIN'? (
          <FormProvider {...confirmStatusForm}>
            <form onSubmit={handleSubmit(handleConfirmStatus)}>
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-4">
                  {renderContactInfo('NOME', buyerName)}
                  {receiverName &&
                    renderContactInfo(
                      'RETIRADO',
                      formatOrderDate(updatedDate!),
                    )}
                  <div className="flex items-center justify-end gap-2">
                    <p>Status:</p>
                    <SelectMenu
                      defaultValue={status}
                      onValueChange={(value) =>
                        setValue('status', value as OrderStatus)
                      }
                      size="base"
                    >
                      {Object.values(OrderStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectMenu>
                  </div>
                </div>

                <div className="flex gap-6">
                  {renderContactInfo('CONTATO', buyerPhone)}
                  {renderContactInfo('E-MAIL', buyerEmail)}
                  {renderContactInfo('CRIADO', date)}
                </div>
              </div>

              {watch('status') === OrderStatus.delivered && (
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-semibold">
                    RETIRADO POR:{' '}
                  </Label>
                  {receiverName && user?.user_type !== 'admin' ? (
                    <p className="text-sm text-muted-foreground">
                      {receiverName}
                    </p>
                  ) : (
                    <Input
                      className="w-2/3 p-2 mt-1 border rounded"
                      {...confirmStatusForm.register('receiverName')}
                      placeholder="Nome"
                    />
                  )}
                </div>
              )}

              <div className="mt-4">
                <Button
                  variant="outline"
                  className="py-6 px-14"
                  disabled={isSubmitting}
                >
                  Salvar
                </Button>
              </div>
            </form>
          </FormProvider>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex gap-4">
              {renderContactInfo('NOME', user?.name)}
              {renderContactInfo('STATUS', status)}
              {receiverName &&
                renderContactInfo('RETIRADO', formatOrderDate(updatedDate!))}
            </div>
            <div className="flex gap-6">
              {renderContactInfo('CONTATO', user?.phone)}
              {renderContactInfo('E-MAIL', user?.email)}
              {renderContactInfo('Criado', date)}
            </div>

            {status === OrderStatus.delivered && (
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">RETIRADO POR:</p>
                <p className="text-sm text-muted-foreground">{receiverName}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DialogContent>
  )
}
