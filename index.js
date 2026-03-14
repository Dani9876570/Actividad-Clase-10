// 1. Importaciones de módulos locales (rutas, base de datos y middleware de errores)
const routes = require('./src/routes/index.js')
const connectDB = require('./src/config/database.js')

// 2. Importación de Express y creación de la instancia de la aplicación
const express = require('express')
const app = express()

// 3. Definición del puerto: usa la variable de entorno de Railway/hosting o el 3000 por defecto
const port = process.env.PORT || 3000

// 4. Importación del middleware personalizado para capturar y gestionar errores
const errorHandler = require('./src/middlewares/errorHandler.js')

// 5. Importaciones para la documentación automática con Swagger
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.config.js')


// Bloque de configuración manual de Swagger (actualmente comentado porque usas swaggerDocument)
/* const SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Peliculas',
      version: '1.0.0',
      description: 'API REST para gestionar películas...',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        email: 'ing.fabio.arg@gmail.com',
        name: 'Fabio D. Argañaraz',
        url: 'https://fabiodrizzt.vercel.app/',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    tags: [
      {
        name: 'peliculas',
        description: 'Operaciones CRUD para películas',
      },
      {
        name: 'directores',
        description: 'Operaciones CRUD para directores',
      }
    ],
    basePath: '/',
  },
  apis: ['./swagger.jsdoc.js', './src/controllers/*.js'],
}

const swaggerSpec = swaggerJSDoc(SwaggerOptions) */

// 6. Middleware para que el servidor pueda interpretar datos en formato JSON (en el body de las peticiones)
app.use(express.json())

// 7. Configuración de la ruta visual para la documentación Swagger
// Se accede a través de /api-docs y usa la configuración de swaggerDocument
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// 8. Registro de las rutas principales de la aplicación
app.use('/', routes)

// 9. Registro del middleware de errores (debe ir después de las rutas para capturarlos)
app.use(errorHandler)

// 10. Puesta en marcha del servidor
app.listen(port, async () => {
  // Llama a la función que conecta con MongoDB antes de terminar de subir el servidor
  await connectDB()
  
  // Muestra en consola las rutas de acceso para desarrollo
  console.log(`http://localhost:${port}`)
  console.log(`Documentación Swagger en: http://localhost:${port}/api-docs`)
})
