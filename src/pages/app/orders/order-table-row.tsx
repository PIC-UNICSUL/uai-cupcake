import { Dialog } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export function OrderTableRow() {
  return (
    <TableRow>
      <Dialog>
        <TableCell className="font-mono text-xs font-medium">12</TableCell>
        <TableCell className="font-medium">15</TableCell>
        <TableCell className="font-medium">R$ 149,98</TableCell>
        <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400"></span>
            <span className="font-medium text-muted-foreground">Pendente</span>
          </div>
        </TableCell>
        <OrderDetails />
      </Dialog>
    </TableRow>
  )
}
