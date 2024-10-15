import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Cupcake } from "@/@types/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductEditProps {
    cupcake: Cupcake
    onSave: (data: ProductEditForm) => void
}

const productEditFormSchema = z.object({
    name: z
        .string()
        .nonempty('Informe o novo nome do cupcake')
        .min(1, 'Nome tem que ter mais de um caracter'),
    description: z
        .string()
        .nonempty('Descreva o cupcake')
        .min(10, 'A descrição tem que ter no mínimo 10 caracteres'),
    price: z
        .string()
        .nonempty('Informe o preço'),
    categories: z
        .string()
        .nonempty('Informe a categoria')
})

type ProductEditForm = z.infer<typeof productEditFormSchema>

export function ProductEdit({ cupcake, onSave }: ProductEditProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductEditForm>({
        resolver: zodResolver(productEditFormSchema),
        defaultValues: {
            name: cupcake.name,
            description: cupcake.description,
            price: String(cupcake.price),
            categories: cupcake.categories.join(', ')
        }
    })

    const onSubmit = (data: ProductEditForm) => {
        const updatedData: any = {
            ...data,
            categories: data.categories.split(',').map((category): string => category.trim())
        };
        onSave(updatedData);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Editar Cupcake: {cupcake.name}
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Informe o novo nome"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <Textarea
                    {...register('description')}
                    placeholder="Informe uma nova descrição"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                <Input
                    type="text"
                    placeholder="00,0"
                    {...register('price')}
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}

                <Input
                    type="text"
                    placeholder={cupcake.categories.join(', ')}
                    {...register('categories')}
                />
                {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}

                <Button type="submit">
                    Salvar
                </Button>

            </form>
        </DialogContent>
    )
}                               