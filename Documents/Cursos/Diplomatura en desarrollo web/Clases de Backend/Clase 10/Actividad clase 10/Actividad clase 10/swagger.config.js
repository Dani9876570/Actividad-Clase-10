/**
 * Configuración de Swagger (OpenAPI 3.0)
 * Este objeto define cómo se verá y funcionará la documentación interactiva de tu API.
 */
const swaggerDocument = {
  openapi: '3.0.0', // Versión de la especificación OpenAPI
  
  // 1. INFORMACIÓN GENERAL: Título, versión y descripción que aparecen arriba en la web
  info: {
    title: 'API de Películas',
    version: '1.0.0',
    description: 'API REST para gestionar películas. Permite obtener, crear, actualizar y eliminar películas, así como filtrar por género y director.',
    contact: {
      name: 'Soporte API',
      email: 'support@example.com'
    }
  },

  // 2. SERVIDORES: Define la URL base donde se ejecutan las pruebas
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo'
    }
  ],

  // 3. ETIQUETAS: Sirven para agrupar los endpoints visualmente
  tags: [
    {
      name: 'Películas',
      description: 'Endpoints para gestionar películas'
    }
  ],

  // 4. RUTAS (PATHS): Define cada una de las URLs que acepta tu API
  paths: {
    // Endpoint de prueba (Bienvenida)
    '/': {
      get: {
        tags: ['General'],
        summary: 'Endpoint de bienvenida',
        description: 'Retorna un mensaje de bienvenida',
        responses: {
          '200': {
            description: 'Mensaje de bienvenida',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                  example: 'Hello World!'
                }
              }
            }
          }
        }
      }
    },

    // Endpoints de Películas (GET y POST)
    '/movies': {
      get: {
        tags: ['Películas'],
        summary: 'Obtener todas las películas',
        description: 'Retorna una lista de todas las películas. Opcionalmente se puede filtrar por género usando el parámetro query `genre`.',
        parameters: [
          {
            name: 'genre', // Parámetro en la URL (?genre=...)
            in: 'query',
            description: 'Filtrar películas por género',
            required: false,
            schema: {
              type: 'string',
              example: 'Action'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Lista de películas obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Movie' } // Referencia al modelo Movie
                }
              }
            }
          },
          '404': { description: 'No se encontraron películas' }
        }
      },
      post: {
        tags: ['Películas'],
        summary: 'Crear una nueva película',
        description: 'Crea una nueva película en la base de datos',
        requestBody: { // Define los datos que el cliente debe enviar
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MovieInput' }
            }
          }
        },
        responses: {
          '201': { description: 'Película creada exitosamente' },
          '400': { description: 'Error de validación' }
        }
      }
    },

    // Endpoints que requieren ID (/movies/{id})
    '/movies/{id}': {
      get: {
        tags: ['Películas'],
        summary: 'Obtener película por ID',
        parameters: [
          {
            name: 'id',
            in: 'path', // Indica que es parte de la ruta
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: { '200': { description: 'Encontrada' } }
      },
      patch: { // Actualización parcial
        tags: ['Películas'],
        summary: 'Actualizar una película',
        parameters: [
          { name: 'id', in: 'path', required: true }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MovieUpdate' }
            }
          }
        ],
        responses: { '200': { description: 'Actualizada' } }
      },
      delete: {
        tags: ['Películas'],
        summary: 'Eliminar una película',
        parameters: [
          { name: 'id', in: 'path', required: true }
        ],
        responses: { '200': { description: 'Eliminada' } }
      }
    },

    // Endpoint específico para filtrar por director
    '/movies/director/{director}': {
      get: {
        tags: ['Películas'],
        summary: 'Obtener películas por director',
        parameters: [
          {
            name: 'director',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: { '200': { description: 'Lista del director' } }
      }
    }
  },

  // 5. COMPONENTES: Definición de esquemas de datos reutilizables
  components: {
    schemas: {
      // Modelo completo de la base de datos
      Movie: {
        type: 'object',
        required: ['title', 'year', 'director', 'duration', 'genre'],
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          year: { type: 'number', minimum: 1888 },
          director: { type: 'string' },
          duration: { type: 'number' },
          poster: { type: 'string', format: 'uri' },
          genre: { type: 'array', items: { type: 'string' } },
          rate: { type: 'number', minimum: 0, maximum: 10, default: 5 }
        }
      },
      // Modelo para creación (Input del usuario)
      MovieInput: {
        type: 'object',
        required: ['title', 'year', 'director', 'duration', 'genre'],
        properties: { /* campos similares a Movie */ }
      },
      // Modelo para actualización (campos opcionales)
      MovieUpdate: {
        type: 'object',
        properties: { /* campos similares a Movie */ }
      },
      // Modelo estándar para mensajes de error
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
}

// Exportamos el objeto para ser usado por swaggerUI en el index principal
module.exports = swaggerDocument

