import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { CategoryService } from "../services/category.service"
import type { CategoryPayload } from "../dtos/category.dto"

interface UpdateCategoryVariables {
    id: string;
    payload: CategoryPayload;
}

export function useUpdateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: UpdateCategoryVariables) => CategoryService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Categoria atualizada.')
        },
        onError: (error) => {
            toast.error('Não foi possível atualizar a categoria.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
