import { Link } from 'react-router-dom'

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
  return (
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader>
        <SheetTitle>Carrinho de compras</SheetTitle>
        <SheetDescription>Cupcakes selecionados</SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-2/3 w-full">
        <div className="flex w-[96%] flex-col gap-4">
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
        </div>
      </ScrollArea>
      <div className="flex flex-col justify-center gap-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-sm">Total de cupcakes</p>
            <p className="text-sm">50</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-bold">Valor total</p>
            <p className="text-lg font-bold">R$ 50,00</p>
          </div>
        </div>
        <Link to="/checkout">
          <Button className="w-full">Finalizar compra</Button>
        </Link>
      </div>
    </SheetContent>
  )
}
