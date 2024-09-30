import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface CardProductProps {
  img: string
  name: string
  price: string
}

export function CardProduct({ img, price, name }: CardProductProps) {
  return (
    <Card>
      <CardContent className="w-full p-0">
        <img src={img} alt={name} className="p-0 h-64 w-64 rounded" />
        <p className="p-6 text-xl font-semibold">{name}</p>
      </CardContent>
      <CardFooter>
        <p>{price}</p>
      </CardFooter>
    </Card>
  )
}
