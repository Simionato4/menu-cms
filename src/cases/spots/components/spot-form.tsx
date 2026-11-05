import { useState, type SubmitEvent } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { SpotDTO, SpotPayload } from "../dtos/spot.dto"
import { useCreateSpot } from "../hooks/use-create-spot"
import { useUpdateSpot } from "../hooks/use-update-spot"

interface SpotFormProps {
    spot?: SpotDTO;
    onSaved: () => void;
}

export function SpotForm({ spot, onSaved }: SpotFormProps) {
    const [name, setName] = useState(spot?.name ?? '')
    const [active, setActive] = useState(spot?.active ?? true)
    const [nameError, setNameError] = useState('')

    const createSpot = useCreateSpot()
    const updateSpot = useUpdateSpot()
    const isPending = createSpot.isPending || updateSpot.isPending

    function validateName(): string {
        if (!name.trim()) {
            return 'Informe o nome da mesa.'
        }

        if (name.trim().length > 60) {
            return 'O nome deve ter no máximo 60 caracteres.'
        }

        return ''
    }

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const error = validateName()
        setNameError(error)
        if (error) {
            return
        }

        const payload: SpotPayload = {
            name: name.trim(),
            active
        }

        if (spot) {
            updateSpot.mutate({ id: spot.id, payload }, { onSuccess: onSaved })
        } else {
            createSpot.mutate(payload, { onSuccess: onSaved })
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="spot-name">Nome</Label>
                <Input
                    id="spot-name"
                    value={name}
                    maxLength={60}
                    placeholder="Mesa 01"
                    aria-invalid={Boolean(nameError)}
                    onChange={(event) => setName(event.target.value)}
                />
                {nameError && <p className="text-sm text-destructive">{nameError}</p>}
            </div>

            <Label>
                <Switch checked={active} onCheckedChange={setActive} />
                Ativa
            </Label>

            <DialogFooter>
                <DialogClose render={<Button variant="outline" />} disabled={isPending}>
                    Cancelar
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Salvando...' : 'Salvar'}
                </Button>
            </DialogFooter>
        </form>
    )
}
