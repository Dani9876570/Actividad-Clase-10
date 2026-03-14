/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - year
 *         - director
 *         - duration
 *         - genre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la película generado por MongoDB
 *           example: 507f1f77bcf86cd799439011
 *         title:
 *           type: string
 *           description: Título de la película
 *           example: The Dark Knight
 *         year:
 *           type: number
 *           description: Año de lanzamiento de la película
 *           example: 2008
 *           minimum: 1888
 *         director:
 *           type: string
 *           description: Nombre del director de la película
 *           example: Christopher Nolan
 *         duration:
 *           type: number
 *           description: Duración de la película en minutos
 *           example: 152
 *           minimum: 1
 *         poster:
 *           type: string
 *           description: URL del poster de la película
 *           example: https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg
 *           format: uri
 *         genre:
 *           type: array
 *           description: Lista de géneros de la película
 *           items:
 *             type: string
 *           example:
 *             - Action
 *             - Crime
 *             - Drama
 *         rate:
 *           type: number
 *           description: Calificación de la película (0-10)
 *           example: 9
 *           minimum: 0
 *           maximum: 10
 *           default: 5
 *     MovieInput:
 *       type: object
 *       required:
 *         - title
 *         - year
 *         - director
 *         - duration
 *         - genre
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la película
 *           example: Inception
 *         year:
 *           type: number
 *           description: Año de lanzamiento de la película
 *           example: 2010
 *           minimum: 1888
 *         director:
 *           type: string
 *           description: Nombre del director de la película
 *           example: Christopher Nolan
 *         duration:
 *           type: number
 *           description: Duración de la película en minutos
 *           example: 148
 *           minimum: 1
 *         poster:
 *           type: string
 *           description: URL del poster de la película
 *           example: https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg
 *           format: uri
 *         genre:
 *           type: array
 *           description: Lista de géneros de la película
 *           items:
 *             type: string
 *           example:
 *             - Action
 *             - Adventure
 *             - Sci-Fi
 *         rate:
 *           type: number
 *           description: Calificación de la película (0-10)
 *           example: 8.8
 *           minimum: 0
 *           maximum: 10
 *           default: 5
 *     MovieUpdate:
 *       type: object
 *       description: Esquema para actualización parcial de película. Todos los campos son opcionales.
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la película
 *           example: Inception
 *         year:
 *           type: number
 *           description: Año de lanzamiento de la película
 *           example: 2010
 *           minimum: 1888
 *         director:
 *           type: string
 *           description: Nombre del director de la película
 *           example: Christopher Nolan
 *         duration:
 *           type: number
 *           description: Duración de la película en minutos
 *           example: 148
 *           minimum: 1
 *         poster:
 *           type: string
 *           description: URL del poster de la película
 *           example: https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg
 *           format: uri
 *         genre:
 *           type: array
 *           description: Lista de géneros de la película
 *           items:
 *             type: string
 *           example:
 *             - Action
 *             - Adventure
 *             - Sci-Fi
 *         rate:
 *           type: number
 *           description: Calificación de la película (0-10)
 *           example: 8.8
 *           minimum: 0
 *           maximum: 10
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error descriptivo
 *           example: No se encontraron peliculas
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - General
 *     summary: Endpoint de bienvenida
 *     description: Retorna un mensaje de bienvenida
 *     responses:
 *       200:
 *         description: Mensaje de bienvenida
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World!
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *       - Películas
 *     summary: Obtener todas las películas
 *     description: Retorna una lista de todas las películas. Opcionalmente se puede filtrar por género usando el parámetro query `genre`.
 *     parameters:
 *       - name: genre
 *         in: query
 *         description: Filtrar películas por género
 *         required: false
 *         schema:
 *           type: string
 *           example: Action
 *     responses:
 *       200:
 *         description: Lista de películas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *             example:
 *               - _id: 507f1f77bcf86cd799439011
 *                 title: The Dark Knight
 *                 year: 2008
 *                 director: Christopher Nolan
 *                 duration: 152
 *                 poster: https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg
 *                 genre:
 *                   - Action
 *                   - Crime
 *                   - Drama
 *                 rate: 9
 *       404:
 *         description: No se encontraron películas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: No se encontraron peliculas
 *   post:
 *     tags:
 *       - Películas
 *     summary: Crear una nueva película
 *     description: Crea una nueva película en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *           example:
 *             title: Inception
 *             year: 2010
 *             director: Christopher Nolan
 *             duration: 148
 *             poster: https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg
 *             genre:
 *               - Action
 *               - Adventure
 *               - Sci-Fi
 *             rate: 8.8
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     tags:
 *       - Películas
 *     summary: Obtener película por ID
 *     description: Retorna una película específica basada en su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la película
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Película encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: No se encontro la pelicula
 *   patch:
 *     tags:
 *       - Películas
 *     summary: Actualizar una película
 *     description: Actualiza parcialmente una película existente. Solo se deben enviar los campos que se desean actualizar.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la película a actualizar
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieUpdate'
 *           example:
 *             rate: 9.5
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Movie updated
 *                 updatedMovie:
 *                   $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Movie not found
 *   delete:
 *     tags:
 *       - Películas
 *     summary: Eliminar una película
 *     description: Elimina una película de la base de datos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la película a eliminar
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Movie deleted
 *                 deletedMovie:
 *                   $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /movies/director/{director}:
 *   get:
 *     tags:
 *       - Películas
 *     summary: Obtener películas por director
 *     description: Retorna todas las películas dirigidas por un director específico
 *     parameters:
 *       - name: director
 *         in: path
 *         required: true
 *         description: Nombre del director
 *         schema:
 *           type: string
 *           example: Christopher Nolan
 *     responses:
 *       200:
 *         description: Lista de películas del director
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *         description: No se encontraron películas del director
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: No se encontraron peliculas
 */
