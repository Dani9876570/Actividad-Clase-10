// 1. Importamos las rutas principales desde la carpeta src
const routes = require('./src/routes/index.js');
// 2. Importamos la función que conecta a la base de datos MongoDB
const connectDB = require('./src/config/database.js');
// 3. Importamos el framework Express
const express = require('express');
// 4. Creamos la aplicación de Express
const app = express();
// 5. Definimos el puerto (usamos el de Railway o el 3000 por defecto)
const port = process.env.PORT || 3000;
// 6. Importamos el "atajador" de errores que vive en middlewares
const errorHandler = require('./src/middlewares/errorHandler.js');
// 7. Importamos las herramientas de Swagger para la documentación
const swaggerUI = require('swagger-ui-express');
// 8. Importamos la configuración específica de Swagger
const swaggerDocument = require('./swagger.config.js');

// 9. Middleware para que el servidor entienda datos en formato JSON
app.use(express.json());
// 10. Configuramos la ruta donde se verá la documentación (/api-docs)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// 11. Conectamos las rutas: todas las peticiones pasan por el archivo de rutas
app.use('/', routes);
// 12. Middleware de errores: SIEMPRE va al final para capturar fallos de las rutas
app.use(errorHandler);

// 13. Encendemos el servidor y conectamos la DB
app.listen(port, async () => {
  try {
    await connectDB(); // Esperamos a que la base de datos conecte
    console.log(`✅ Servidor en: http://localhost:${port}`);
    console.log(`📄 Swagger en: http://localhost:${port}/api-docs`);
  } catch (error) {
    console.error('❌ Error al iniciar:', error);
  }
});
