import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detecta se está em produção (deploy) ou desenvolvimento
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/treinamentoENEL/' : '/',
  plugins: [react()],
})
