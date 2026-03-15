// 1. Importaciones de módulos locales (rutas, base de datos y middleware de errores)
// Traemos el enrutador principal, la función de conexión y el manejador de fallos.
const routes = require('./src/routes/index.js')
const connectDB = require('./src/config/database.js')

// 2. Importación de Express y creación de la instancia de la aplicación
const express = require('express')
const app = express()

// 3. Definición del puerto dinámico. 
// Muy importante: Railway asigna un puerto aleatorio, por eso usamos process.env.PORT.
const port = process.env.PORT || 3000

// 4. Importación del middleware personalizado para capturar y gestionar errores.
const errorHandler = require('./src/middlewares/errorHandler.js')

// 5. Importaciones para Swagger.
// Usamos swaggerUI para generar la interfaz visual de la documentación.
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.config.js')

// 6. Middleware para interpretar JSON.
// Sin esto, req.body llegaría como 'undefined' en tus POST y PUT.
app.use(express.json())

// 7. Configuración de la ruta visual para Swagger.
// Al entrar a http://tu-url.railway.app/api-docs verás toda tu API documentada.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// 8. Registro de las rutas principales de la aplicación.
// Todas las peticiones que entren a la raíz serán derivadas al archivo routes/index.js.
app.use('/', routes)

// 9. Registro del middleware de errores.
// CRÍTICO: Debe ser el último app.use para poder "atajar" los errores de las rutas de arriba.
app.use(errorHandler)

// 10. Puesta en marcha del servidor.
// Usamos una función asíncrona para asegurarnos de que la DB esté lista antes de avisar que el puerto escucha.
app.listen(port, async () => {
  try {
    // Intentamos conectar a MongoDB (Atlas o Railway local según el entorno).
    await connectDB();
    
    // Logs útiles para saber que todo está en verde.
    console.log(`✅ Servidor funcionando correctamente en el puerto: ${port}`);
    console.log(`📄 Documentación disponible en la ruta /api-docs`);
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor debido a un error en la base de datos');
    // Si la base de datos falla, matamos el proceso con código 1 (error).
    process.exit(1); 
  }
});