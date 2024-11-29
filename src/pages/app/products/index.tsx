import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { CirclePlus, Plus, ShoppingCart } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { Product } from '@/@types/types'
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
import { useAuth } from '@/contexts/auth-context'

export function Products() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState<string[]>([])
  const [checkboxState, setCheckboxState] = useState<{
    [key: string]: boolean
  }>({})
  const [sortOption, setSortOption] = useState<string>('padrao')

  const { signed, user, addProductsToCart, products, addProduct } = useStore()
  const { isAuthenticated, role} = useAuth();

  // Atualizar os filtros ao clicar no checkbox
  function handleFilterChange(category: string, checked: boolean) {
    setFilters((prevFilters) =>
      checked
        ? [...prevFilters, category]
        : prevFilters.filter((f) => f !== category),
    )
    setCheckboxState((prevState) => ({
      ...prevState,
      [category]: checked,
    }))
  }

  function clearFilters() {
    setFilters([])
    setCheckboxState({})
  }

  const categories = useMemo(() => {
    const allCategories = products.map((product) => product.category)
    return Array.from(new Set(allCategories)) // Remove duplicatas
  }, [products])

  // Atualizar a ordenação ao selecionar uma opção
  function handleSortChange(value: string) {
    setSortOption(value)
  }

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    const result = products.filter(
      (product) =>
        (filters.length === 0 || filters.includes(product.category)) &&
        (product.availability_status === 'Disponível' ||
          role === 'ADMIN'),
    )

    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, filters, sortOption, user])

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
      addProductsToCart(cupcakesToAdd, user?.email ?? '')
      toast.success('Cupcakes adicionados ao carrinho')
    }
  }

  function handleAddProduct(
    newProduct: Omit<Product, 'product_id' | 'availability_status'>,
  ) {
    addProduct(newProduct) // Adiciona ao Zustand

    toast.success('Cupcake adicionado com sucesso!')
  }

  return (
    <div className="flex flex-col min-h-screen gap-6">
      <div className="w-full">
        <p className="text-xl text-semibold md:text-4xl">Todos</p>
      </div>

      <div className="grid w-full md:grid-cols-[320px_1fr]">
        <div>
          <div className="flex items-center gap-4 pb-5">
            <p className="text-sm font-semibold md:text-base">Filtros</p>
            <Button
              variant="link"
              className="h-1 text-sm text-muted-foreground md:text-base"
              onClick={clearFilters} // Limpar filtros
            >
              Limpar filtros
            </Button>
          </div>
          <div>
            <p className="pb-4 text-xs font-bold">Categorias</p>
            <div className="flex flex-col gap-1 mb-4 sm:mb-0">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={checkboxState[category] || false}
                    onCheckedChange={(checked: boolean | string) =>
                      handleFilterChange(
                        category,
                        typeof checked === 'boolean' ? checked : false,
                      )
                    }
                  />
                  <Label htmlFor={category} className="text-sm font-medium">
                    {category}
                  </Label>
                </div>
              ))}
              {role === 'ADMIN' && (
                <div className="mt-2">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex gap-2">
                        <CirclePlus className="w-4 h-4" />
                        Cupcake
                      </Button>
                    </DialogTrigger>
                    <NewProduct
                      onClose={() => setIsModalOpen(false)}
                      onAddProduct={handleAddProduct}
                    />
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="flex flex-col w-full">
            <div className="pb-11">
              <div className="flex flex-col items-end">
                <SelectMenu
                  defaultValue="padrao"
                  size="large"
                  prefix="Ordenar por"
                  onValueChange={handleSortChange}
                >
                  <SelectItem value="padrao">Padrão</SelectItem>
                  <SelectItem value="price-asc">
                    Preço: Menor para maior
                  </SelectItem>
                  <SelectItem value="price-desc">
                    Preço: Maior para menor
                  </SelectItem>
                </SelectMenu>
                <p className="text-sm">
                  {filteredProducts.length} produtos encontrados
                </p>
              </div>
              {filteredProducts.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-2xl font-semibold">
                    Nenhum produto encontrado
                  </p>
                </div>
              )}
              <section className="w-full">
                <div className="flex flex-col gap-4">
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
                  {isAuthenticated ? (
                    <div
                      className={`w-full text-center ${filteredProducts.length === 0 && 'hidden'} `}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="fixed transition rounded-full bottom-16 right-16 disabled:opacity-40"
                              disabled={
                                products.filter(
                                  (cupcake) =>
                                    (quantities[cupcake.product_id] || 0) > 0,
                                ).length === 0
                              }
                              onClick={handleAddToCart}
                            >
                              <Plus className="w-4 h-4" />{' '}
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="mb-3">
                            <p>Adicionar ao carrinho</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <Link
                      to="/sign-in"
                      className="flex flex-col items-center w-full"
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
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-semibold">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}
