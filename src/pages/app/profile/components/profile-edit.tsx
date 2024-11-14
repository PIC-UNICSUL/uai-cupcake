import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask-next'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/store'

interface ProfileEditProps {
  name: string
  email: string
  phone: string
}

const profileEditSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  name: z
    .string({
      required_error: 'Informe seu nome',
      invalid_type_error: 'Informe um nome',
    })
    .min(3, 'No mínimo 3 caracteres')
    .regex(/^[A-Za-z\s]+$/, 'O nome não pode conter números'),
  phone: z
    .string()
    .min(14, 'Informe um número válido')
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      'Informe um número válido no formato (99) 99999-9999',
    ),
})

type ProfileEditSchema = z.infer<typeof profileEditSchema>

export function ProfileEdit({ name, email, phone }: ProfileEditProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileEditSchema>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name,
      email,
      phone,
    },
    mode: 'onBlur', // valida o formulário ao sair de um campo
    criteriaMode: 'all', // valida o formulário em todos os campos ao clicar em submit
  })

  const { updateUser } = useStore()

  async function handleProfileEdit(data: ProfileEditSchema) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const errorMessage = updateUser(data)

      if (typeof errorMessage === 'string') {
        toast.error(errorMessage)
        return
      }

      toast.success('Alteração feita com sucesso!')
    } catch (error) {
      toast.error('Erro ao fazer alterações')
    }
  }
  return (
    <DialogContent className="mx-2 rounded-lg md:mx-0">
      <DialogHeader className="pb-4">
        <DialogTitle>Alterar dados</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleProfileEdit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            id="name"
            placeholder="Maria Lopes"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            placeholder="email@email.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Celular</Label>
          <InputMask
            id="phone"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            mask="(99) \99999-9999"
            placeholder="Digite seu celular"
            {...register('phone')}
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="flex w-full justify-center sm:block">
          <Button
            type="submit"
            className="px-5 sm:px-10"
            disabled={isSubmitting}
          >
            Salvar alterações
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
