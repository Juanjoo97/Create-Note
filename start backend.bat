@echo off
:: Cambiar al directorio del backend
cd backend

:: Ejecutar docker-compose up en una nueva ventana
start cmd /k "docker-compose up"

:: Ejecutar npm start en otra nueva ventana
start cmd /k "npm i & npm start"

:: Pausar la ventana original para evitar que se cierre
pause
