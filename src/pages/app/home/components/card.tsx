import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface CardProductProps {
  img: string
  name: string
  price: string
}

export function CardProduct({ img, price, name }: CardProductProps) {
  return (
    <Card className="">
      <CardContent className="w-full p-0">
        <img
          src={img}
          alt={name}
          className="h-36 w-36 rounded p-0 sm:h-52 sm:w-52 md:h-64 md:w-64"
        />
        <p className="p-2 text-lg font-semibold sm:text-xl md:p-6">{name}</p>
      </CardContent>
      <CardFooter className="px-2 md:p-6">
        <p className="">{price}</p>
      </CardFooter>
    </Card>
  )
}
