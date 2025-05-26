# Pokedex NestJS

API REST de Pokémon basada en NestJS y MongoDB. Esta aplicación proporciona endpoints para crear, leer, actualizar y eliminar información de Pokémon, así como una funcionalidad de semilla para poblar la base de datos con datos de Pokémon.

## Requisitos previos

- Node.js (v18 o superior)
- Docker y Docker Compose
- Git

## Tecnologías utilizadas

- NestJS
- MongoDB
- Mongoose
- Docker
- TypeScript

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/gcruces95/learning-nestjs-pokedex
cd learning-nestjs-pokedex
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar la base de datos MongoDB

Levanta el contenedor de MongoDB usando Docker Compose:

```bash
docker-compose up -d
```

Esto iniciará un contenedor MongoDB en el puerto 27017.

## Ejecución

### Desarrollo

```bash
npm run start:dev
# o
yarn start:dev
```

La aplicación estará disponible en [http://localhost:3000/api/v2](http://localhost:3000/api/v2)

### Producción

```bash
npm run build
npm run start:prod
# o
yarn build
yarn start:prod
```

## Seeders (Carga de datos iniciales)

Para poblar la base de datos con datos de Pokémon, puedes hacer una solicitud GET al endpoint de semilla:

```bash
curl http://localhost:3000/api/v2/seed
```

Alternativamente, puedes usar herramientas como Postman o simplemente acceder a la URL en tu navegador.

### Recomendaciones para el Seed

- **Ejecución inicial**: Ejecuta el seed inmediatamente después de iniciar la aplicación por primera vez para tener datos con los que trabajar.
- **Base de datos limpia**: Asegúrate de que la base de datos esté vacía antes de ejecutar el seed para evitar duplicados.
- **Monitoreo**: Si la petición responde "Seed executed" significa que la carga se realió correctamente.
- **Una sola vez**: El seed está diseñado para ejecutarse una sola vez. Ejecutar multiples veces puede causar errores y perder la data.
- **Tiempo de espera**: El proceso puede tardar varios segundos dependiendo de la cantidad de datos a insertar. Ten paciencia mientras se completa.
- **Verificación**: Después de ejecutar el seed, puedes verificar que los datos se han cargado correctamente haciendo una solicitud GET a `/api/v2/pokemon`.

## Endpoints de la API

### Pokémon

- `GET /api/v2/pokemon` - Obtener todos los Pokémon
- `GET /api/v2/pokemon/:term` - Obtener un Pokémon por ID, nombre o número de Pokédex
- `POST /api/v2/pokemon` - Crear un nuevo Pokémon
- `PATCH /api/v2/pokemon/:term` - Actualizar un Pokémon
- `DELETE /api/v2/pokemon/:id` - Eliminar un Pokémon

### Paginación

La API soporta paginación para el endpoint `GET /api/v2/pokemon` mediante los siguientes parámetros de consulta:

- `limit`: Número de resultados por página (por defecto: 10)
- `offset`: Número de registros a saltar (por defecto: 0)

Ejemplo:
```bash
# Obtener 20 Pokémon, saltando los primeros 10
GET /api/v2/pokemon?limit=20&offset=10
```

La respuesta incluirá:
- Total de registros en la base de datos
- Siguiente página (si existe)
- Página anterior (si existe)
- Lista de Pokémon para la página actual

## Estructura del proyecto

```
pokedex/
├── src/
│   ├── common/          # Utilidades compartidas, pipes, decoradores, etc.
│   ├── pokemon/         # Módulo de Pokémon (controlador, servicio, DTOs, entidades)
│   ├── seed/            # Módulo para poblar la base de datos
│   ├── app.module.ts    # Módulo principal de la aplicación
│   └── main.ts          # Punto de entrada de la aplicación
├── docker-compose.yaml  # Configuración de Docker Compose
├── nest-cli.json        # Configuración de Nest CLI
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Este archivo
```

## Variables de entorno

La aplicación utiliza las siguientes variables de entorno:

- `PORT`: Puerto donde se ejecutará la aplicación (por defecto: 3000)
- `MONGODB_URI`: URI de conexión a MongoDB (por defecto: mongodb://localhost:27017/nest-pokemon)

## Scripts disponibles

- `npm run build` - Compila la aplicación
- `npm run start` - Inicia la aplicación en modo producción
- `npm run start:dev` - Inicia la aplicación en modo desarrollo con recarga automática
- `npm run start:debug` - Inicia la aplicación en modo depuración
- `npm run lint` - Ejecuta ESLint para verificar el código
- `npm run test` - Ejecuta pruebas unitarias
- `npm run test:e2e` - Ejecuta pruebas end-to-end

## Licencia

Este proyecto está licenciado bajo la Licencia UNLICENSED.
