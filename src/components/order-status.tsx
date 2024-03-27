type OrderStatus = 'pending' | 'canceled' | 'processing' | 'ready' | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  ready: 'Pronto',
  delivered: 'Entregue',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {['pending'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {['canceled'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {['processing', 'ready'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {['delivered'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
