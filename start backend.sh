#!/bin/bash

# Backend: Instalar dependencias
cd backend
docker-compose up &
npm start
