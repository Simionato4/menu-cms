import { useState } from "react"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { ErrorState } from "@/components/shared/error-state"
import { LoadingState } from "@/components/shared/loading-state"
import { Button } from "@/components/ui/button"
import { ALL_CATEGORIES, ProductCategoryFilter } from "@/cases/products/components/product-category-filter"
import { ProductFormDialog } from "@/cases/products/components/product-form-dialog"
import { ProductTable } from "@/cases/products/components/product-table"
import { useDeleteProduct } from "@/cases/products/hooks/use-delete-product"
import { useProducts } from "@/cases/products/hooks/use-products"

export function ProductsPage() {
    const { data: products = [], isPending, isError, error, refetch } = useProducts()
    const deleteProduct = useDeleteProduct()

    const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES)
    const [formOpen, setFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const filteredProducts = categoryFilter === ALL_CATEGORIES
        ? products
        : products.filter((product) => product.category?.id === categoryFilter)
    const editingProduct = products.find((product) => product.id === editingId)
    const deletingProduct = products.find((product) => product.id === deletingId)

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

        deleteProduct.mutate(deletingId, {
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

        if (products.length === 0) {
            return <EmptyState message="Nenhum produto cadastrado." />
        }

        if (filteredProducts.length === 0) {
            return <EmptyState message="Nenhum produto nesta categoria." />
        }

        return (
            <ProductTable
                products={filteredProducts}
                onEdit={(product) => handleEdit(product.id)}
                onDelete={(product) => setDeletingId(product.id)}
            />
        )
    }

    return (
        <>
            <PageHeader
                title="Produtos"
                description="Gerencie os produtos do cardápio."
            >
                <div className="flex flex-wrap gap-2">
                    <ProductCategoryFilter value={categoryFilter} onChange={setCategoryFilter} />
                    <Button onClick={handleNew}>
                        <Plus />
                        Novo produto
                    </Button>
                </div>
            </PageHeader>

            {renderContent()}

            <ProductFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                product={editingProduct}
            />

            <ConfirmDeleteDialog
                open={deletingId !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingId(null)
                    }
                }}
                title="Excluir produto"
                description={deletingProduct
                    ? `O produto "${deletingProduct.name}" será excluído. Esta ação não pode ser desfeita.`
                    : ''}
                onConfirm={handleConfirmDelete}
                isPending={deleteProduct.isPending}
            />
        </>
    )
}
