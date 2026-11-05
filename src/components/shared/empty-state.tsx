import { Inbox } from "lucide-react"

interface EmptyStateProps {
    message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed bg-card px-4 py-12 text-center text-muted-foreground">
            <Inbox className="size-8" />
            <p className="text-sm">{message}</p>
        </div>
    )
}
