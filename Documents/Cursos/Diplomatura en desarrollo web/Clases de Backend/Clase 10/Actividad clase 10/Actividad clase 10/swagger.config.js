/**
 * Configuración de Swagger (OpenAPI 3.0)
 * Este objeto define cómo se verá y funcionará la documentación interactiva.
 */
const swaggerDocument = {
  openapi: '3.0.0', // Especificación estándar para APIs REST
  
  // 1. INFORMACIÓN GENERAL: Lo que el usuario lee al entrar a /api-docs
  info: {
    title: 'API de Películas',
    version: '1.0.0',
    description: 'API REST para gestionar películas. Permite obtener, crear, actualizar y eliminar registros.',
    contact: {
      name: 'Daniela - Web Developer',
      email: 'support@example.com'
    }
  },

  // 2. SERVIDORES: Configuración de URLs dinámicas
  servers: [
    {
      // Si Railway nos da un dominio público, Swagger apuntará allí. 
      // De lo contrario, usará localhost:3000 para tus pruebas locales.
      url: process.env.RAILWAY_PUBLIC_DOMAIN 
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
        : 'http://localhost:3000',
      description: process.env.RAILWAY_PUBLIC_DOMAIN ? 'Servidor de Producción (Railway)' : 'Servidor de Desarrollo (Local)'
    }
  ],

  // 3. ETIQUETAS: Para agrupar los endpoints y que no sea una lista desordenada
  tags: [
    {
      name: 'Películas',
      description: 'Operaciones CRUD sobre la colección de películas'
    },
    {
      name: 'General',
      description: 'Endpoints de utilidad y bienvenida'
    }
  ],

  // 4. RUTAS (PATHS): Mapeo de cada URL de tu aplicación
  paths: {
    '/': {
      get: {
        tags: ['General'],
        summary: 'Verificar estado del servidor',
        responses: {
          '200': { description: 'Servidor en línea' }
        }
      }
    },
    '/movies': {
      get: {
        tags: ['Películas'],
        summary: 'Listar películas',
        parameters: [
          {
            name: 'genre',
            in: 'query', // Indica que se usa como ?genre=Terror
            description: 'Filtrar por género cinematográfico',
            required: false,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Éxito',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Movie' } }
              }
            }
          }
        }
      },
      post: {
        tags: ['Películas'],
        summary: 'Agregar película',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MovieInput' }
            }
          }
        },
        responses: { '201': { description: 'Creada correctamente' } }
      }
    },
    '/movies/{id}': {
      // Rutas que requieren un parámetro de ID en la URL
      get: {
        tags: ['Películas'],
        summary: 'Buscar por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Película encontrada' } }
      },
      patch: {
        tags: ['Películas'],
        summary: 'Actualizar parcialmente',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MovieUpdate' } } }
        },
        responses: { '200': { description: 'Actualizada' } }
      },
      delete: {
        tags: ['Películas'],
        summary: 'Borrar película',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Eliminada' } }
      }
    }
  },

  // 5. COMPONENTES: Definición de los "moldes" de datos (Schemas)
  components: {
    schemas: {
      Movie: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          year: { type: 'number' },
          director: { type: 'string' },
          duration: { type: 'number' },
          genre: { type: 'array', items: { type: 'string' } },
          rate: { type: 'number' }
        }
      },
      MovieInput: {
        type: 'object',
        required: ['title', 'year', 'director', 'duration', 'genre'],
        properties: {
          title: { type: 'string' },
          year: { type: 'number' },
          director: { type: 'string' },
          duration: { type: 'number' },
          genre: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
}

module.exports = swaggerDocument