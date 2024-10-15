import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const newPasswordInSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

type NewPasswordInSchema = z.infer<typeof newPasswordInSchema>

export function NewPassword() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPasswordInSchema>()

  function handleNewPassword(data: NewPasswordInSchema) {
    console.log(data)
  }

  return (
    <div className="w-full lg:p-8">
      <div className="mx-auto flex h-screen w-full max-w-80 flex-col justify-center space-y-6 lg:h-full">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Nova senha</h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleNewPassword)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                />
              </div>
              <Link to="/sign-in">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Enviar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
