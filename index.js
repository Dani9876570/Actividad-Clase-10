// 1. CONFIGURACIÓN DE VARIABLES DE ENTORNO
const dotenv = require('dotenv');

// Determinamos qué entorno usar (por defecto 'development')
const ambiente = process.env.NODE_ENV || 'development';

/**
 * Lógica para elegir el archivo .env según tus imágenes:
 * - Si es 'development', usará .env.development
 * - Si es 'production', usará .env.production
 * - Si es 'railway', usará .env.local_railway
 */
let nombreArchivoEnv = `.env.${ambiente}`;

if (ambiente === 'railway') {
    nombreArchivoEnv = '.env.local_railway';
}

// Cargamos el archivo seleccionado
dotenv.config({ path: nombreArchivoEnv });

console.log(`🌍 Cargando configuración desde: ${nombreArchivoEnv}`);

// 2. IMPORTACIONES
const routes = require('./src/routes/index.js');
const connectDB = require('./src/config/database.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 3. MIDDLEWARES
const errorHandler = require('./src/middlewares/errorHandler.js');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.config.js');

app.use(express.json());

// 4. RUTAS Y DOCUMENTACIÓN
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', routes);
app.use(errorHandler);

// 5. INICIO DEL SERVIDOR
app.listen(port, async () => {
  try {
    // Aquí es donde se usa la MONGO_URI de tu archivo .env seleccionado
    await connectDB();
    console.log(`✅ Servidor corriendo en puerto: ${port}`);
    console.log(`📄 Documentación: http://localhost:${port}/api-docs`);
  } catch (error) {
    console.error('❌ Error fatal al iniciar:', error.message);
  }
});
