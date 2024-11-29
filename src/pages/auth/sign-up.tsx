import { zodResolver } from '@hookform/resolvers/zod' // Adiciona o resolver para o zod
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask-next'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { UserService } from '@/services/user'

const signUpFormSchema = z.object({
  name: z
    .string()
    .min(1,'Por favor, preencha o campo nome')
    .min(1, 'Nome tem que ter mais de um caracter'),
  password: z
    .string()
    .min(1,'Por favor, preencha o campo senha')
    .min(6, 'Senha tem que ter no mínimo 6 caracteres'),
  mail: z
    .string()
    .nonempty('Por favor, preencha o campo e-mail')
    .email('Digite um e-mail válido'),
  phone: z
    .string()
    .min(1,'Por favor, preencha o campo celular')
    .min(14, 'Digite um número de celular válido')
    .transform((value) => value.replace(/\D/g, '')),
})

type SignUpForm = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (data: SignUpForm) => {
      const response = await UserService.createAccount(data)
      return response
    },
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!')
      navigate('/sign-in')
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.[0].message || 'Erro ao realizar cadastro.' 
      )
    },
  })

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="px-2 py-8 lg:px-0">
        <div className="flex flex-col justify-center gap-6 max-w-80">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Faça seu cadastro para comprar seus cupcakes!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit((data) => signUp(data))}>
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Digite seu nome"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('mail')}
                placeholder="Digite seu e-mail"
              />
              {errors.mail && (
                <p className="text-red-500">{errors.mail.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Celular</Label>
              <InputMask
                id="phone"
                className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                mask="(99) \99999-9999"
                placeholder="Digite seu celular"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password_hash">Senha</Label>
              <Input
                id="password_hash"
                type="password"
                {...register('password')}
                placeholder="Digite sua senha"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Button disabled={isSubmitting} className="w-full" type="submit">
                Finalizar cadastro
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
    </>
  )
}
