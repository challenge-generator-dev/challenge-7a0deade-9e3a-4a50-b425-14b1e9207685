import express, { Application, Request, Response, NextFunction } from 'express';
import productRouter from './routes/product.routes';
import { errorHandler } from './utils/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/products', productRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource does not exist' });
});

app.use(errorHandler);

export default app;