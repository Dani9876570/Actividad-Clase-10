/**
 * =============================================================================
 * CONFIGURACIÓN DE SWAGGER (DOCUMENTACIÓN)
 * Define los modelos de datos (Schemas) que se mostrarán en la UI de Swagger.
 * =============================================================================
 */

/**
 * @swagger
 * components:
 * schemas:
 * Movie:
 * type: object
 * required:
 * - title
 * - year
 * - director
 * - duration
 * - genre
 * properties:
 * _id:
 * type: string
 * description: ID autogenerado por MongoDB
 * title:
 * type: string
 * description: Título de la película
 * year:
 * type: integer
 * description: Año de lanzamiento
 * director:
 * type: string
 * description: Director de la película
 * duration:
 * type: integer
 * description: Duración en minutos
 * poster:
 * type: string
 * nullable: true
 * description: URL del póster de la película
 * genre:
 * type: array
 * items:
 * type: string
 * description: Lista de géneros
 * rate:
 * type: number
 * default: 5
 * description: Calificación (por defecto 5)
 * example:
 * _id: "64af98e7c4f5c93bd877ad44"
 * title: "Inception"
 * year: 2010
 * director: "Christopher Nolan"
 * duration: 148
 * poster: "https://image.url/inception.jpg"
 * genre: ["Sci-Fi", "Thriller"]
 * rate: 5
 *
 * MovieInput:
 * type: object
 * description: Datos necesarios para crear una película
 * required:
 * - title
 * - year
 * - director
 * - duration
 * - genre
 * properties:
 * title:
 * type: string
 * description: Título de la película
 * year:
 * type: integer
 * description: Año de lanzamiento
 * director:
 * type: string
 * description: Director de la película
 * duration:
 * type: integer
 * description: Duración en minutos
 * poster:
 * type: string
 * nullable: true
 * description: URL del póster (opcional)
 * genre:
 * type: array
 * items:
 * type: string
 * description: Lista de géneros
 * rate:
 * type: number
 * description: Calificación inicial (opcional)
 * example:
 * title: "Interstellar"
 * year: 2014
 * director: "Christopher Nolan"
 * duration: 169
 * poster: "https://image.url/interstellar.jpg"
 * genre: ["Sci-Fi", "Adventure"]
 * rate: 5
 *
 * MovieUpdate:
 * type: object
 * description: Datos permitidos para actualizar una película
 * properties:
 * title:
 * type: string
 * description: Título de la película
 * year:
 * type: integer
 * description: Año de lanzamiento
 * director:
 * type: string
 * description: Director de la película
 * duration:
 * type: integer
 * description: Duración en minutos
 * poster:
 * type: string
 * nullable: true
 * description: URL del póster
 * genre:
 * type: array
 * items:
 * type: string
 * description: Lista de géneros
 * rate:
 * type: number
 * description: Calificación actualizada
 * example:
 * duration: 150
 * genre: ["Sci-Fi"]
 * rate: 4
 */

// Importación del servicio que maneja la lógica de la base de datos
const movieService = require('../services/movieService.js')

// Objeto controlador que agrupa todos los métodos de las rutas de películas
const movieController = {

  /**
   * Obtiene todas las películas, permitiendo un filtro opcional por género vía Query String.
   */
  /**
   * @swagger
   * /movies:
   * get:
   * summary: Obtiene todas las películas
   * tags: [Movies]
   * parameters:
   * - in: query
   * name: genre
   * schema:
   * type: string
   * description: Género para filtrar las películas
   * responses:
   * 200:
   * description: Lista de películas
   * content:
   * application/json:
   * schema:
   * type: array
   * items:
   * $ref: '#/components/schemas/Movie'
   * 404:
   * description: No se encontraron películas
   * 500:
   * description: Error del servidor
   */
  getMovies: async (req, res, next) => {
    const { genre } = req.query
    try {
      const movies = await movieService.getMovies(genre)
      return movies.length === 0
        ? res.status(404).json({ message: 'No se encontraron peliculas' })
        : res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Obtiene una sola película buscando por su ID único.
   */
  /**
   * @swagger
   * /movies/{id}:
   * get:
   * summary: Obtiene una película por ID
   * tags: [Movies]
   * parameters:
   * - in: path
   * name: id
   * schema:
   * type: string
   * required: true
   * description: ID de la película
   * responses:
   * 200:
   * description: Película encontrada
   * 404:
   * description: Película no encontrada
   */
  getMovieById: async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await movieService.getMovieById(id)
      return !movie
        ? res.status(404).json({ message: 'No se encontro la pelicula' })
        : res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Obtiene todas las películas asociadas a un director específico pasado por parámetro.
   */
  /**
   * @swagger
   * /movies/director/{director}:
   * get:
   * summary: Obtiene películas por director
   * tags: [Movies]
   * parameters:
   * - in: path
   * name: director
   * required: true
   * responses:
   * 200:
   * description: Lista de películas del director
   */
  getMoviesByDirector: async (req, res, next) => {
    const { director } = req.params
    try {
      const movies = await movieService.getMoviesByDirector(director)
      return movies.length === 0
        ? res.status(404).json({ message: 'No se encontraron peliculas' })
        : res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Crea un nuevo registro de película con los datos enviados en el cuerpo (body) de la petición.
   */
  /**
   * @swagger
   * /movies:
   * post:
   * summary: Crea una nueva película
   * tags: [Movies]
   * requestBody:
   * required: true
   * content:
   * application/json:
   * schema:
   * $ref: '#/components/schemas/MovieInput'
   * responses:
   * 201:
   * description: Película creada exitosamente
   */
  createMovie: async (req, res, next) => {
    try {
      const insertedMovie = await movieService.createMovie(req.body)
      res.status(201).json(insertedMovie)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Elimina una película de la base de datos según el ID proporcionado.
   */
  /**
   * @swagger
   * /movies/{id}:
   * delete:
   * summary: Elimina una película
   * tags: [Movies]
   * parameters:
   * - in: path
   * name: id
   * required: true
   * responses:
   * 200:
   * description: Película eliminada
   */
  deleteMovie: async (req, res, next) => {
    const { id } = req.params
    try {
      const deletedMovie = await movieService.deleteMovie(id)
      res.status(200).json({ message: 'Movie deleted', deletedMovie })
    } catch (error) {
      next(error)
    }
  },

  /**
   * Actualiza parcialmente o totalmente una película existente.
   */
  /**
   * @swagger
   * /movies/{id}:
   * put:
   * summary: Actualiza una película existente
   * tags: [Movies]
   * parameters:
   * - in: path
   * name: id
   * required: true
   * requestBody:
   * required: true
   * content:
   * application/json:
   * schema:
   * $ref: '#/components/schemas/MovieUpdate'
   * responses:
   * 200:
   * description: Película actualizada
   * 404:
   * description: Película no encontrada
   */
  updateMovie: async (req, res, next) => {
    const { id } = req.params
    try {
      const updatedMovie = await movieService.updateMovie(id, req.body)
      if (!updatedMovie) {
        res.status(404).json({ message: 'Movie not found' })
      } else {
        res.status(200).json({ message: 'Movie updated', updatedMovie })
      }
    } catch (error) {
      next(error)
    }
  }
}

// Exportación del objeto controlador para ser usado en las rutas de Express
module.exports = movieController