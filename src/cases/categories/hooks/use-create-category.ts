import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { CategoryService } from "../services/category.service"

export function useCreateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: CategoryService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            toast.success('Categoria cadastrada.')
        },
        onError: (error) => {
            toast.error('Não foi possível cadastrar a categoria.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
