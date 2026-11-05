import { api } from "@/lib/axios"
import type { ProductDTO, ProductPayload } from "../dtos/product.dto"

const ENDPOINT = '/products'

export const ProductService = {
    async listAll(): Promise<ProductDTO[]> {
        const result = await api.get<ProductDTO[]>(ENDPOINT)
        return result.data
    },

    async create(payload: ProductPayload): Promise<ProductDTO> {
        const result = await api.post<ProductDTO>(ENDPOINT, payload)
        return result.data
    },

    async update(id: string, payload: ProductPayload): Promise<ProductDTO> {
        const result = await api.patch<ProductDTO>(`${ENDPOINT}/${id}`, payload)
        return result.data
    },

    async remove(id: string): Promise<void> {
        await api.delete(`${ENDPOINT}/${id}`)
    },
}
