// 1. Importamos Express para acceder a la clase Router.
const express = require('express')

// 2. Importamos el archivo donde definiste las rutas específicas de películas (GET, POST, etc.)
const movieRoutes = require('./movieRoutes')

// 3. Creamos una instancia de Router. 
// Es como un "miniaplicativo" que permite organizar las rutas por secciones.
const router = express.Router()

/**
 * 4. Ruta raíz del enrutador.
 * Sirve como punto de control para verificar que la API está respondiendo.
 * En Railway, si entras a tu URL principal, deberías ver este "Hello World!".
 */
router.get('/', (req, res) => {
  res.send('Hello World! El servidor está funcionando.')
})

/**
 * 5. Registro de rutas hijas y prefijos.
 * Al usar router.use('/movies', ...), estamos creando un prefijo.
 * Esto significa que cualquier ruta dentro de movieRoutes se activará
 * ÚNICAMENTE si la URL empieza con /movies.
 */
router.use('/movies', movieRoutes)

// 6. Exportamos el enrutador configurado. 
// En tu index.js principal (el suelto), lo recibirás con un require.
module.exports = router