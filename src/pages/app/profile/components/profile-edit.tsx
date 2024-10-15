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

const profileEditSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().min(8),
})

type ProfileEditSchema = z.infer<typeof profileEditSchema>

export function ProfileEdit() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileEditSchema>()

  const { updateUser } = useStore()

  async function handleProfileEdit(data: ProfileEditSchema) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      updateUser(data)
      toast.success('Alteração feita com sucesso!', {
        action: {
          label: 'Alteração feita',
          onClick: () => { },
        },
      })
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
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
            placeholder="email@email.com"
            {...register('email')}
          />
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
