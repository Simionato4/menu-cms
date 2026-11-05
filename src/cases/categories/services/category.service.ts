import { api } from "@/lib/axios"
import type { CategoryDTO, CategoryPayload } from "../dtos/category.dto"

const ENDPOINT = '/categories'

export const CategoryService = {
    async listAll(): Promise<CategoryDTO[]> {
        const result = await api.get<CategoryDTO[]>(ENDPOINT)
        return result.data
    },

    async create(payload: CategoryPayload): Promise<CategoryDTO> {
        const result = await api.post<CategoryDTO>(ENDPOINT, payload)
        return result.data
    },

    async update(id: string, payload: CategoryPayload): Promise<CategoryDTO> {
        const result = await api.patch<CategoryDTO>(`${ENDPOINT}/${id}`, payload)
        return result.data
    },

    async remove(id: string): Promise<void> {
        await api.delete(`${ENDPOINT}/${id}`)
    },
}
