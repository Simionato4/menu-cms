import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { ProductService } from "../services/product.service"

export function useDeleteProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ProductService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Produto excluído.')
        },
        onError: (error) => {
            toast.error('Não foi possível excluir o produto.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
