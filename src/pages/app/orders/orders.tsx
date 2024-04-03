import { Helmet } from 'react-helmet-async'

import { SelectMenu } from '@/components/menus'
import { Pagination } from '@/components/pagination'
import { SelectItem } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableRow } from './order-table-row'

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <SelectMenu defaultValue="mounth" size="medium">
            <SelectItem value="mounth">Último mês</SelectItem>
            <SelectItem value="weak">Última semana</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N. PEDIDO</TableHead>
                <TableHead>QUANTIDADE</TableHead>
                <TableHead>VALOR TOTAL</TableHead>
                <TableHead>DATA DA COMPRA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return <OrderTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
        <Pagination pageIndex={0} totalCount={105} perPage={30} />
      </div>
    </>
  )
}