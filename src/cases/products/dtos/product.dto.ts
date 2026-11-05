import type { CategoryDTO } from "@/cases/categories/dtos/category.dto"

export interface ProductDTO {
    id: string;
    name: string;
    active: boolean;
    description: string | null;
    price: string;
    picture: string | null;
    vegetarian: boolean;
    isNew: boolean;
    category: CategoryDTO | null;
}

export interface ProductPayload {
    name: string;
    active: boolean;
    description: string | null;
    price: number;
    picture: string | null;
    vegetarian: boolean;
    isNew: boolean;
    categoryId?: string | null;
}
