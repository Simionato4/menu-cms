import { CircleAlert } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getApiErrorMessage } from "@/lib/api-error"

interface ErrorStateProps {
    error: unknown;
    onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
    return (
        <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Não foi possível carregar os dados.</AlertTitle>
            <AlertDescription>{getApiErrorMessage(error)}</AlertDescription>
            <AlertAction>
                <Button variant="outline" size="sm" onClick={onRetry}>
                    Tentar novamente
                </Button>
            </AlertAction>
        </Alert>
    )
}
