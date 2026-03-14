// 1. Importamos Express para poder usar su sistema de rutas
const express = require('express')

// 2. Importamos las rutas específicas de películas desde otro archivo
const movieRoutes = require('./movieRoutes')

// 3. Creamos una instancia de Router. 
// Esto sirve para agrupar rutas y mantener el código del servidor principal (app.js) limpio.
const router = express.Router()

/**
 * 4. Ruta raíz del enrutador.
 * Cuando alguien entre a la URL base (ej: http://localhost:3000/), 
 * recibirá el mensaje "Hello World!".
 */
router.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * 5. Registro de rutas hijas.
 * Todas las rutas definidas en 'movieRoutes' ahora tendrán el prefijo '/movies'.
 * Ejemplo: Si en movieRoutes hay un GET '/', aquí será GET '/movies'.
 */
router.use('/movies', movieRoutes)

// 6. Exportamos el enrutador para que el archivo principal de la aplicación pueda usarlo
module.exports = router