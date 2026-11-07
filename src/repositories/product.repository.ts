import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Product, ProductCreateDTO, ProductUpdateDTO } from '../models/product.model';

export interface ProductRepository {
    createProduct(productData: ProductCreateDTO): Promise<Product>;
    getProductById(id: string): Promise<Product | null>;
    getProductsByCategory(category: string): Promise<Product[]>;
    updateProduct(id: string, updateData: ProductUpdateDTO): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}

export class DynamoDBProductRepository implements ProductRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor(client: DynamoDBClient, tableName: string) {
        this.client = DynamoDBDocumentClient.from(client);
        this.tableName = tableName;
    }

    async createProduct(productData: ProductCreateDTO): Promise<Product> {
        const now = new Date().toISOString();
        const product: Product = {
            id: this.generateId(),
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            createdAt: now,
            updatedAt: now
        };

        const command = new PutCommand({
            TableName: this.tableName,
            Item: product
        });

        await this.client.send(command);
        return product;
    }

    async getProductById(id: string): Promise<Product | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id }
        });

        const response = await this.client.send(command);
        return response.Item ? response.Item as Product : null;
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'category-index',
            KeyConditionExpression: 'category = :category',
            ExpressionAttributeValues: {
                ':category': category
            }
        });

        const response = await this.client.send(command);
        return response.Items ? response.Items as Product[] : [];
    }

    async updateProduct(id: string, updateData: ProductUpdateDTO): Promise<Product> {
        const now = new Date().toISOString();
        const updateExpressions = [];
        const expressionAttributeValues: Record<string, any> = {};

        if (updateData.name) {
            updateExpressions.push('name = :name');
            expressionAttributeValues[':name'] = updateData.name;
        }
        if (updateData.description) {
            updateExpressions.push('description = :description');
            expressionAttributeValues[':description'] = updateData.description;
        }
        if (updateData.price) {
            updateExpressions.push('price = :price');
            expressionAttributeValues[':price'] = updateData.price;
        }
        if (updateData.category) {
            updateExpressions.push('category = :category');
            expressionAttributeValues[':category'] = updateData.category;
        }

        updateExpressions.push('updatedAt = :updatedAt');
        expressionAttributeValues[':updatedAt'] = now;

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: 'SET ' + updateExpressions.join(', '),
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        });

        const response = await this.client.send(command);
        return response.Attributes as Product;
    }

    async deleteProduct(id: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id }
        });

        await this.client.send(command);
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}