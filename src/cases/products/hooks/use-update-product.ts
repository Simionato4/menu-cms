import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { ProductService } from "../services/product.service"
import type { ProductPayload } from "../dtos/product.dto"

interface UpdateProductVariables {
    id: string;
    payload: ProductPayload;
}

export function useUpdateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: UpdateProductVariables) => ProductService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Produto atualizado.')
        },
        onError: (error) => {
            toast.error('Não foi possível atualizar o produto.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
