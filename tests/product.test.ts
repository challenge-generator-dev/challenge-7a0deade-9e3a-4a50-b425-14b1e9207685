import { Product, ProductCreateDTO, ProductUpdateDTO, ProductResponseDTO } from '../src/models/product.model';
import { ProductRepository } from '../src/repositories/product.repository';
import { DynamoDBProductRepository } from '../src/repositories/product.repository';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommandOutput, GetCommandOutput, DeleteCommandOutput, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

describe('ProductRepository', () => {
    let repository: ProductRepository;
    let dynamoDBMock: ReturnType<typeof mockClient<DynamoDBDocumentClient>>;

    const mockProduct: Product = {
        id: 'test-id-123',
        name: 'Test Product',
        price: 99.99,
        description: 'A test product description',
        category: 'electronics',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const mockCreateDTO: ProductCreateDTO = {
        name: 'New Product',
        price: 149.99,
        description: 'New product description',
        category: 'electronics'
    };

    const mockUpdateDTO: ProductUpdateDTO = {
        name: 'Updated Product',
        price: 199.99
    };

    beforeEach(() => {
        const config: DynamoDBClientConfig = {
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'test-key',
                secretAccessKey: 'test-secret'
            }
        };
        
        const client = new DynamoDBClient(config);
        dynamoMock = mockClient(DynamoDBDocumentClient);
        repository = new DynamoDBProductRepository(client, 'test-table');
    });

    afterEach(() => {
        dynamoMock.reset();
    });

    describe('createProduct', () => {
        it('should create a product and return it with generated id', async () => {
            // TODO: Implementar test - configurar mock para PutCommand
            // Given: mockCreateDTO
            // When: repository.createProduct(mockCreateDTO)
            // Then: verificar que el producto tiene un id generado
            // Then: verificar que los atributos coinciden con el DTO
            
            const result = await repository.createProduct(mockCreateDTO);
            expect(result).toBeDefined();
            expect(result.id).toBeDefined();
            expect(result.name).toBe(mockCreateDTO.name);
            expect(result.price).toBe(mockCreateDTO.price);
        });

        it('should throw error when DynamoDB fails to create product', async () => {
            // TODO: Implementar test - configurar mock para lanzar error
            // Given: DynamoDB retorna error
            // When: repository.createProduct(mockCreateDTO)
            // Then: verificar que se lanza la excepción correspondiente
        });
    });

    describe('getProductById', () => {
        it('should return product when it exists', async () => {
            // TODO: Implementar test - configurar mock para GetCommand
            // Given: un producto existe en DynamoDB
            // When: repository.getProductById('test-id-123')
            // Then: verificar que retorna el producto
            
            const result = await repository.getProductById('test-id-123');
            expect(result).toBeDefined();
        });

        it('should return null when product does not exist', async () => {
            // TODO: Implementar test - configurar mock para retornar item vacío
            // Given: DynamoDB retorna resultado vacío
            // When: repository.getProductById('non-existent-id')
            // Then: verificar que retorna null
            
            const result = await repository.getProductById('non-existent-id');
            expect(result).toBeNull();
        });
    });

    describe('getProductsByCategory', () => {
        it('should return all products in a category', async () => {
            // TODO: Implementar test - configurar mock para QueryCommand
            // Given: múltiples productos con categoría 'electronics'
            // When: repository.getProductsByCategory('electronics')
            // Then: verificar que retorna array de productos
            
            const result = await repository.getProductsByCategory('electronics');
            expect(Array.isArray(result)).toBe(true);
        });

        it('should return empty array when no products in category', async () => {
            // TODO: Implementar test
            // Given: no hay productos en la categoría
            // When: repository.getProductsByCategory('empty-category')
            // Then: verificar que retorna array vacío
            
            const result = await repository.getProductsByCategory('empty-category');
            expect(result).toEqual([]);
        });
    });

    describe('updateProduct', () => {
        it('should update product and return updated version', async () => {
            // TODO: Implementar test - configurar mock para UpdateCommand
            // Given: producto existente en DynamoDB
            // When: repository.updateProduct('test-id-123', mockUpdateDTO)
            // Then: verificar que el producto tiene los nuevos valores
            
            const result = await repository.updateProduct('test-id-123', mockUpdateDTO);
            expect(result).toBeDefined();
        });

        it('should throw error when product to update does not exist', async () => {
            // TODO: Implementar test
            // Given: producto no existe
            // When: repository.updateProduct('non-existent-id', mockUpdateDTO)
            // Then: verificar que se lanza excepción
        });
    });

    describe('deleteProduct', () => {
        it('should delete product successfully', async () => {
            // TODO: Implementar test - configurar mock para DeleteCommand
            // Given: producto existe en DynamoDB
            // When: repository.deleteProduct('test-id-123')
            // Then: verificar que no lanza error (operación exitosa)
            
            await expect(repository.deleteProduct('test-id-123')).resolves.not.toThrow();
        });

        it('should handle error when product does not exist', async () => {
            // TODO: Implementar test
            // Given: producto no existe
            // When: repository.deleteProduct('non-existent-id')
            // Then: verificar manejo de error
        });
    });
});