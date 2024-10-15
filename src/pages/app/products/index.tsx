import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { SelectMenu } from '@/components/menus'
import { QuantityInput } from '@/components/quantity-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { SelectItem } from '@/components/ui/select'
import { useStore } from '@/store'
import { Cupcakes } from '@/mock/Cupcakes'

import { ProductDetails } from './components/product-details'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { NewProduct } from './components/new-product'
import { Cupcake } from '@/@types/types'

export function Products() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const { signed, user, addCupcakesToCart } = useStore()

  function handleIncrease(id: number) {
    setQuantities((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 0) + 1,
    }))
  }

  function handleDecrease(id: number) {
    setQuantities((prevState) => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) - 1, 0),
    }))
  }

  if (cupcakes.length === 0) {
    setCupcakes(Cupcakes)
  }

  function handleAddToCart() {
    const cupcakesToAdd = cupcakes
      .filter((cupcake) => (quantities[cupcake.id] || 0) > 0)
      .map((cupcake) => ({
        ...cupcake,
        quantity: quantities[cupcake.id],
      }))

    if (cupcakesToAdd.length > 0) {
      addCupcakesToCart(cupcakesToAdd)
    }
    toast.success('Cupcakes adicionados ao carrinho')
  }

  function handleDelete(id: number) {
    setCupcakes((prevCupcakes) => prevCupcakes.filter((cupcake) => cupcake.id !== id))
    toast.success('Produto excluído com sucesso')
  }

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="w-1/3">
        <p className="text-semibold text-4xl">Todos</p>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[450px_1fr]">
        <div>
          <div className="flex items-center gap-4 pb-5">
            <p className="font-semibold">Filtros</p>
            <Button variant="link" className="h-1 text-muted-foreground">
              Limpar filtros
            </Button>
          </div>
          <div>
            <p className="pb-4 text-xs font-bold">Categorias</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="limitada" />
                <Label htmlFor="limitada" className="text-sm font-medium">
                  Edição limitada
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vegano" />
                <Label htmlFor="vegano" className="text-sm font-medium">
                  Vegano
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tradicional" />
                <Label htmlFor="tradicional" className="text-sm font-medium">
                  Tradicional
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="glutenS" />
                <Label htmlFor="glutenS" className="text-sm font-medium">
                  Sem glúten
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="salgado" />
                <Label htmlFor="salgado" className="text-sm font-medium">
                  Salgado
                </Label>
              </div>
              {user?.admin && (
                <div className='mt-2'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Adicionar novo cupcake</Button>
                    </DialogTrigger>
                    <NewProduct />
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
        {cupcakes.length > 0 ? (
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-col items-end pb-11">
              <div className="flex flex-col items-center">
                <SelectMenu
                  defaultValue="popular"
                  size="large"
                  prefix="Ordernar por "
                >
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="item1">Item1</SelectItem>
                  <SelectItem value="item2">Item2</SelectItem>
                  <SelectItem value="item3">Item3</SelectItem>
                  <SelectItem value="item4">Item4</SelectItem>
                  <SelectItem value="item5">Item5</SelectItem>
                </SelectMenu>
                <p className="text-sm">
                  {cupcakes.length} produtos encontrados
                </p>
              </div>
              <div>
                <div className="flex flex-col items-center gap-4">
                  <div>
                    {cupcakes.map((cupcake) => {
                      return (
                        <ProductDetails
                          key={cupcake.id}
                          cupcake={cupcake}
                          quantityInput={
                            <QuantityInput
                              quantity={quantities[cupcake.id] || 0}
                              onIncrease={() => handleIncrease(cupcake.id)}
                              onDecrease={() => handleDecrease(cupcake.id)}
                            />
                          }
                          handleDelete={user?.admin ? handleDelete : undefined}
                        />
                      )
                    })}
                  </div>
                  {signed ? (
                    <Button
                      className="w-3/6 text-center transition disabled:cursor-default disabled:opacity-40"
                      disabled={
                        cupcakes.filter(
                          (cupcake) => (quantities[cupcake.id] || 0) > 0,
                        ).length == 0
                      }
                      variant="outline"
                      onClick={handleAddToCart}
                    >
                      Adicionar ao carrinho
                    </Button>
                  ) : (
                    <Link
                      to="/sign-in"
                      className="flex w-full flex-col items-center"
                    >
                      <Button className="w-3/6 text-center" variant="outline">
                        Faça login para comprar
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-2xl font-semibold">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
