import dotenv from 'dotenv';
import app from './app';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
if (!process.env.PORT) {
  throw new Error('PORT environment variable is required');
}
if (!process.env.AWS_REGION) {
  throw new Error('AWS_REGION environment variable is required');
}
if (!process.env.DYNAMODB_TABLE_NAME) {
  throw new Error('DYNAMODB_TABLE_NAME environment variable is required');
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available:`);
  console.log(`- POST /api/products`);
  console.log(`- GET /api/products/:id`);
  console.log(`- GET /api/products/category/:category`);
  console.log(`- PUT /api/products/:id`);
  console.log(`- DELETE /api/products/:id`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});