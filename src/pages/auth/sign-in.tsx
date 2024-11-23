import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/store'
// import { useMutation } from '@tanstack/react-query'
// import { signIn } from '@/api/sign-in'

const signInSchema = z.object({
  email: z
    .string()
    .nonempty('Preencha com o e-mail cadastrado')
    .email('E-mail inválido'),
  password: z
    .string()
    .nonempty('Preencha com a senha cadastrada')
    .min(8, 'Senha incorreta'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { signin, loadCartForUser } = useStore()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  // const { mutateAsync: authenticate } = useMutation({
  //   mutationFn: signIn,
  // })

  async function handleAuthenticate(data: SignInSchema) {
    try {
      // await authenticate({ email: data.email, password: data.password })
      const errorMessage = signin(data.email, data.password)

      if (typeof errorMessage === 'string') {
        toast.error(errorMessage)
        return
      }

      loadCartForUser(data.email)
      navigate('/')
    } catch (err) {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <div className="w-full lg:p-8">
      <div className="mx-auto flex h-screen max-w-80 flex-col justify-center space-y-6 lg:h-full">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Login
          </h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleAuthenticate)}>
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
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Sua senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <Link
                  to="/forget-password"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Acessar painel
              </Button>
              <Link to="/sign-up">
                <Button className="w-full" variant="outline">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
