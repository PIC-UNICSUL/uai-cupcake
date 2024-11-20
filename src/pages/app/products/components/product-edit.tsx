import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Product } from '@/@types/types'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/store'

interface ProductEditProps {
  cupcake: Product
  onClose: () => void
}

const productEditFormSchema = z.object({
  name: z
    .string()
    .nonempty('Informe o novo nome do cupcake')
    .min(1, 'Nome tem que ter mais de um caracter'),
  description: z
    .string()
    .nonempty('Descreva o cupcake')
    .min(10, 'A descrição tem que ter no mínimo 10 caracteres'),
  price: z.string().nonempty('Informe o preço'),
  category: z.string().nonempty('Informe a categoria'),
  img: z
    .union([z.instanceof(File), z.string().optional()]) // Aceita tanto File quanto string
    .refine((file) => file instanceof File || file === '', {
      message: 'Imagem é obrigatória',
    })
    .optional(),
})

type ProductEditForm = z.infer<typeof productEditFormSchema>

export function ProductEdit({ cupcake, onClose }: ProductEditProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { updateProduct } = useStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductEditForm>({
    resolver: zodResolver(productEditFormSchema),
    defaultValues: {
      name: cupcake.name,
      description: cupcake.description,
      price: String(cupcake.price),
      category: cupcake.category,
      img: cupcake.img, // Aqui pode ser uma string, a URL da imagem atual
    },
  })

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setValue('img', file) // Define o img como um File
      const previewUrl = URL.createObjectURL(file) // Cria uma URL para o arquivo selecionado
      setImagePreview(previewUrl) // Atualiza o estado com a URL da imagem
    }
  }

  async function handleUpdateProduct(data: ProductEditForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const dataFormatted = {
        ...data,
        product_id: cupcake.product_id,
        price: Number(data.price),
        img:
          data.img instanceof File ? URL.createObjectURL(data.img) : data.img, // Trata como string ou File
      }

      const errorMessage = updateProduct(dataFormatted)

      if (typeof errorMessage === 'string') {
        toast.error(errorMessage)
        return
      }

      toast.success('Produto atualizado com sucesso!')
      onClose()
    } catch (error) {
      toast.error('Erro ao atualizar produto')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Cupcake: {cupcake.name}</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(handleUpdateProduct)}
        className="flex flex-col gap-5"
      >
        <Input
          type="text"
          id="name"
          {...register('name')}
          placeholder="Informe o novo nome"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Textarea
          {...register('description')}
          placeholder="Informe uma nova descrição"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <Input type="text" placeholder="00,0" {...register('price')} />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <Input
          type="text"
          placeholder={cupcake.category}
          {...register('category')}
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        {imagePreview ? (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Pré-visualização do cupcake"
              className="h-10 w-10 object-cover"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <p>Imagem: </p>
            {cupcake.img && (
              <img
                src={cupcake.img}
                alt="Imagem atual do cupcake"
                className="h-10 w-10 object-cover"
              />
            )}
          </div>
        )}

        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {errors.img && <p className="text-red-500">{errors.img.message}</p>}

        <Button type="submit">Salvar</Button>
      </form>
    </DialogContent>
  )
}
