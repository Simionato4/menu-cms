import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { ProductService } from "../services/product.service"

export function useCreateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ProductService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Produto cadastrado.')
        },
        onError: (error) => {
            toast.error('Não foi possível cadastrar o produto.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
