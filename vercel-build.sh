#!/bin/bash
echo "🚀 Iniciando build de WhiskerTales by Fatipandi..."
cd client
npm install
npm run build
echo "✅ Build finalizado. Archivos generados en /client/dist/public"

