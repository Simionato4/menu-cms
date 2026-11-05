import { useQuery } from "@tanstack/react-query"
import { GuestCheckService } from "../services/guest-check.service"

export function useOpenGuestChecks() {
    return useQuery({
        queryKey: ['guest-checks', { status: 'OPENED' }],
        queryFn: () => GuestCheckService.listByStatus('OPENED')
    })
}
