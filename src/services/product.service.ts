import { Product, ProductCreateDTO, ProductUpdateDTO, ProductResponseDTO } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async createProduct(productData: ProductCreateDTO): Promise<ProductResponseDTO> {
        this.validateProductData(productData);
        this.validatePrice(productData.price);
        this.validateCategory(productData.category);

        const product = await this.repository.createProduct(productData);
        return this.toResponseDTO(product);
    }

    async getProductById(id: string): Promise<ProductResponseDTO> {
        if (!id || id.trim().length === 0) {
            throw new ValidationError('Product ID is required');
        }

        const product = await this.repository.getProductById(id);
        if (!product) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }

        return this.toResponseDTO(product);
    }

    async getProductsByCategory(category: string): Promise<ProductResponseDTO[]> {
        if (!category || category.trim().length === 0) {
            throw new ValidationError('Category is required');
        }

        const products = await this.repository.getProductsByCategory(category);
        return products.map(product => this.toResponseDTO(product));
    }

    async updateProduct(id: string, updateData: ProductUpdateDTO): Promise<ProductResponseDTO> {
        if (!id || id.trim().length === 0) {
            throw new ValidationError('Product ID is required');
        }

        const existingProduct = await this.repository.getProductById(id);
        if (!existingProduct) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }

        if (updateData.price !== undefined) {
            this.validatePrice(updateData.price);
        }

        if (updateData.category !== undefined) {
            this.validateCategory(updateData.category);
        }

        const updatedProduct = await this.repository.updateProduct(id, updateData);
        return this.toResponseDTO(updatedProduct);
    }

    async deleteProduct(id: string): Promise<void> {
        if (!id || id.trim().length === 0) {
            throw new ValidationError('Product ID is required');
        }

        const existingProduct = await this.repository.getProductById(id);
        if (!existingProduct) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }

        await this.repository.deleteProduct(id);
    }

    private validateProductData(data: ProductCreateDTO): void {
        if (!data.name || data.name.trim().length === 0) {
            throw new ValidationError('Product name is required');
        }

        if (data.name.length > 200) {
            throw new ValidationError('Product name must not exceed 200 characters');
        }

        if (!data.description || data.description.trim().length === 0) {
            throw new ValidationError('Product description is required');
        }

        if (data.description.length > 2000) {
            throw new ValidationError('Product description must not exceed 2000 characters');
        }

        if (data.price === undefined || data.price === null) {
            throw new ValidationError('Product price is required');
        }

        if (!data.category || data.category.trim().length === 0) {
            throw new ValidationError('Product category is required');
        }
    }

    private validatePrice(price: number): void {
        if (typeof price !== 'number' || isNaN(price)) {
            throw new ValidationError('Price must be a valid number');
        }

        if (price < 0) {
            throw new ValidationError('Price must be non-negative');
        }

        if (price > 999999.99) {
            throw new ValidationError('Price must not exceed 999999.99');
        }

        const priceString = price.toString();
        const decimalPart = priceString.split('.')[1];
        if (decimalPart && decimalPart.length > 2) {
            throw new ValidationError('Price can have at most 2 decimal places');
        }
    }

    private validateCategory(category: string): void {
        const validCategories = ['electronics', 'clothing', 'books', 'home', 'sports', 'toys', 'food', 'other'];
        const normalizedCategory = category.toLowerCase().trim();
        
        if (!validCategories.includes(normalizedCategory)) {
            throw new ValidationError(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
        }
    }

    private toResponseDTO(product: Product): ProductResponseDTO {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}