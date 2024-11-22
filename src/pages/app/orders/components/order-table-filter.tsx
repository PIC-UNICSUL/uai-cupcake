import { SelectMenu } from '@/components/menus'
import { SelectItem } from '@/components/ui/select'

interface OrderTableFilterProps {
  timeFilter: string;
  statusFilter: string;
  onFilterChange: (filterType: 'time' | 'status', value: string) => void;
}

export function OrderTableFilter({
  timeFilter,
  statusFilter,
  onFilterChange,
}: OrderTableFilterProps) {


  return (
    <div
      className="flex w-full items-center justify-end gap-2"
    >
      <div className="flex justify-end pb-2 md:pb-5 md:pt-7">
        <SelectMenu
          value={timeFilter}
          onValueChange={(value) => onFilterChange('time', value)}
          size="medium"
        >
          <SelectItem value="month">Último mês</SelectItem>
          <SelectItem value="week">Última semana</SelectItem>
          <SelectItem value="year">Último ano</SelectItem>
        </SelectMenu>
      </div>

      <div className="flex justify-end pb-2 md:pb-5 md:pt-7">
        <SelectMenu
          value={statusFilter}
          onValueChange={(value) => onFilterChange('status', value)}
          size="medium"
        >
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="Pendente">Pendente</SelectItem>
          <SelectItem value="Pronto">Pronto</SelectItem>
          <SelectItem value="Preparando">Em preparo</SelectItem>
          <SelectItem value="Cancelado">Cancelado</SelectItem>
        </SelectMenu>
      </div>
    </div>
  );
}
