import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { OrderItems, Product } from '@/@types/types'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'

import { formatMoney } from '../products/components/product-details'
import { ProductsCheckout } from './components/products-checkout'
import { useAuth } from '@/contexts/auth-context'

type CartItemWithProductInfo = OrderItems &
  Pick<Product, 'name' | 'description' | 'img' | 'price'>

export function Checkout() {
  const { cartItems, cartItemsTotal, cleanCart, addOrder, user, products } =
    useStore()
    const { isAuthenticated } = useAuth();

  const formattedItemsTotal = formatMoney(cartItemsTotal)

  const navigate = useNavigate()

  function handleCheckout() {
    if (cartItems.length > 0) {
      if (!isAuthenticated) return
      // addOrder(user, cartItems, cartItemsTotal)
      // cleanCart(user?.email)

      navigate('/orders')
    }
  }

  const cartItemsWithProductInfo: CartItemWithProductInfo[] = cartItems.map(
    (item) => {
      const product = products.find(
        (cupcake) => cupcake.product_id === item.product_id,
      )

      return {
        ...item,
        name: product?.name ?? '',
        description: product?.description ?? '',
        img: product?.img ?? '',
        price: product?.price ?? 0,
      }
    },
  )

  return (
    <div>
      <Helmet title="Checkout" />
      {cartItems.length > 0 ? (
        <div className="container relative flex flex-col-reverse min-h-screen p-0 antialiased lg:grid lg:max-w-none lg:grid-cols-2">
          <div className="relative flex flex-col w-full h-full py-10 text-muted-foreground lg:p-10">
            <div className="flex flex-col w-full h-full gap-3 text-foreground">
              <span className="mb-1 text-3xl font-bold lg:mb-4 lg:text-5xl">
                Retirada
              </span>
              <div className="flex flex-col gap-2 mb-2 text-sm md:text-base lg:mb-10 lg:gap-5 lg:text-lg">
                <p>O nosso prazo de retirada é de 3 dias úteis</p>
                <p>
                  Porém, se o seu pedido for acima de 50 unidades, fale conosco
                  no whatsapp e combine sua data de retirada
                </p>
              </div>
              <Button
                className="h-full max-w-60 lg:h-10 lg:w-full"
                onClick={handleCheckout}
              >
                Fechar pedido e combinar retirada
              </Button>
            </div>
          </div>

          <div className="relative flex-col h-full text-muted-foreground lg:flex lg:px-10 lg:py-16">
            <div className="flex flex-col w-full h-full gap-3 text-foreground lg:w-4/5">
              <span className="mb-4 text-2xl">Revise seu pedido</span>
              <ScrollArea className="w-full h-80">
                <div className="flex flex-col gap-4 ">
                  {cartItemsWithProductInfo.map((item) => (
                    <ProductsCheckout key={item.order_item_id} cupcake={item} />
                  ))}
                </div>
              </ScrollArea>
              <div className="flex flex-col gap-4">
                <div className="">
                  <div className="flex justify-between">
                    <p>Pedido</p>
                    <p>{formattedItemsTotal}</p>
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
                  <p>{formattedItemsTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <section className="flex flex-col items-center p-8 rounded">
            <h2 className="text-lg">Não há itens no carrinho!</h2>
            <p className="mt-1 text-lg">
              Selecione os itens na ágina de produtos e finalize sua compra aqui
            </p>
          </section>
        </div>
      )}
    </div>
  )
}
