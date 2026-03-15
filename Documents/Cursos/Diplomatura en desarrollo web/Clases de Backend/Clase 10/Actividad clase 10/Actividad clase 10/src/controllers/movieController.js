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
 * required: [title, year, director, duration, genre]
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
 */

// Importación del servicio que maneja la lógica y comunicación con la DB
const movieService = require('../services/movieService.js')

// Objeto controlador que agrupa los métodos que se asocian a cada ruta (endpoint)
const movieController = {

  /**
   * Obtiene todas las películas. Soporta filtro opcional por género mediante Query String (?genre=Drama).
   */
  getMovies: async (req, res, next) => {
    // 1. Extraemos el género de la query si existe
    const { genre } = req.query
    try {
      // 2. Llamamos al servicio para obtener los datos
      const movies = await movieService.getMovies(genre)
      
      // 3. Si la lista está vacía, respondemos con un 404. Si no, con un 200 y los datos.
      return movies.length === 0
        ? res.status(404).json({ message: 'No se encontraron peliculas' })
        : res.status(200).json(movies)
    } catch (error) {
      // 4. Si hay un error, lo enviamos al middleware global (errorHandler)
      next(error)
    }
  },

  /**
   * Obtiene una sola película buscando por su ID único pasado en la URL.
   */
  getMovieById: async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await movieService.getMovieById(id)
      
      // Validamos si la película existe en la base de datos
      return !movie
        ? res.status(404).json({ message: 'No se encontro la pelicula' })
        : res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Obtiene todas las películas de un director específico.
   */
  getMoviesByDirector: async (req, res, next) => {
    const { director } = req.params
    try {
      const movies = await movieService.getMoviesByDirector(director)
      return movies.length === 0
        ? res.status(404).json({ message: 'No se encontraron peliculas de este director' })
        : res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  },

  /**
   * Crea un nuevo registro de película.
   * Recibe los datos desde el body de la petición (POST).
   */
  createMovie: async (req, res, next) => {
    try {
      // Intentamos crear la película a través del servicio
      const insertedMovie = await movieService.createMovie(req.body)
      
      // Respondemos con código 201 (Created) y el objeto recién creado
      res.status(201).json(insertedMovie)
    } catch (error) {
      // Si el servicio lanza un error de validación, cae aquí y va al errorHandler
      next(error)
    }
  },

  /**
   * Elimina una película basándose en su ID.
   */
  deleteMovie: async (req, res, next) => {
    const { id } = req.params
    try {
      const deletedMovie = await movieService.deleteMovie(id)
      
      // Informamos que la operación fue exitosa (200 OK)
      res.status(200).json({ message: 'Movie deleted', deletedMovie })
    } catch (error) {
      next(error)
    }
  },

  /**
   * Actualiza los datos de una película existente.
   */
  updateMovie: async (req, res, next) => {
    const { id } = req.params
    try {
      // Enviamos el ID y los nuevos datos (body) al servicio
      const updatedMovie = await movieService.updateMovie(id, req.body)
      
      // Si el ID no existía, avisamos con un 404
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

// Exportamos el controlador para que movieRoutes.js pueda usar estas funciones
module.exports = movieController