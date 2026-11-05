interface ProductFormValues {
    name: string;
    price: string;
    picture: string;
}

export interface ProductFormErrors {
    name?: string;
    price?: string;
    picture?: string;
}

function isValidUrl(value: string): boolean {
    try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false
    }
}

export function validateProduct(values: ProductFormValues): ProductFormErrors {
    const errors: ProductFormErrors = {}

    if (!values.name.trim()) {
        errors.name = 'Informe o nome do produto.'
    } else if (values.name.trim().length > 60) {
        errors.name = 'O nome deve ter no máximo 60 caracteres.'
    }

    if (values.price.trim() === '' || !(Number(values.price) > 0)) {
        errors.price = 'Informe um preço maior que zero.'
    }

    if (values.picture.trim() && !isValidUrl(values.picture.trim())) {
        errors.picture = 'Informe uma URL válida, começando com http:// ou https://.'
    }

    return errors
}
