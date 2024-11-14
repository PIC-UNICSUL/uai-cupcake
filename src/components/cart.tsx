import { Link } from 'react-router-dom'

import { formatMoney } from '@/pages/app/products/components/product-details'
import { useStore } from '@/store'

import { CardCart } from './cardcart'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

export function Cart() {
  const { cartItems, cartItemsTotal, cartQuantity } = useStore()

  const formattedItemsTotal = formatMoney(cartItemsTotal)

  return (
    <SheetContent className="flex w-[400px] flex-col justify-between">
      <SheetHeader>
        <SheetTitle>Carrinho de compras</SheetTitle>
        <SheetDescription>
          {cartItems.length == 0
            ? 'Nenhum cupcake selecionado'
            : 'Cupcakes selecionados'}
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-2/3 w-full">
        <div className="flex w-[96%] flex-col gap-2">
          {cartItems.map((item) => (
            <CardCart key={item.order_item_id} cartItem={item} />
          ))}
        </div>
      </ScrollArea>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-center gap-3">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm">Total de cupcakes</p>
              <p className="text-sm">{cartQuantity}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-bold">Valor total</p>
              <p className="text-lg font-bold">{formattedItemsTotal}</p>
            </div>
          </div>
          <Link to="/checkout">
            <Button className="w-full">Finalizar compra</Button>
          </Link>
        </div>
      ) : null}
    </SheetContent>
  )
}
