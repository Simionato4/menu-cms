import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api-error"
import { SpotService } from "../services/spot.service"
import type { SpotPayload } from "../dtos/spot.dto"

interface UpdateSpotVariables {
    id: string;
    payload: SpotPayload;
}

export function useUpdateSpot() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, payload }: UpdateSpotVariables) => SpotService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spots'] })
            toast.success('Mesa atualizada.')
        },
        onError: (error) => {
            toast.error('Não foi possível atualizar a mesa.', {
                description: getApiErrorMessage(error)
            })
        }
    })
}
