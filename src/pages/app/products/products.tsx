import { useState } from 'react'

import { SelectMenu } from '@/components/menus'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { SelectItem } from '@/components/ui/select'

import { ProductDetails } from './product-details'
import { Cupcakes } from '@/mock/Cupcakes'

export interface CupcakesInfo {
  id: number;
    name: string;
    img: string;
    description: string;
    categories: string[];
    priceInCents: number;
}

export function Products() {
  const [cupcakes, setCupcakes] = useState<CupcakesInfo[]>([])

  if (cupcakes.length === 0) {
    setCupcakes(Cupcakes)
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
            </div>
          </div>
        </div>
        {cupcakes.length > 0 ? (
        <div>
          <div className="flex flex-col items-end pb-11">
            <div className="flex flex-col items-center">
              <SelectMenu
                defaultValue="popular"
                size="large"
                placeholder="Ordernar por "
              >
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="item1">Item1</SelectItem>
                <SelectItem value="item2">Item2</SelectItem>
                <SelectItem value="item3">Item3</SelectItem>
                <SelectItem value="item4">Item4</SelectItem>
                <SelectItem value="item5">Item5</SelectItem>
              </SelectMenu>
              <p className="text-sm">{cupcakes.length} produtos encontrados</p>
            </div>
            <div className='flex flex-col gap-4'>
              {cupcakes.map(cupcake => {
                  return (
                    <ProductDetails
                      key={cupcake.id}
                      cupcake={cupcake}
                    />
                  )
                })}
            </div>
            </div>
          </div>
            ): (
              <div className='h-full flex justify-center items-center'>
                <p className='font-semibold text-2xl'>Nenhum produto encontrado</p>
              </div>
            )}
           
      </div>
    </div>
  )
}
