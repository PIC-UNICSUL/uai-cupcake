import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Cupcakes } from '@/mock/Cupcakes'
import { useStore } from '@/store'

import { formatMoney } from '../products/components/product-details'
import { CardProduct } from './components/card'

export function Home() {
  const { products } = useStore()

  return (
    <>
      <Helmet title="Home" />
      <div className="flex min-h-screen flex-col antialiased">
        <Header />
        <div>
          <div className="h-96">
            <img
              src="/cupcakeDes.jpg"
              alt="Imagem Destaque"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
            <div className="flex w-full flex-col items-center gap-3 p-8 sm:gap-5">
              <p className="text-3xl font-bold sm:text-5xl">Nossos produtos</p>
              <p className="text-center text-sm text-muted-foreground sm:w-3/5 sm:text-base md:w-2/5">
              Delicie-se com nossa seleção de cupcakes artesanais, feitos com ingredientes de alta qualidade e muito amor.
              </p>
              <Link to="/products">
                <Button>Ver todos</Button>
              </Link>
            </div>

            {products.length > 0 && (
              <div className="flex w-full justify-center space-x-4 pb-12 pt-6">
                {Cupcakes.slice(1, 4).map((cupcake) => (
                  <CardProduct
                    key={cupcake.product_id}
                    img={cupcake.img}
                    name={cupcake.name}
                    price={formatMoney(cupcake.price)}
                  />
                ))}
              </div>
            )}

            <div className="">
              <p className="px-4 pb-1 text-2xl font-bold sm:text-3xl md:pb-6 md:text-4xl">
                Nossa historia
              </p>
              <div className="flex justify-between text-sm sm:text-base">
                <div className="w-1/2 p-4 ">
                  <p>
                    A nossa loja começou com uma simples paixão por doces e um sonho de espalhar alegria através dos cupcakes. Cada receita é pensada com carinho para proporcionar uma experiência única em cada mordida.
                  </p>
                </div>
                <div className="w-1/2 p-4">
                  <p>
                    Desde o início, focamos em usar os melhores ingredientes e preparar cada cupcake artesanalmente. Hoje, nos orgulhamos de oferecer uma variedade de sabores irresistíveis, que agradam a todos os gostos e celebram cada momento especial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
