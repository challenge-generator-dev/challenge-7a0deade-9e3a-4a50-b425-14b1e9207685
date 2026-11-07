import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { DynamoDBProductRepository } from '../repositories/product.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const router = Router();

const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1'
});

const tableName = process.env.DYNAMODB_TABLE_NAME || 'products';

const productRepository = new DynamoDBProductRepository(dynamoDBClient, tableName);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  productController.createProduct(req, res, next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  productController.getProductById(req, res, next);
});

router.get('/category/:category', (req: Request, res: Response, next: NextFunction) => {
  productController.getProductsByCategory(req, res, next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  productController.updateProduct(req, res, next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  productController.deleteProduct(req, res, next);
});

export default router;