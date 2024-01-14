#!/bin/bash

# Backend: Instalar dependencias
cd frontend
docker-compose up &
npm start