import { Helmet } from 'react-helmet-async'

import { SelectMenu } from '@/components/menus'
import { NavLink } from '@/components/nav-link'
import { Pagination } from '@/components/pagination'
import { SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
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
      <div className="w-full">
        <p className="pb-18 text-4xl font-semibold">Meus pedidos</p>
        <div className="flex justify-end">
          <SelectMenu defaultValue="mounth" size="medium">
            <SelectItem value="mounth">Último mês</SelectItem>
            <SelectItem value="weak">Última semana</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectMenu>
        </div>
      </div>
      <div className="grid h-64 w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="flex h-96 w-full gap-12">
          <div className="flex flex-col gap-4">
            <NavLink to="/orders">
              <p className="text-2xl">Meus pedidos</p>
            </NavLink>
            <NavLink to="/profile">
              <p className="text-2xl">Meus dados</p>
            </NavLink>
          </div>
          <Separator orientation="vertical" />
        </div>
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N. PEDIDO</TableHead>
                  <TableHead>QUANTIDADE</TableHead>
                  <TableHead>VALOR TOTAL</TableHead>
                  <TableHead>DATA DA COMPRA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Detalhes</TableHead>
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
      </div>
    </>
  )
}
