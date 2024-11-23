import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function Contact() {
  return (
    <div className="lg:p-8">
      <div className="mt-10 flex h-screen w-full max-w-80 flex-col gap-10 lg:h-full lg:justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Fale conosco
          </h1>
          <p>
            Entre em contato conosco para tirar dúvidas, compartilhar sugestões
            ou resolver quaisquer questões. Estamos aqui para ajudar!
          </p>
        </div>

        <div>
          <Link to="">
            <Button className="w-full">Falar no whatsapp</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
