import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductCreateDTO {
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface ProductUpdateDTO {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
}

export interface ProductResponseDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export const productToResponseDTO = (product: Product): ProductResponseDTO => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
});

export const productCreateDTOToProduct = (dto: ProductCreateDTO): Omit<Product, 'id' | 'createdAt' | 'updatedAt'> => ({
    name: dto.name,
    description: dto.description,
    price: dto.price,
    category: dto.category
});

export const productUpdateDTOToProduct = (dto: ProductUpdateDTO): Partial<Product> => ({
    ...(dto.name && { name: dto.name }),
    ...(dto.description && { description: dto.description }),
    ...(dto.price && { price: dto.price }),
    ...(dto.category && { category: dto.category })
});