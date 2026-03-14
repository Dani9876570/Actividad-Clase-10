// 1. Importamos Express para acceder a su sistema de rutas
const express = require('express')

// 2. Creamos una instancia del Router de Express
const router = express.Router()

// 3. Importamos el controlador de películas que contiene las funciones (lógica)
const movieController = require('../controllers/movieController.js')

/**
 * DEFINICIÓN DE ENDPOINTS (RUTAS)
 * Nota: El prefijo "/movies" ya viene definido desde el index de rutas principal.
 */

// Obtiene todas las películas (GET /movies)
router.get('/', movieController.getMovies)

// Obtiene una película específica por su ID (GET /movies/:id)
router.get('/:id', movieController.getMovieById)

// Obtiene películas filtradas por el nombre del director (GET /movies/director/:nombre)
router.get('/director/:director', movieController.getMoviesByDirector)

// Crea una nueva película (POST /movies)
router.post('/', movieController.createMovie)

// Elimina una película por su ID (DELETE /movies/:id)
router.delete('/:id', movieController.deleteMovie)

// Actualiza parcialmente una película (PATCH /movies/:id)
// Nota: Usas PATCH en lugar de PUT, lo cual es correcto para actualizaciones parciales.
router.patch('/:id', movieController.updateMovie)

// 4. Exportamos este ruteador para que sea usado por el enrutador principal
module.exports = router