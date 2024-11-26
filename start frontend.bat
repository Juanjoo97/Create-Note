@echo off
:: Cambiar al directorio del frontend
cd frontend

:: Ejecutar npm start en otra nueva ventana
start cmd /k "npm i & npm start"

:: Pausar la ventana original para evitar que se cierre
pause
