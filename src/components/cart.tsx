import { Link } from 'react-router-dom'

import { useStore } from '@/store'
import { formatMoney } from '@/pages/app/products/components/product-details'

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
    <SheetContent className="flex flex-col w-[400px] justify-between">
      <SheetHeader>
        <SheetTitle>Carrinho de compras</SheetTitle>
        <SheetDescription>
          {cartQuantity == 0
            ? 'Nenhum cupcake selecionado'
            : 'Cupcakes selecionados'}
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-2/3 w-full">
        <div className="flex w-[96%] flex-col gap-4">
          {cartItems.map((item) => (
            <CardCart key={item.id} cupcake={item} />
          ))}
        </div>
      </ScrollArea>
      {cartQuantity > 0 ? (
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
