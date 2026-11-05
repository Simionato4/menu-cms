import { PageHeader } from "@/components/layout/page-header"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { OrderKanban } from "@/cases/orders/components/order-kanban"
import { useOrders } from "@/cases/orders/hooks/use-orders"

export function KanbanPage() {
    const { data: orders = [], isPending, isError, error, refetch } = useOrders()

    function renderContent() {
        if (isPending) {
            return <LoadingState />
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />
        }

        return <OrderKanban orders={orders} />
    }

    return (
        <>
            <PageHeader
                title="Kanban de pedidos"
                description="Arraste o cartão para outra coluna para alterar o status do pedido."
            />

            {renderContent()}
        </>
    )
}
