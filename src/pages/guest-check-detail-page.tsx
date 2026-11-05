import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { Button } from "@/components/ui/button"
import { useGuestCheck } from "@/cases/guest-checks/hooks/use-guest-check"
import { OrderCard } from "@/cases/orders/components/order-card"
import { useGuestCheckOrders } from "@/cases/orders/hooks/use-guest-check-orders"
import { formatCurrency, formatDateTime } from "@/lib/format"

export function GuestCheckDetailPage() {
    const { id = '' } = useParams()
    const { data: guestCheck } = useGuestCheck(id)
    const { data: orders = [], isPending, isError, error, refetch } = useGuestCheckOrders(id)

    const guestCheckTotal = orders.reduce((sum, order) => sum + Number(order.total), 0)

    const description = guestCheck
        ? `${guestCheck.spot.name} · aberta em ${formatDateTime(guestCheck.createdAt)} · total ${formatCurrency(guestCheckTotal)}`
        : 'Acompanhe os pedidos e altere o status de cada um.'

    function renderContent() {
        if (isPending) {
            return <LoadingState rows={2} />
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />
        }

        if (orders.length === 0) {
            return <EmptyState message="Nenhum pedido nesta comanda." />
        }

        return (
            <div className="grid gap-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        )
    }

    return (
        <>
            <PageHeader title="Pedidos da comanda" description={description}>
                <Button variant="outline" nativeButton={false} render={<Link to="/guest-checks" />}>
                    <ArrowLeft />
                    Voltar
                </Button>
            </PageHeader>

            {renderContent()}
        </>
    )
}
