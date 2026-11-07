# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/product.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /api/products`
  - `GET /api/products/:id`
  - `GET /api/products/category/:category`
  - `PUT /api/products/:id`
  - `DELETE /api/products/:id`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos corruptos — arreglar primero

El contenido no corresponde a la extension. Regeneralos completos:

- `package.json` — El contenido no corresponde a un archivo json. Hay que regenerarlo completo.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261106212220607), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: crud-productos-dynamodb-express
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de Productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición y Creación de la Estructura de Productos — objetivo: Definir la estructura de los productos y crear la funcionalidad para añadir nuevos productos a la base de datos. — entregable (NO resolver): API REST que permite añadir productos a DynamoDB.
- Fase 2: Implementación de Consultas y Actualizaciones de Productos — objetivo: Implementar funcionalidades para consultar y actualizar productos en la base de datos. — entregable (NO resolver): API REST extendida con endpoints para consultar y actualizar productos.
- Fase 3: Implementación de Eliminación de Productos y Pruebas Unitarias — objetivo: Implementar la funcionalidad para eliminar productos y cubrir todas las operaciones CRUD con pruebas unitarias en Jest. — entregable (NO resolver): API REST completa con funcionalidades CRUD y pruebas unitarias en Jest.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: src/app.ts ===
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

// === ARCHIVO: package.json ===
{
  "name": "product-crud-api",
  "version": "1.0.0",
  "description": "API for product management using DynamoDB and Express",
  "main": "src/main.ts",
  "scripts": {
    "start": "ts-node src/main.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "keywords": [
    "express",
    "dynamodb",
    "typescript",
    "crud"
  ],
  "author": "Pragma",
  "license": "MIT",
  "dependencies": {
    "express": "4.21.0",
    "dotenv": "^16.4.5",
    "@aws-sdk/client-dynamodb": "3.632.0",
    "@aws-sdk/lib-dynamodb": "3.632.0"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "22.7.0",
    "aws-sdk-client-mock": "4.0.1",
    "jest": "29.7.0",
    "@types/jest": "29.5.12",
    "ts-jest": "29.2.4",
    "typescript": "5.7.0",
    "ts-node": "^10.9.2",
    "@types/dotenv": "^8.2.0",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.2"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts",
      "js",
      "json",
      "node"
    ],
    "testMatch": [
      "**/tests/**/*.test.ts"
    ],
    "transform": {
      "^.+\.ts$": "ts-jest"
    }
  }
}

// === ARCHIVO: src/models/product.model.ts ===
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

// === ARCHIVO: src/repositories/product.repository.ts ===
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

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "src/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}

// === ARCHIVO: src/routes/product.routes.ts ===
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

// === ARCHIVO: src/controllers/product.controller.ts ===
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

// === ARCHIVO: src/services/product.service.ts ===
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

// === ARCHIVO: src/utils/errorHandler.ts ===
import { Request, Response, NextFunction } from 'express';

export interface ApiError {
    statusCode: number;
    message: string;
    timestamp: string;
    path?: string;
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error(`[ERROR] ${err.name}: ${err.message}`);
    console.error(`[ERROR] Stack: ${err.stack}`);

    if (res.headersSent) {
        return next(err);
    }

    const apiError = buildApiError(err, req);
    res.status(apiError.statusCode).json(apiError);
}

function buildApiError(err: Error, req: Request): ApiError {
    const baseError: ApiError = {
        statusCode: 500,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: req.path
    };

    if (err instanceof ValidationError) {
        return {
            ...baseError,
            statusCode: 400,
            message: err.message
        };
    }

    if (err instanceof NotFoundError) {
        return {
            ...baseError,
            statusCode: 404,
            message: err.message
        };
    }

    if (err instanceof UnauthorizedError) {
        return {
            ...baseError,
            statusCode: 401,
            message: err.message
        };
    }

    if (err instanceof ForbiddenError) {
        return {
            ...baseError,
            statusCode: 403,
            message: err.message
        };
    }

    if (err instanceof ConflictError) {
        return {
            ...baseError,
            statusCode: 409,
            message: err.message
        };
    }

    if (err.name === 'SequelizeValidationError' || err.name === 'ValidationError') {
        return {
            ...baseError,
            statusCode: 400,
            message: extractValidationMessage(err)
        };
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return {
            ...baseError,
            statusCode: 401,
            message: 'Invalid or expired token'
        };
    }

    return baseError;
}

function extractValidationMessage(err: Error): string {
    const validationError = err as { errors?: Array<{ message: string }> };
    if (validationError.errors && Array.isArray(validationError.errors)) {
        return validationError.errors.map(e => e.message).join(', ');
    }
    return err.message;
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

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}

export function notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({
        statusCode: 404,
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
        path: req.path
    });
}

// === ARCHIVO: src/config/dynamodb.config.ts ===
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DynamoDBDocumentClientConfig } from '@aws-sdk/lib-dynamodb';

function getClientConfig(): DynamoDBClientConfig {
    const region = process.env.AWS_REGION;
    if (!region) {
        throw new Error('AWS_REGION environment variable is required');
    }

    const config: DynamoDBClientConfig = {
        region: region
    };

    const endpoint = process.env.DYNAMODB_ENDPOINT;
    if (endpoint) {
        config.endpoint = endpoint;
        console.log(`[CONFIG] Using custom DynamoDB endpoint: ${endpoint}`);
    }

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    
    if (accessKeyId && secretAccessKey) {
        config.credentials = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        };
        console.log('[CONFIG] Using AWS credentials from environment variables');
    } else if (!endpoint) {
        console.warn('[CONFIG] AWS credentials not provided - using default credential chain');
    }

    console.log(`[CONFIG] DynamoDB client configured for region: ${region}`);
    return config;
}

function getDocumentClientConfig(): DynamoDBDocumentClientConfig {
    return {
        marshallOptions: {
            removeUndefinedValues: true,
            convertClassInstanceToMap: true
        },
        unmarshallOptions: {
            wrapNumbers: false
        }
    };
}

export function createDynamoDBClient(): DynamoDBClient {
    const config = getClientConfig();
    return new DynamoDBClient(config);
}

export function createDynamoDBDocumentClient(client: DynamoDBClient): DynamoDBDocumentClient {
    const config = getDocumentClientConfig();
    return DynamoDBDocumentClient.from(client, config);
}

export function createDynamoDBClientWithConfig(): DynamoDBDocumentClient {
    const dbClient = createDynamoDBClient();
    return createDynamoDBDocumentClient(dbClient);
}

export function validateEnvironmentVariables(): void {
    const requiredVars = ['AWS_REGION', 'DYNAMODB_TABLE_NAME'];
    const missingVars: string[] = [];

    for (const varName of requiredVars) {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    }

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    console.log('[CONFIG] All required environment variables are set');
}

export function getTableName(): string {
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    if (!tableName) {
        throw new Error('DYNAMODB_TABLE_NAME environment variable is required');
    }
    return tableName;
}

export function getRegion(): string {
    const region = process.env.AWS_REGION;
    if (!region) {
        throw new Error('AWS_REGION environment variable is required');
    }
    return region;
}

// === ARCHIVO: tests/product.test.ts ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
