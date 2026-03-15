/**
 * =============================================================================
 * COMPONENTES Y ESQUEMAS (MODELOS DE DATOS)
 * Aquí definimos la "forma" que tienen nuestros datos para que Swagger sepa
 * qué campos son obligatorios y cuáles no.
 * =============================================================================
 */

/**
 * @swagger
 * components:
 * schemas:
 * Movie:
 * type: object
 * required: [title, year, director, duration, genre]
 * properties:
 * _id:
 * type: string
 * description: ID único generado por MongoDB.
 * title:
 * type: string
 * example: "The Dark Knight"
 * year:
 * type: number
 * minimum: 1888
 * director:
 * type: string
 * duration:
 * type: number
 * poster:
 * type: string
 * format: uri
 * genre:
 * type: array
 * items: { type: string }
 * rate:
 * type: number
 * minimum: 0
 * maximum: 10
 * default: 5
 *
 * MovieInput:
 * type: object
 * description: Esquema para la creación de películas (sin _id).
 * required: [title, year, director, duration, genre]
 * properties:
 * title: { type: string }
 * year: { type: number }
 * director: { type: string }
 * duration: { type: number }
 * poster: { type: string, format: uri }
 * genre: { type: array, items: { type: string } }
 * rate: { type: number }
 *
 * Error:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "No se encontraron películas"
 */

/**
 * =============================================================================
 * DEFINICIÓN DE ENDPOINTS (RUTAS)
 * =============================================================================
 */

/**
 * @swagger
 * /movies:
 * get:
 * tags: [Películas]
 * summary: Obtener todas las películas.
 * parameters:
 * - name: genre
 * in: query
 * description: Filtrar por género cinematográfico.
 * schema: { type: string }
 * responses:
 * 200:
 * description: Lista devuelta con éxito.
 * content:
 * application/json:
 * schema:
 * type: array
 * items: { $ref: '#/components/schemas/Movie' }
 *
 * post:
 * tags: [Películas]
 * summary: Crear una nueva película.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema: { $ref: '#/components/schemas/MovieInput' }
 * responses:
 * 201:
 * description: Película creada.
 */

/**
 * @swagger
 * /movies/{id}:
 * get:
 * tags: [Películas]
 * summary: Buscar por ID.
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema: { type: string }
 * responses:
 * 200:
 * description: Película encontrada.
 * 404:
 * description: No encontrada.
 *
 * patch:
 * tags: [Películas]
 * summary: Actualización parcial.
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema: { type: string }
 * requestBody:
 * content:
 * application/json:
 * schema: { $ref: '#/components/schemas/MovieUpdate' }
 * responses:
 * 200:
 * description: Actualizada correctamente.
 */

/**
 * @swagger
 * /movies/director/{director}:
 * get:
 * tags: [Películas]
 * summary: Películas por director.
 * parameters:
 * - name: director
 * in: path
 * required: true
 * schema: { type: string }
 * responses:
 * 200:
 * description: Lista de películas del director.
 */