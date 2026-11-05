import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { CategoryService } from "../services/category.service"

export function useDeleteCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: CategoryService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Categoria excluída.')
        },
        onError: (error) => {
            toast.error('Não foi possível excluir a categoria.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
