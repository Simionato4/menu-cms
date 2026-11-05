import { useQuery } from "@tanstack/react-query"
import { GuestCheckService } from "../services/guest-check.service"

export function useGuestCheck(id: string) {
    return useQuery({
        queryKey: ['guest-checks', id],
        queryFn: () => GuestCheckService.findOne(id)
    })
}
