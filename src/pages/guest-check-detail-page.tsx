import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"

export function GuestCheckDetailPage() {
    return (
        <PageHeader
            title="Pedidos da comanda"
            description="Acompanhe os pedidos e altere o status de cada um."
        >
            <Button variant="outline" nativeButton={false} render={<Link to="/guest-checks" />}>
                <ArrowLeft />
                Voltar
            </Button>
        </PageHeader>
    )
}
