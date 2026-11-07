import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { ProductCreateDTO, ProductUpdateDTO, ProductResponseDTO } from '../models/product.model';
import { NotFoundError } from '../utils/errorHandler';

export class ProductController {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData: ProductCreateDTO = req.body;

      if (!productData.name || productData.name.trim() === '') {
        res.status(400).json({ error: 'Product name is required' });
        return;
      }

      if (productData.price === undefined || productData.price < 0) {
        res.status(400).json({ error: 'Product price must be a non-negative number' });
        return;
      }

      if (!productData.category || productData.category.trim() === '') {
        res.status(400).json({ error: 'Product category is required' });
        return;
      }

      const createdProduct = await this.productService.createProduct(productData);

      const response: ProductResponseDTO = this.mapToResponseDTO(createdProduct);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || id.trim() === '') {
        res.status(400).json({ error: 'Product ID is required' });
        return;
      }

      const product = await this.productService.getProductById(id);

      if (!product) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      const response: ProductResponseDTO = this.mapToResponseDTO(product);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category } = req.params;

      if (!category || category.trim() === '') {
        res.status(400).json({ error: 'Category parameter is required' });
        return;
      }

      const products = await this.productService.getProductsByCategory(category);

      const response: ProductResponseDTO[] = products.map(product => this.mapToResponseDTO(product));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: ProductUpdateDTO = req.body;

      if (!id || id.trim() === '') {
        res.status(400).json({ error: 'Product ID is required' });
        return;
      }

      if (updateData.price !== undefined && updateData.price < 0) {
        res.status(400).json({ error: 'Product price must be a non-negative number' });
        return;
      }

      const existingProduct = await this.productService.getProductById(id);

      if (!existingProduct) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      const updatedProduct = await this.productService.updateProduct(id, updateData);

      const response: ProductResponseDTO = this.mapToResponseDTO(updatedProduct);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || id.trim() === '') {
        res.status(400).json({ error: 'Product ID is required' });
        return;
      }

      const existingProduct = await this.productService.getProductById(id);

      if (!existingProduct) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      await this.productService.deleteProduct(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  private mapToResponseDTO(product: {
    id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  }): ProductResponseDTO {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }
}