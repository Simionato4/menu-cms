export interface CategoryDTO {
    id: string;
    name: string;
    active: boolean;
    icon: string | null;
    displayOrder: number;
}

export interface CategoryPayload {
    name: string;
    active: boolean;
    icon: string | null;
    displayOrder: number;
}
