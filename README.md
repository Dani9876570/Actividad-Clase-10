# Arquitectura por Capas - API de Películas

## 📚 Introducción

Este proyecto implementa una **arquitectura por capas** (también conocida como arquitectura en capas o layered architecture), un patrón de diseño que organiza el código en capas horizontales, cada una con responsabilidades específicas y bien definidas.

## 🎯 ¿Por qué Arquitectura por Capas?

### Ventajas Principales

1. **Separación de Responsabilidades (SoC)**: Cada capa tiene una función específica y bien definida, lo que facilita el mantenimiento y la comprensión del código.

2. **Escalabilidad**: Permite agregar nuevas funcionalidades sin afectar otras capas, facilitando el crecimiento del proyecto.

3. **Testabilidad**: Cada capa puede ser probada de forma independiente, mejorando la calidad del código.

4. **Reutilización**: Los servicios y modelos pueden ser reutilizados en diferentes contextos sin duplicar código.

5. **Mantenibilidad**: Los cambios en una capa no afectan directamente a las demás, reduciendo el riesgo de introducir bugs.

6. **Colaboración en Equipo**: Diferentes desarrolladores pueden trabajar en diferentes capas simultáneamente sin conflictos.

7. **Facilidad de Debugging**: Al tener el código organizado, es más fácil identificar dónde ocurren los problemas.

## 🏗️ Estructura del Proyecto

```
├── config/          # Configuración de la aplicación
├── controllers/     # Controladores - Manejo de peticiones HTTP
├── middleware/      # Middlewares personalizados
├── models/          # Modelos de datos (Mongoose Schemas)
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
└── index.js         # Punto de entrada de la aplicación
```

## 📖 Descripción Detallada de Cada Capa

### 1. 📁 `config/` - Configuración

**Responsabilidad**: Centralizar toda la configuración de la aplicación, especialmente conexiones a servicios externos como bases de datos.

**¿Qué contiene?**
- Configuración de conexión a MongoDB
- Variables de entorno
- Configuraciones de servicios externos

**Ejemplo en este proyecto:**
```javascript
// config/database.js
// Maneja la conexión a MongoDB de forma centralizada
```

**¿Por qué separarlo?**
- Facilita el cambio de configuración sin tocar el código principal
- Permite tener diferentes configuraciones para desarrollo, testing y producción
- Centraliza la gestión de credenciales y conexiones

---

### 2. 📁 `models/` - Modelos de Datos

**Responsabilidad**: Definir la estructura y validación de los datos que se almacenan en la base de datos.

**¿Qué contiene?**
- Esquemas de Mongoose (MongoDB)
- Validaciones de datos
- Definición de tipos y restricciones

**Ejemplo en este proyecto:**
```javascript
// models/Movie.js
// Define el esquema de la película con sus campos y validaciones
```

**¿Por qué separarlo?**
- Centraliza la definición de la estructura de datos
- Facilita cambios en el modelo sin afectar otras capas
- Permite reutilizar el modelo en diferentes servicios
- Separa la lógica de datos de la lógica de negocio

---

### 3. 📁 `services/` - Capa de Servicios (Lógica de Negocio)

**Responsabilidad**: Contener toda la lógica de negocio y las operaciones sobre los datos. Esta es la capa más importante desde el punto de vista del negocio.

**¿Qué contiene?**
- Operaciones CRUD (Create, Read, Update, Delete)
- Lógica de negocio compleja
- Transformaciones de datos
- Validaciones de negocio

**Ejemplo en este proyecto:**
```javascript
// services/movieService.js
// Contiene métodos como getAllMovies, getMovieById, createMovie, etc.
```

**¿Por qué separarlo?**
- **Separación de preocupaciones**: La lógica de negocio está separada de la presentación (controllers)
- **Reutilización**: Los servicios pueden ser utilizados por diferentes controladores o incluso por otros servicios
- **Testabilidad**: Es más fácil probar la lógica de negocio sin necesidad de hacer peticiones HTTP
- **Mantenibilidad**: Los cambios en las reglas de negocio solo afectan esta capa

**Flujo de datos**: Los servicios reciben datos de los controladores y trabajan con los modelos para realizar operaciones.

---

### 4. 📁 `controllers/` - Controladores

**Responsabilidad**: Manejar las peticiones HTTP entrantes, extraer datos de la petición, llamar a los servicios correspondientes y devolver las respuestas adecuadas.

**¿Qué contiene?**
- Funciones que manejan rutas específicas
- Extracción de parámetros (query, params, body)
- Validación básica de entrada
- Manejo de códigos de estado HTTP
- Delegación a servicios

**Ejemplo en este proyecto:**
```javascript
// controllers/movieController.js
// Maneja las peticiones GET, POST, PATCH, DELETE para películas
```

**¿Por qué separarlo?**
- **Separación HTTP de lógica de negocio**: Los controladores solo se preocupan por HTTP, no por reglas de negocio
- **Claridad**: Es fácil ver qué rutas están disponibles y qué hacen
- **Mantenibilidad**: Cambios en la API (códigos de estado, formato de respuesta) solo afectan esta capa
- **Testabilidad**: Se pueden probar las respuestas HTTP de forma independiente

**Flujo de datos**: Los controladores reciben `req` y `res` de Express, extraen datos, llaman a servicios y envían respuestas.

---

### 5. 📁 `routes/` - Rutas

**Responsabilidad**: Definir los endpoints de la API y asociar cada ruta con su controlador correspondiente.

**¿Qué contiene?**
- Definición de rutas HTTP (GET, POST, PUT, PATCH, DELETE)
- Asociación de rutas con controladores
- Parámetros de ruta y query strings

**Ejemplo en este proyecto:**
```javascript
// routes/movieRoutes.js
// Define todas las rutas relacionadas con películas
// routes/index.js
// Router principal que agrupa todas las rutas
```

**¿Por qué separarlo?**
- **Organización**: Todas las rutas están en un solo lugar, facilitando la navegación
- **Modularidad**: Cada recurso (películas, usuarios, etc.) puede tener su propio archivo de rutas
- **Mantenibilidad**: Es fácil agregar, modificar o eliminar endpoints
- **Claridad**: Se ve de un vistazo toda la estructura de la API

**Flujo de datos**: Las rutas reciben peticiones HTTP y las dirigen al controlador correcto.

---

### 6. 📁 `middleware/` - Middlewares Personalizados

**Responsabilidad**: Interceptar las peticiones y respuestas para realizar operaciones transversales como manejo de errores, autenticación, logging, etc.

**¿Qué contiene?**
- Manejo centralizado de errores
- Validaciones comunes
- Autenticación y autorización
- Logging
- Transformación de datos

**Ejemplo en este proyecto:**
```javascript
// middleware/errorHandler.js
// Captura todos los errores y los formatea de manera consistente
```

**¿Por qué separarlo?**
- **Reutilización**: Los middlewares pueden aplicarse a múltiples rutas
- **Separación de preocupaciones**: La lógica transversal está separada del flujo principal
- **Mantenibilidad**: Cambios en el manejo de errores o autenticación solo afectan esta capa
- **Consistencia**: Garantiza que todas las rutas manejen errores de la misma manera

**Flujo de datos**: Los middlewares interceptan las peticiones antes de llegar a los controladores y las respuestas antes de ser enviadas.

---

### 7. 📄 `index.js` - Punto de Entrada

**Responsabilidad**: Configurar Express, conectar todas las capas y poner en marcha el servidor.

**¿Qué contiene?**
- Configuración de Express
- Registro de middlewares globales
- Registro de rutas
- Inicialización del servidor
- Conexión a la base de datos

**¿Por qué mantenerlo simple?**
- **Claridad**: Es fácil ver la estructura general de la aplicación
- **Mantenibilidad**: Los cambios en la configuración del servidor están centralizados
- **Separación**: La lógica de negocio no está mezclada con la configuración del servidor

---

## 🔄 Flujo de Datos en la Arquitectura

```
Cliente HTTP
    ↓
index.js (Express)
    ↓
middleware/ (si aplica)
    ↓
routes/ (definición de rutas)
    ↓
controllers/ (manejo de petición)
    ↓
services/ (lógica de negocio)
    ↓
models/ (acceso a datos)
    ↓
Base de Datos (MongoDB)
```

### Ejemplo Práctico: Obtener una película por ID

1. **Cliente** hace petición: `GET /movies/123`
2. **index.js** recibe la petición y la pasa a las rutas
3. **routes/movieRoutes.js** identifica la ruta `/:id` y la asocia con `movieController.getMovieById`
4. **controllers/movieController.js** extrae el `id` de `req.params` y llama a `movieService.getMovieById(id)`
5. **services/movieService.js** ejecuta la lógica de negocio y llama a `Movie.findById(id)`
6. **models/Movie.js** realiza la consulta a MongoDB
7. Los datos fluyen de vuelta: Modelo → Servicio → Controlador → Cliente
8. Si hay un error, **middleware/errorHandler.js** lo captura y formatea la respuesta

---

## 🎓 Principios de Diseño Aplicados

### 1. **Separación de Responsabilidades (SoC)**
Cada capa tiene una única responsabilidad bien definida.

### 2. **Principio de Responsabilidad Única (SRP)**
Cada módulo tiene una razón para cambiar.

### 3. **Inversión de Dependencias**
Las capas superiores dependen de abstracciones (interfaces) de las capas inferiores, no de implementaciones concretas.

### 4. **DRY (Don't Repeat Yourself)**
La lógica común se centraliza en servicios y middlewares.

### 5. **Abstracción**
Cada capa solo conoce la capa inmediatamente inferior, no todas las capas.

---

## 🚀 Cómo Ejecutar el Proyecto

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm run dev

# Ejecutar en modo producción
pnpm start
```

---

## 📝 Convenciones Utilizadas

- **Nombres de archivos**: camelCase (ej: `movieController.js`)
- **Nombres de carpetas**: minúsculas (ej: `controllers/`, `services/`)
- **Estructura modular**: Un archivo por recurso/entidad
- **Exportaciones**: CommonJS (`module.exports`)
- **Manejo de errores**: Centralizado en middleware

---

## 🔍 Ventajas de esta Arquitectura en este Proyecto

1. **Fácil de entender**: Cualquier desarrollador puede navegar el código y entender rápidamente dónde está cada cosa.

2. **Fácil de extender**: Agregar nuevas funcionalidades (ej: sistema de usuarios) solo requiere crear nuevos archivos siguiendo la misma estructura.

3. **Fácil de mantener**: Si necesitas cambiar cómo se obtienen las películas, solo modificas el servicio, no el controlador ni las rutas.

4. **Fácil de testear**: Puedes probar cada capa independientemente con mocks de las capas inferiores.

5. **Preparado para crecer**: La estructura soporta el crecimiento del proyecto sin necesidad de refactorización mayor.

---

## 📚 Conclusión

La arquitectura por capas es un patrón fundamental en el desarrollo de software que proporciona estructura, organización y mantenibilidad a las aplicaciones. Al separar las responsabilidades en capas bien definidas, creamos código más limpio, testeable y escalable.

Esta arquitectura es especialmente útil en proyectos que:
- Van a crecer en el tiempo
- Tienen múltiples desarrolladores trabajando en paralelo
- Requieren mantenimiento a largo plazo
- Necesitan ser testeables y confiables

---

## 👨‍🏫 Notas del Profesor

**¿Cuándo usar esta arquitectura?**
- Proyectos medianos a grandes
- Equipos de desarrollo
- Aplicaciones que requieren mantenimiento
- Cuando la lógica de negocio es compleja

**¿Cuándo NO usar esta arquitectura?**
- Proyectos muy pequeños o prototipos
- Cuando la sobre-ingeniería puede ser contraproducente
- Aplicaciones con lógica muy simple

**Recuerda**: La arquitectura debe servir al proyecto, no al revés. Si tu proyecto es pequeño, una estructura más simple puede ser más apropiada. Pero si planeas que crezca, empezar con una buena arquitectura desde el principio te ahorrará mucho tiempo y problemas en el futuro.

