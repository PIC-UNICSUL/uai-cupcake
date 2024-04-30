import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

import { CardProduct } from './card'

export function Home() {
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
            {/* Seção da imagem */}

            {/* Seção de texto */}
            <div className="flex flex-col items-center gap-5 p-8">
              <p className="text-5xl font-bold">Nossos produtos</p>
              <p className="w-1/3 text-center text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link to="/products">
                <Button>Ver todos</Button>
              </Link>
            </div>

            {/* Seção dos cards */}
            <div className="flex w-full justify-center space-x-4 pb-12 pt-6">
              
              <CardProduct
                img="/cupcakeDes.jpg"
                name="Nome do Card"
                price="R$ 00,00"
              />
              <CardProduct
                img="/cupcakeDes.jpg"
                name="Nome do Card"
                price="R$ 00,00"
              />
              <CardProduct
                img="/cupcakeDes.jpg"
                name="Nome do Card"
                price="R$ 00,00"
              />
              {/* Repita o componente <Card /> conforme necessário */}
            </div>

            {/* Duas colunas de texto */}
            <div className="">
              <p className="px-4 pb-6 text-4xl font-bold">Nossa historia</p>
              <div className="flex justify-between">
                <div className="w-1/2 p-4">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="w-1/2 p-4">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
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
