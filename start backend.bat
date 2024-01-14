@echo off
:: Backend: Instalar dependencias
cd backend
start cmd /k "docker-compose up"
npm start
pause