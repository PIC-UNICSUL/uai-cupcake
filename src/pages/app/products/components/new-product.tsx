import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const newCupcakeFormSchema = z.object({
    name: z
        .string()
        .nonempty('Informe nome do cupcake')
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
        .nonempty('Informe a(s) categoria(s)'),
    image: z
        .any()
        .refine((file) => file instanceof File && file.size > 0, {
            message: "Imagem é obrigatória",
        })
})

type NewCupcakeForm = z.infer<typeof newCupcakeFormSchema>

export function NewProduct() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<NewCupcakeForm>({
        resolver: zodResolver(newCupcakeFormSchema)
    })

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setValue('image', file);
        }
    }

    function handleNewProduct(data: any) {
        console.log(data)
    }


    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Adicionar Cupcake
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleNewProduct)} className="space-y-5">
                <div className="space-y-1">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        type="text"
                        id="name"
                        {...register('name')}
                        placeholder="Informe o novo nome"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Informe uma nova descrição"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                        type="text"
                        id="price"
                        placeholder="0"
                        {...register('price')}
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="categories">Categoria(s)</Label>
                    <Input
                        type="text"
                        id="categories"
                        placeholder="Informe a(s) categoria(s)"
                        {...register('categories')}
                    />
                    {errors.categories && <p className="text-red-500">{errors.categories.message}</p>}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="image">Imagem do Cupcake</Label>
                    <Input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                </div>
                <DialogFooter>
                    <Button>Criar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}