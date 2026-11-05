import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { SpotService } from "../services/spot.service"

export function useCreateSpot() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: SpotService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spots'] })
            toast.success('Mesa cadastrada.')
        },
        onError: (error) => {
            toast.error('Não foi possível cadastrar a mesa.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
