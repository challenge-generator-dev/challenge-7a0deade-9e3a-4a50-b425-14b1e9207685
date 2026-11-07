# Implementación de CRUD de Productos en DynamoDB con Express

El sistema debe permitir la gestión de productos en una base de datos DynamoDB a través de una API REST construida con Express. Los productos tienen atributos como nombre, precio, descripción y categoría. La API debe soportar operaciones CRUD y estar cubierta por pruebas unitarias en Jest.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | crud-productos-dynamodb-express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición y Creación de la Estructura de Productos

**Objetivo:** Definir la estructura de los productos y crear la funcionalidad para añadir nuevos productos a la base de datos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identificar los atributos necesarios para un producto.
- Diseñar el esquema de producto en DynamoDB.
- Implementar la funcionalidad para añadir un nuevo producto.

**Entregable:** API REST que permite añadir productos a DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la mejor forma de estructurar los datos en DynamoDB para facilitar las consultas futuras.
- Piensa en cómo manejarías los errores de validación al añadir un producto.

</details>

### Fase 2: Implementación de Consultas y Actualizaciones de Productos

**Objetivo:** Implementar funcionalidades para consultar y actualizar productos en la base de datos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar endpoints para consultar productos por ID y por categoría.
- Implementar la funcionalidad para actualizar la información de un producto.

**Entregable:** API REST extendida con endpoints para consultar y actualizar productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo optimizar las consultas por ID y por categoría en DynamoDB.
- Piensa en cómo manejarías las actualizaciones parciales de un producto.

</details>

### Fase 3: Implementación de Eliminación de Productos y Pruebas Unitarias

**Objetivo:** Implementar la funcionalidad para eliminar productos y cubrir todas las operaciones CRUD con pruebas unitarias en Jest.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar el endpoint para eliminar productos por ID.
- Escribir pruebas unitarias para cubrir todas las operaciones CRUD.
- Asegurar que las pruebas se ejecutan correctamente en un entorno de prueba.

**Entregable:** API REST completa con funcionalidades CRUD y pruebas unitarias en Jest.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo asegurar que la eliminación de un producto no afecte negativamente a otros datos.
- Piensa en cómo estructurarías las pruebas unitarias para asegurar una cobertura completa de las operaciones CRUD.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un producto en el contexto de esta API y cómo se representa en DynamoDB?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de gestión de productos?
- **comoSeUsa**: ¿Cómo se usa la API para realizar operaciones CRUD sobre productos?
- **erroresComunes**: ¿Cuáles son los errores comunes al realizar operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones de diseño implica la implementación de la API y cómo afectan a la estructura de datos en DynamoDB?

## Criterios de Evaluacion

- Definición y creación de la estructura de productos en DynamoDB.
- Implementación de consultas y actualizaciones de productos.
- Implementación de eliminación de productos y pruebas unitarias.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
