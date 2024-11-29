import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/services/auth'
import { useAuth } from '@/contexts/auth-context'


const signInSchema = z.object({
  mail: z
    .string().min(1, { message: 'Preencha com o e-mail cadastrado' })
    .email('E-mail inválido'),
  password: 
  z.string().min(1, 'Preencha com a senha cadastrada')
    .min(6, 'Senha incorreta'),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setAuthState } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      mail: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: async (data: SignInSchema) => {
      const response = await AuthService.login(data);
      return response;
    },
    onSuccess: () => {
      const decoded = AuthService.decodeToken();
      setAuthState({
        isAuthenticated: true,
        role: decoded?.scope?.[0] || null,
      });

      toast.success('Login realizado com sucesso!');
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.[0].message || 'Erro ao realizar login. Verifique suas credenciais.'
      );
    },
  });

  return (
    <div className="w-full lg:p-8">
      <div className="flex flex-col justify-center h-screen mx-auto space-y-6 max-w-80 lg:h-full">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Login
          </h1>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit((data)=> authenticate(data))}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register('mail')}
                />
                {errors.mail && (
                  <p className="text-red-500">{errors.mail.message}</p>
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
