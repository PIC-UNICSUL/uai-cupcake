import { ComponentProps, ReactNode } from 'react'

import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'

interface SelectMenuProps extends ComponentProps<typeof Select> {
  prefix?: string
  children: ReactNode
  size?: 'base' | 'large' | 'medium'
}

export function SelectMenu({
  prefix,
  children,
  size,
  ...props
}: SelectMenuProps) {
  return (
    <div>
      <Select {...props}>
        <SelectTrigger
          className={`${
            (size === 'large' && 'w-[180px]') ||
            (size === 'base' && 'w-[130px]') ||
            (size === 'medium' && 'w-[150px]')
          }`}
        >
          {!!prefix && <span className="text-muted-foreground">{prefix}</span>}
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="font-semibold">{children}</SelectContent>
      </Select>
    </div>
  )
}
// export function SelectMenu({
//   placeholder,
//   children,
//   size,
//   ...props
// }: SelectMenuProps) {
//   return (
//     <div>
//       <Select {...props}>
//         <SelectTrigger
//           className={`${
//             (size === 'large' && 'w-[180px]') ||
//             (size === 'base' && 'w-[130px]') ||
//             (size === 'medium' && 'w-[150px]')
//           }`}
//         >
//           {!!placeholder && (
//             <span className="text-muted-foreground">{placeholder}</span>
//           )}
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent className="font-semibold">{children}</SelectContent>
//       </Select>
//     </div>
//   )
// }

// export function DateMenu() {
//   return (
//     <div>
//       <Select defaultValue="mounth">
//         <SelectTrigger className="w-[180px] gap-2 font-semibold">
//           <SelectValue />
//         </SelectTrigger>
//         <SelectContent className="font-semibold">
//           <SelectItem value="mounth">Último mês</SelectItem>
//           <SelectItem value="weak">Última semana</SelectItem>
//           <SelectItem value="year">Último ano</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   )
// }

// export function CategoryMenu() {
//   return (
//     <div>
//       <Select>
//         <SelectTrigger className="w-[180px] gap-2 font-semibold">
//           <SelectValue placeholder="Categoria" />
//         </SelectTrigger>
//         <SelectContent className="font-semibold">
//           <SelectItem value="traditional">Tradicional</SelectItem>
//           <SelectItem value="glutenFree">Sem gluten</SelectItem>
//           <SelectItem value="savory">Salgados</SelectItem>
//           <SelectItem value="limitedEdition">Edição limitada</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   )
// }
