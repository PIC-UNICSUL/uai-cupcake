import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { ProductsCheckout } from './products-checkout'

export function Checkout() {
  return (
    <div>
      <Helmet title="Checkout" />

      <div className="container relative hidden min-h-screen flex-col antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-muted-foreground lg:flex">
          <div className="flex h-full w-2/3 flex-col gap-3 text-foreground">
            <span className="mb-4 text-5xl font-bold">Retirada</span>
            <div className="mb-10 flex flex-col gap-5 text-lg">
              <p>O nosso prazo de retirada é de 3 dias úteis</p>
              <p>
                Porém, se o seu pedido for acima de 50 unidades, fale conosco
                nno whatsapp e combine sua data de retirada
              </p>
            </div>
            <Button>Fechar pedido e combinar retirada</Button>
          </div>
        </div>

        <div className="relative hidden h-full flex-col px-10 py-16 text-muted-foreground lg:flex">
          <div className="flex h-full w-4/5 flex-col gap-3 text-foreground">
            <span className="mb-4 text-2xl">Seu carrinho</span>
            <ScrollArea className="h-80 w-full">
              <div className=" flex flex-col gap-4">
                <ProductsCheckout />
                <ProductsCheckout />
                <ProductsCheckout />
                <ProductsCheckout />
                <ProductsCheckout />
              </div>
            </ScrollArea>
            <div className="flex flex-col gap-4">
              <div className="">
                <div className="flex justify-between">
                  <p>Pedido</p>
                  <p>R$ 0,00</p>
                </div>
                <div className="flex justify-between">
                  <p>Prazo retirada</p>
                  <Button variant="link" className="h-auto p-0 ">
                    a combinar
                  </Button>
                </div>
              </div>

              <Separator className="h-1 bg-foreground" />

              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>R$ 130,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
