import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { Order } from '@/@types/types'
import { formatOrderDate } from '@/utils/date-utils'

import { OrderDetails } from './order-details'
import { formatMoney } from '../../products/components/product-details'
import { useStore } from '@/store'

interface OrderTableRowProps {
  order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const { user } = useStore()
  const formattedPrice = formatMoney(order.total)

  function color() {
    switch (order.status) {
      case 'Pendente':
        return 'bg-slate-400'
      case 'Preparando':
        return 'bg-yellow-400'
      case 'Pronto':
        return 'bg-green-400'
      case 'Cancelado':
        return 'bg-red-400'
      default:
        return 'hidden'
    }
  }

  const status = color()

  return (
    <>
      {user?.admin ? (
        <TableRow className="cursor-pointer">
          <TableCell className="font-mono text-xs font-medium">
            {order.orderId}
          </TableCell>
          <TableCell className="font-medium">{order.userEmail}</TableCell>
          <TableCell className="font-medium">{order.items.length}</TableCell>
          <TableCell className="font-medium">{formattedPrice}</TableCell>
          <TableCell className="text-muted-foreground">
            {formatOrderDate(order.date)}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${status}`}></span>
              <span className="font-medium text-muted-foreground">
                {order.status}
              </span>
            </div>
          </TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Search className="h-5 w-4" />
                </Button>
              </DialogTrigger>
              <OrderDetails
                order={order.items}
                id={order.orderId}
                total={order.total}
                date={formatOrderDate(order.date)}
                status={order.status}
                buyerEmail={order.userEmail}
                buyerName={order.userName}
                buyerPhone={order.userPhone}
              />
            </Dialog>
          </TableCell>
        </TableRow>

      ) : (
        <TableRow className="cursor-pointer">
          <TableCell className="font-mono text-xs font-medium">
            {order.orderId}
          </TableCell>
          <TableCell className="font-medium">{order.items.length}</TableCell>
          <TableCell className="font-medium">{formattedPrice}</TableCell>
          <TableCell className="text-muted-foreground">
            {formatOrderDate(order.date)}
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${status}`}></span>
              <span className="font-medium text-muted-foreground">
                {order.status}
              </span>
            </div>
          </TableCell>
          <TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Search className="h-5 w-4" />
                </Button>
              </DialogTrigger>
              <OrderDetails
                order={order.items}
                id={order.orderId}
                total={order.total}
                date={formatOrderDate(order.date)}
                status={order.status}
              />
            </Dialog>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
