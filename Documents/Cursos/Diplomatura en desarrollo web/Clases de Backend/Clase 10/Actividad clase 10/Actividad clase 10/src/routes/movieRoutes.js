// 1. Importamos Express para acceder a su sistema de rutas.
const express = require('express')

// 2. Creamos una instancia del Router de Express.
// Esto permite que este archivo sea un "módulo" de rutas independiente.
const router = express.Router()

// 3. Importamos el controlador. 
// Aquí es donde reside la lógica que conecta las rutas con la base de datos (vía el modelo).
const movieController = require('../controllers/movieController.js')

/**
 * DEFINICIÓN DE ENDPOINTS (RUTAS)
 * Recordatorio: Estas rutas son relativas al prefijo '/movies' definido en routes/index.js.
 */

// GET /movies -> Llama a la función que trae el listado completo (o filtrado por género).
router.get('/', movieController.getMovies)

// GET /movies/:id -> El ":id" es un parámetro dinámico que el controlador usará para buscar en Atlas.
router.get('/:id', movieController.getMovieById)

// GET /movies/director/:director -> Permite búsquedas específicas por el nombre del director.
router.get('/director/:director', movieController.getMoviesByDirector)

// POST /movies -> Recibe los datos del body para crear un nuevo documento en la colección.
router.post('/', movieController.createMovie)

// DELETE /movies/:id -> Elimina de forma permanente el documento que coincida con el ID.
router.delete('/:id', movieController.deleteMovie)

// PATCH /movies/:id -> Actualización parcial (ideal para modificar solo el 'rate').
router.patch('/:id', movieController.updateMovie)

// 4. Exportamos este ruteador para integrarlo en el index.js de la carpeta routes.
module.exports = router