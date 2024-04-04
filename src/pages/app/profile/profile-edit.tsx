import { useForm } from 'react-hook-form'
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

const profileEditSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  cel: z.string().min(10),
})

type ProfileEditSchema = z.infer<typeof profileEditSchema>

export function ProfileEdit() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileEditSchema>()

  async function handleProfileEdit(data: ProfileEditSchema) {
    try {
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Alteração feita com sucesso!', {
        action: {
          label: 'Alteração feita',
          onClick: () => {},
        },
      })
    } catch (error) {
      toast.error('Erro ao fazer alterações')
    }
  }
  return (
    <DialogContent>
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
          <Input
            type="tel"
            id="phone"
            placeholder="(11) 98901-2373"
            {...register('cel')}
          />
        </div>
        <div className="w-full">
          <Button type="submit" className="px-10" disabled={isSubmitting}>
            Salvar alterações
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
