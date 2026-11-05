import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
    rows?: number;
}

export function LoadingState({ rows = 4 }: LoadingStateProps) {
    return (
        <div className="space-y-3" aria-label="Carregando">
            {Array.from({ length: rows }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
            ))}
        </div>
    )
}
