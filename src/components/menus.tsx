import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function DateMenu() {
  return (
    <div>
      <Select defaultValue="mounth">
        <SelectTrigger className="w-[180px] gap-2 font-semibold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          <SelectItem value="mounth">Último mês</SelectItem>
          <SelectItem value="weak">Última semana</SelectItem>
          <SelectItem value="year">Último ano</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function StatusMenu() {
  return (
    <div>
      <Select defaultValue="pending">
        <SelectTrigger className="w-[130px] gap-2 font-semibold">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="prodessing">Em preparo</SelectItem>
          <SelectItem value="ready">Pronto</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function CategoryMenu() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px] gap-2 font-semibold">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent className="font-semibold">
          <SelectItem value="traditional">Tradicional</SelectItem>
          <SelectItem value="glutenFree">Sem gluten</SelectItem>
          <SelectItem value="savory">Salgados</SelectItem>
          <SelectItem value="limitedEdition">Edição limitada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
