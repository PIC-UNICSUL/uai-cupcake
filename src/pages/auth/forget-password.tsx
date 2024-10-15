import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const forgotPasswordInSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordInSchema = z.infer<typeof forgotPasswordInSchema>

export function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordInSchema>()

  function handleSendEmail(data: ForgotPasswordInSchema) {
    console.log(data)
  }

  return (
    <div className="w-full lg:p-8">
      <div className="mx-auto flex h-screen max-w-80 flex-col justify-center space-y-6   lg:h-full">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Esqueci senha
          </h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleSendEmail)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('email')}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Enviar
              </Button>
              <Link to="/sign-in">
                <Button className="w-full" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
