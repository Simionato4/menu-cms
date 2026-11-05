import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { SpotDTO } from "../dtos/spot.dto"
import { SpotForm } from "./spot-form"

interface SpotFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    spot?: SpotDTO;
}

export function SpotFormDialog({ open, onOpenChange, spot }: SpotFormDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{spot ? 'Editar mesa' : 'Nova mesa'}</DialogTitle>
                    <DialogDescription>
                        Preencha os dados da mesa do restaurante.
                    </DialogDescription>
                </DialogHeader>
                <SpotForm spot={spot} onSaved={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    )
}
