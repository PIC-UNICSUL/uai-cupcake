import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Product } from '@/@types/types'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const newCupcakeFormSchema = z.object({
  name: z
    .string()
    .nonempty('Informe o nome do cupcake')
    .min(1, 'O nome deve ter mais de um caractere'),
  description: z
    .string()
    .nonempty('Descreva o cupcake')
    .min(10, 'A descrição deve ter no mínimo 10 caracteres'),
  price: z.string().nonempty('Informe o preço'),
  category: z.string().nonempty('Informe a(s) categoria(s)'),
  img: z.instanceof(File).refine((file) => file.size > 0, {
    message: 'Imagem é obrigatória',
  }),
})

type NewCupcakeForm = z.infer<typeof newCupcakeFormSchema>

interface NewProductProps {
  onClose: () => void
  onAddProduct: (
    newProduct: Omit<Product, 'product_id' | 'availability_status'>,
  ) => void
}

export function NewProduct({ onClose, onAddProduct }: NewProductProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewCupcakeForm>({
    resolver: zodResolver(newCupcakeFormSchema),
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Função para lidar com a mudança na seleção da imagem
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setValue('img', file)
      const previewUrl = URL.createObjectURL(file) // Cria uma URL para o arquivo selecionado
      setImagePreview(previewUrl) // Atualiza o estado com a URL da imagem
    }
  }

  // Função chamada ao submeter o formulário
  async function handleNewProduct(data: NewCupcakeForm) {
    try {
      const newProduct = {
        ...data,
        category: data.category,
        price: parseFloat(data.price.replace(',', '.')),
        img: data.img ? URL.createObjectURL(data.img) : '',
      }

      // const errorMessage = addProduct(newProduct)
      onAddProduct(newProduct)
      onClose()
    } catch (error) {
      toast.error('Erro ao cadastrar produto')
    }
  }

  return (
    <DialogContent className="mx-3 rounded-lg sm:mx-0">
      <DialogHeader>
        <DialogTitle>Adicionar Cupcake</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleNewProduct)} className="space-y-5">
        {/* Campo para Nome */}
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Informe o novo nome"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Campo para Descrição */}
        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Informe uma nova descrição"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Campo para Preço */}
        <div className="space-y-1">
          <Label htmlFor="price">Preço</Label>
          <Input
            type="text"
            id="price"
            placeholder="0"
            {...register('price')}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Campo para Categoria */}
        <div className="space-y-1">
          <Label htmlFor="categories">Categoria(s)</Label>
          <Input
            type="text"
            id="categories"
            placeholder="Informe a(s) categoria(s)"
            {...register('category')}
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        {imagePreview ? (
          <div className="mt-4">
            <Label htmlFor="image">Imagem do Cupcake</Label>
            <img
              src={imagePreview}
              alt="Pré-visualização do cupcake"
              className="h-10 w-10 object-cover"
            />
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
        ) : (
          <div className="space-y-1">
            <Label htmlFor="image">Imagem do Cupcake</Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
        )}

        <DialogFooter>
          <Button type="submit">Criar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
