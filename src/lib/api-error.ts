import { isAxiosError } from 'axios'

interface ApiErrorBody {
    message?: string
}

export function getApiErrorMessage(error: unknown): string {
    if (!isAxiosError<ApiErrorBody>(error)) {
        return 'Erro inesperado.'
    }

    if (!error.response) {
        return 'Não foi possível conectar à API.'
    }

    if (error.response.status === 500) {
        return 'Erro na API. Se for uma exclusão, verifique se existem registros vinculados a este item.'
    }

    return error.response.data?.message ?? 'Erro inesperado.'
}
