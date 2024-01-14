@echo off


:: Frontend: Instalar dependencias y luego iniciar la aplicación
start cmd /k "cd frontend && npm install"
npm start
pause