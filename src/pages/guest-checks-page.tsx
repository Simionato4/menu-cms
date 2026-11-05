import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { GuestCheckTable } from "@/cases/guest-checks/components/guest-check-table"
import { useOpenGuestChecks } from "@/cases/guest-checks/hooks/use-open-guest-checks"

export function GuestChecksPage() {
    const { data: guestChecks = [], isPending, isError, error, refetch } = useOpenGuestChecks()

    function renderContent() {
        if (isPending) {
            return <LoadingState />
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />
        }

        if (guestChecks.length === 0) {
            return <EmptyState message="Nenhuma comanda em aberto." />
        }

        return <GuestCheckTable guestChecks={guestChecks} />
    }

    return (
        <>
            <PageHeader
                title="Comandas"
                description="Acompanhe as comandas em aberto."
            />

            {renderContent()}
        </>
    )
}
