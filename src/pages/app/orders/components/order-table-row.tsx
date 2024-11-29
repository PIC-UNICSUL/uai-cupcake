import { Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Order, OrderItems } from '@/@types/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { useStore } from '@/store'
import { formatOrderDate } from '@/utils/date-utils'

import { formatMoney } from '../../products/components/product-details'
import { OrderDetails } from './order-details'
import { useAuth } from '@/contexts/auth-context'

interface OrderTableRowProps {
  order: Order
}

interface UserProps {
  email: string
  name: string
  phone: string
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [orderItems, setOrderItems] = useState<OrderItems[]>([])
  const [buyer, setBuyer] = useState<UserProps | null>(null)

  const { user, fetchUsers, fetchAllOrderItems } = useStore()
  const { role } = useAuth()

  const formattedPrice = useMemo(() => formatMoney(order.price), [order.price])
  const statusColor = useMemo(
    () => getStatusColor(order.status),
    [order.status],
  )

  useEffect(() => {
    const items = fetchAllOrderItems(order.order_id)
    const userDetails =
      fetchUsers().find((u) => u.user_id === order.user_id) || null

    setBuyer(
      userDetails
        ? {
            email: userDetails.email,
            name: userDetails.name,
            phone: userDetails.phone,
          }
        : null,
    )
    setOrderItems(items)
  }, [order.order_id, fetchUsers])

  const totalQuantity = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.quantity, 0),
    [orderItems],
  )

  const renderBuyerDetails = () => {
    if (role === 'ADMIN') {
      return <TableCell className="font-medium">{buyer?.email}</TableCell>
    }
    return null
  }

  return (
    <TableRow className="min-w-[600px] cursor-pointer">
      <TableCell className="font-mono text-xs font-medium">
        {order.order_id}
      </TableCell>
      {renderBuyerDetails()}
      <TableCell className="font-medium">{totalQuantity}</TableCell>
      <TableCell className="font-medium">{formattedPrice}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatOrderDate(order.created_at)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <span
            className={`h-2 w-2 rounded-full ${statusColor}`}
            aria-hidden="true"
          ></span>
          <span className="font-medium text-muted-foreground">
            {order.status}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-5" />
            </Button>
          </DialogTrigger>
          <OrderDetails
            order={orderItems}
            id={order.order_id}
            total={formattedPrice}
            date={formatOrderDate(order.created_at)}
            status={order.status}
            updatedDate={order.updated_at}
            buyerEmail={buyer?.email}
            buyerName={buyer?.name}
            buyerPhone={buyer?.phone}
            receiverName={order.receiver_name}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  )
}

function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    Pendente: 'bg-slate-400',
    Preparando: 'bg-yellow-400',
    Pronto: 'bg-green-400',
    Cancelado: 'bg-red-400',
  }
  return statusColors[status] || 'hidden'
}
