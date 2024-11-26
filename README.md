# Note creation

## Descripción
"Note Creation" es una aplicación que te permite crear, editar, eliminar y archivar notas. La aplicación tiene un frontend desarrollado con Angular y un backend con NestJS. Proporciona una interfaz de usuario intuitiva para gestionar tus notas de manera eficiente. Puedes realizar las siguientes acciones:

Crear nuevas notas con títulos y contenido personalizados.
Editar notas existentes para realizar cambios o actualizaciones.
Eliminar notas que ya no necesitas.
Archivar notas para organizarlas y ocultarlas de la lista principal.
La aplicación utiliza una base de datos para almacenar y recuperar las notas, brindándote una experiencia completa de gestión de notas. Además, el frontend y el backend están diseñados para trabajar de manera conjunta, proporcionando una interfaz de usuario fluida y una gestión eficaz de los datos en el backend.

## Requisitos de Ejecución

### Frontend (Angular)

- [Node.js](https://nodejs.org/) (v10.2.4)
- [npm](https://www.npmjs.com/) (v20.9.0')
- [Angular CLI](https://angular.io/cli) (v16.0.0)

### Backend (NestJS)

- [Node.js](https://nodejs.org/) (v10.2.4)
- [npm](https://www.npmjs.com/) (v20.9.0')
- [NestJS CLI](https://docs.nestjs.com/cli) (v10.3.0)
- Base de datos compatible con NestJS ( Utilice una imagen de PostgreSQL por medio de docker postgres:14.3)
- Tener instalado docker para crear la imagen con docker-compose 

## Configuración

1. **Frontend (Angular):**
   - Navega al directorio `frontend` desde la terminal.
   - Ejecuta `npm install` para instalar las dependencias.
   - Ejecuta `ng serve` para iniciar el servidor de desarrollo de Angular.

2. **Backend (NestJS):**
   - Navega al directorio `backend` desde la terminal.
   - Ejecuta `npm install` para instalar las dependencias.
   - Ejecuta `docker-compose up` para crear la iamgen PostgreSQL  
   - Ejecuta `npm start` para iniciar el servidor NestJS 

## Uso

1. **Accede al Frontend:**
   - Abre tu navegador y ve a `http://localhost:4200`.

2. **Accede al Backend (NestJS):**
   - El backend estará escuchando en `http://localhost:3000` por defecto.

## Nota para los archivos ejecutables

Si no deseas configurar el proyecto, Para archivo .bat (WINDOWS) se encargara ejecutar los dos archivos script (Frontend,backend)


