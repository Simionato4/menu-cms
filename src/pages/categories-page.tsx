import { useState } from "react"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { Button } from "@/components/ui/button"
import { CategoryFormDialog } from "@/cases/categories/components/category-form-dialog"
import { CategoryTable } from "@/cases/categories/components/category-table"
import { useCategories } from "@/cases/categories/hooks/use-categories"
import { useDeleteCategory } from "@/cases/categories/hooks/use-delete-category"

export function CategoriesPage() {
    const { data: categories = [], isPending, isError, error, refetch } = useCategories()
    const deleteCategory = useDeleteCategory()

    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const editingCategory = categories.find((category) => category.id === editingId)
    const deletingCategory = categories.find((category) => category.id === deletingId)

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

        deleteCategory.mutate(deletingId, {
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

        if (categories.length === 0) {
            return <EmptyState message="Nenhuma categoria cadastrada." />
        }

        return (
            <CategoryTable
                categories={categories}
                onEdit={(category) => handleEdit(category.id)}
                onDelete={(category) => setDeletingId(category.id)}
            />
        )
    }

    return (
        <>
            <PageHeader
                title="Categorias"
                description="Gerencie as categorias do cardápio."
            >
                <Button onClick={handleNew}>
                    <Plus />
                    Nova categoria
                </Button>
            </PageHeader>

            {renderContent()}

            <CategoryFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                category={editingCategory}
            />

            <ConfirmDeleteDialog
                open={deletingId !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingId(null)
                    }
                }}
                title="Excluir categoria"
                description={deletingCategory
                    ? `A categoria "${deletingCategory.name}" será excluída. Esta ação não pode ser desfeita.`
                    : ''}
                onConfirm={handleConfirmDelete}
                isPending={deleteCategory.isPending}
            />
        </>
    )
}
