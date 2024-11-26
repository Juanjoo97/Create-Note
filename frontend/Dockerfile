# Utilizar una imagen base oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente del backend
COPY . .

# Construir el proyecto si estás usando TypeScript
RUN npm run build

# Exponer el puerto en el que tu aplicación escucha (puedes ajustar el puerto según tu configuración)
EXPOSE 3000

# Comando para iniciar el servidor (ajusta si tienes una configuración diferente)
CMD ["npm", "run", "start:prod"]
