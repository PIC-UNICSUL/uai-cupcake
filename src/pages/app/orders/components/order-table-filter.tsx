import { userType } from "@/@types/types";
import { SelectMenu } from "@/components/menus";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from 'zod'

interface OrderTableFilterProps {
    user_type?: userType
}

const orderFilterSchema = z.object({
    date: z.string(),
    status: z.string(),
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilter({ user_type }: OrderTableFilterProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const { register, handleSubmit, control } = useForm<OrderFilterSchema>({
        resolver: zodResolver(orderFilterSchema),
        defaultValues: {
            date: searchParams.get("date") || "weak",
            status: searchParams.get("status") || "all",
        }
    })

    function handleFilterOrder({ status, date }: OrderFilterSchema) {
        console.log(status, date)
    }

    return (
        <form onSubmit={handleSubmit(handleFilterOrder)} className="flex w-full items-center justify-end gap-2">
            <div className="flex justify-end pb-2 md:pb-5 md:pt-7">
                <Controller 
                    name="date"
                    control={control}
                    render={({ field: { name, onChange, value, disabled } }) => (
                        <SelectMenu
                            defaultValue="weak"
                            size="medium"
                            name={name}
                            value={value}

                            onValueChange={onChange}
                            disabled={disabled}
                        >
                            <SelectItem value="mounth">Último mês</SelectItem>
                            <SelectItem value="weak">Última semana</SelectItem>
                            <SelectItem value="year">Último ano</SelectItem>
                        </SelectMenu>
                    )}
                />
            </div>
            <div className="flex justify-end pb-2 md:pb-5 md:pt-7">
                <Controller 
                    name="status"
                    control={control}
                    render={({ field: { name, onChange, value, disabled } }) => (
                        <SelectMenu  
                            defaultValue="all" 
                            size="medium"
                            name={name}
                            value={value}
                            onValueChange={onChange}
                            disabled={disabled}
                        >
                            <SelectItem value="all">Todos status</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="ready">Pronto</SelectItem>
                            <SelectItem value="preparation">Em preparo</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectMenu>
                    )}
                />
            </div>

            <div className="flex justify-end pb-2 md:pb-5 md:pt-7 gap-2">
                <Button type="submit" variant="secondary" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Filtrar
                </Button>
                <Button type="button" variant="secondary" size="sm">
                    <X className="mr-2 h-4 w-4" />
                    Remover filtros
                </Button>
            </div>
        </form>
    )
}