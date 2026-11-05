import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { SpotService } from "../services/spot.service"

export function useDeleteSpot() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: SpotService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spots'] })
            toast.success('Mesa excluída.')
        },
        onError: (error) => {
            toast.error('Não foi possível excluir a mesa.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
