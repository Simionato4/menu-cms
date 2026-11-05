import { useState } from "react"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { Button } from "@/components/ui/button"
import { SpotFormDialog } from "@/cases/spots/components/spot-form-dialog"
import { SpotTable } from "@/cases/spots/components/spot-table"
import { useDeleteSpot } from "@/cases/spots/hooks/use-delete-spot"
import { useSpots } from "@/cases/spots/hooks/use-spots"

export function SpotsPage() {
    const { data: spots = [], isPending, isError, error, refetch } = useSpots()
    const deleteSpot = useDeleteSpot()

    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const editingSpot = spots.find((spot) => spot.id === editingId)
    const deletingSpot = spots.find((spot) => spot.id === deletingId)

    function handleNew() {
        setEditingId(null)
        setFormOpen(true)
    }

    function handleEdit(id: string) {
        setEditingId(id)
        setFormOpen(true)
    }

    function handleConfirmDelete() {
        if (!deletingId) {
            return
        }

        deleteSpot.mutate(deletingId, {
            onSuccess: () => setDeletingId(null)
        })
    }

    function renderContent() {
        if (isPending) {
            return <LoadingState />
        }

        if (isError) {
            return <ErrorState error={error} onRetry={refetch} />
        }

        if (spots.length === 0) {
            return <EmptyState message="Nenhuma mesa cadastrada." />
        }

        return (
            <SpotTable
                spots={spots}
                onEdit={(spot) => handleEdit(spot.id)}
                onDelete={(spot) => setDeletingId(spot.id)}
            />
        )
    }

    return (
        <>
            <PageHeader
                title="Mesas"
                description="Gerencie as mesas do restaurante."
            >
                <Button onClick={handleNew}>
                    <Plus />
                    Nova mesa
                </Button>
            </PageHeader>

            {renderContent()}

            <SpotFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                spot={editingSpot}
            />

            <ConfirmDeleteDialog
                open={deletingId !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingId(null)
                    }
                }}
                title="Excluir mesa"
                description={deletingSpot
                    ? `A mesa "${deletingSpot.name}" será excluída. Esta ação não pode ser desfeita.`
                    : ''}
                onConfirm={handleConfirmDelete}
                isPending={deleteSpot.isPending}
            />
        </>
    )
}
