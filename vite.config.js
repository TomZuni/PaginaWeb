import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// "base" debe ser el nombre del repositorio en GitHub (https://github.com/TomZuni/PaginaWeb)
// para que gh-pages encuentre los archivos en https://tomzuni.github.io/PaginaWeb/
export default defineConfig({
  base: '/PaginaWeb/',
  plugins: [react()],
})
