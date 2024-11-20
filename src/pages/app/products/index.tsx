import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { SelectMenu } from '@/components/menus'
import { QuantityInput } from '@/components/quantity-input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { SelectItem } from '@/components/ui/select'
import { useStore } from '@/store'

import { NewProduct } from './components/new-product'
import { ProductDetails } from './components/product-details'

export function Products() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { signed, user, addProductsToCart, products } = useStore()

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.availability_status === 'Disponível' ||
        user?.user_type === 'admin',
    )
  }, [products, user])

  function handleQuantityChange(id: number, type: 'increase' | 'decrease') {
    setQuantities((prevState) => ({
      ...prevState,
      [id]: Math.max((prevState[id] || 0) + (type === 'increase' ? 1 : -1), 0),
    }))
  }

  function handleAddToCart() {
    const cupcakesToAdd = products
      .filter((cupcake) => (quantities[cupcake.product_id] || 0) > 0)
      .map((cupcake) => ({
        order_item_id: parseInt(uuidv4(), 16),
        order_id: parseInt(uuidv4(), 16),
        product_id: cupcake.product_id,
        quantity: quantities[cupcake.product_id],
        created_at: new Date(),
      }))

    if (cupcakesToAdd.length > 0) {
      addProductsToCart(cupcakesToAdd, user?.email!)
      toast.success('Cupcakes adicionados ao carrinho')
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <div className="w-full md:w-1/3">
        <p className="text-semibold text-xl lg:text-4xl">Todos</p>
        <p className="text-sm text-muted-foreground md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[450px_1fr]">
        <div>
          <div className="flex items-center gap-4 pb-5">
            <p className="text-sm font-semibold md:text-base">Filtros</p>
            <Button
              variant="link"
              className="h-1 text-sm text-muted-foreground md:text-base"
            >
              Limpar filtros
            </Button>
          </div>
          <div>
            <p className="pb-4 text-xs font-bold">Categorias</p>
            <div className="flex flex-col gap-1">
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
              {user?.user_type === 'admin' && (
                <div className="mt-2">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button>Adicionar novo cupcake</Button>
                    </DialogTrigger>
                    <NewProduct onClose={() => setIsModalOpen(false)} />
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="flex w-full flex-col">
            <div className="pb-11">
              <div className="flex flex-col items-end">
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
                  {filteredProducts.length} produtos encontrados
                </p>
              </div>
              <section className="w-full">
                <div className="flex flex-col gap-4 sm:items-end">
                  <div className="w-full md:w-4/5">
                    {filteredProducts.map((product) => (
                      <ProductDetails
                        key={product.product_id}
                        cupcake={product}
                        quantityInput={
                          <QuantityInput
                            quantity={quantities[product.product_id] || 0}
                            onIncrease={() =>
                              handleQuantityChange(
                                product.product_id,
                                'increase',
                              )
                            }
                            onDecrease={() =>
                              handleQuantityChange(
                                product.product_id,
                                'decrease',
                              )
                            }
                          />
                        }
                      />
                    ))}
                  </div>
                  {signed ? (
                    <div className="w-full text-center">
                      <Button
                        className="w-3/6 transition disabled:cursor-default disabled:opacity-40"
                        disabled={
                          products.filter(
                            (cupcake) =>
                              (quantities[cupcake.product_id] || 0) > 0,
                          ).length == 0
                        }
                        variant="outline"
                        onClick={handleAddToCart}
                      >
                        Adicionar ao carrinho
                      </Button>
                    </div>
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
              </section>
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
