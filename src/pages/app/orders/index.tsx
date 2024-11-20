import { useEffect, useState } from 'react'
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
import { useStore } from '@/store'

import { OrderTableFilter } from './components/order-table-filter'
import { OrderTableRow } from './components/order-table-row'

export function Orders() {
  const { user, orders, fetchAllOrders, fetchUserOrders } = useStore()

  const [pageIndex, setPageIndex] = useState(0)
  const itemsPerPage = 6

  const paginatedOrders = orders.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage,
  )

  useEffect(() => {
    if (user) {
      if (user.user_type === 'admin') {
        fetchAllOrders()
      } else {
        fetchUserOrders(user.email)
      }
    }
  }, [user, fetchUserOrders, fetchAllOrders])

  return (
    <>
      <Helmet title="Pedidos" />
      {user?.user_type === 'admin' ? (
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl md:text-4xl">
            Pedidos
          </h1>
          <div>
            {orders.length > 0 ? (
              <div>
                <OrderTableFilter />

                <div>
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>N. PEDIDO</TableHead>
                          <TableHead>CLIENTE</TableHead>
                          <TableHead>QUANTIDADE</TableHead>
                          <TableHead>VALOR TOTAL</TableHead>
                          <TableHead>DATA DA COMPRA</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Detalhes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedOrders.map((order) => (
                          <OrderTableRow key={order.order_id} order={order} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Pagination
                    pageIndex={pageIndex}
                    totalCount={orders.length}
                    perPage={itemsPerPage}
                    onPageChange={(newPage) => setPageIndex(newPage)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-[calc(100vh-80%)] items-center justify-center">
                <p className="text-2xl font-semibold">
                  Nenhum pedido encontrado
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-[minmax(200px,1fr)4fr]">
          <div className="flex flex-col gap-10">
            <p className="pb-0 text-xl font-semibold sm:pb-1 sm:text-2xl md:text-4xl">
              Meus pedidos
            </p>
            <div className="flex w-full lg:h-96 lg:gap-12">
              <div className="flex items-start gap-2 pb-5 md:flex-col md:gap-4">
                <NavLink to="/orders">
                  <p className="text-lg sm:text-xl md:text-2xl">Meus pedidos</p>
                </NavLink>
                <NavLink to="/profile">
                  <p className="text-lg sm:text-xl md:text-2xl">Meus dados</p>
                </NavLink>
              </div>
              <Separator orientation="vertical" className="hidden md:block" />
            </div>
          </div>
          {orders.length > 0 ? (
            <div>
              <div className="flex justify-end pb-2 md:pb-5 md:pt-7">
                <SelectMenu defaultValue="mounth" size="medium">
                  <SelectItem value="mounth">Último mês</SelectItem>
                  <SelectItem value="weak">Última semana</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                </SelectMenu>
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
                      {paginatedOrders.map((order) => (
                        <OrderTableRow key={order.order_id} order={order} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Pagination
                  pageIndex={pageIndex}
                  totalCount={orders.length}
                  perPage={itemsPerPage}
                  onPageChange={(newPage) => setPageIndex(newPage)}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-80%)] items-center justify-center">
              <p className="text-2xl font-semibold">Nenhum pedido encontrado</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
