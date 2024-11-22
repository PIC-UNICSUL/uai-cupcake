import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  email: string
  password: string
  phone: string
}

export async function signUp({ email, password, phone, name }: SignUpBody) {
  await api.post('/accounts', { name, email, password, phone })
}
