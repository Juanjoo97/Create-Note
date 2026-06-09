# Note Creation

## Descripción
"Note Creation" es una aplicación para crear, editar, eliminar y archivar notas. Tiene un frontend en Angular con Tailwind CSS y un backend en NestJS con TypeORM y PostgreSQL.

Funcionalidades:

- Crear notas con título y contenido.
- Editar notas existentes.
- Eliminar notas.
- Archivar y desarchivar notas.

## Despliegue en producción

| Capa | Servicio | URL |
|---|---|---|
| Frontend | Firebase Hosting | https://mynoteappangular.web.app |
| Backend | Railway (Docker) | https://create-note-production.up.railway.app |
| Base de datos | Neon (PostgreSQL) | — |

El backend se despliega automáticamente en Railway con cada push a `main` (usa `backend/Dockerfile` y `backend/railway.json`). El frontend se despliega con `firebase deploy` desde el directorio `frontend`.

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.io/cli) v16
- Una base de datos PostgreSQL (por ejemplo, una instancia gratuita en [Neon](https://neon.tech))

## Configuración local

1. **Backend (NestJS):**
   - Navega al directorio `backend`.
   - Crea un archivo `.env` con:
     ```
     DATABASE_URL=postgresql://usuario:password@host:5432/nombre_db
     NODE_ENV=development
     ```
   - Ejecuta `npm install`.
   - Ejecuta `npm start` (escucha en `http://localhost:3000`).

2. **Frontend (Angular):**
   - Navega al directorio `frontend`.
   - Ejecuta `npm install`.
   - Ejecuta `npm start` (abre `http://localhost:4200`).

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/notes` | Lista todas las notas |
| GET | `/notes/:id` | Obtiene una nota |
| POST | `/notes` | Crea una nota |
| PUT | `/notes/:id` | Actualiza una nota |
| DELETE | `/notes/:id` | Elimina una nota |
| PATCH | `/notes/:id/archive` | Archiva una nota |
| PATCH | `/notes/:id/unarchive` | Desarchiva una nota |
