import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(), // Esto permitirá que el proyecto insertado reconozca las rutas del tsconfig
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    chunkSizeWarningLimit: 3000, // Mantén esta configuración si el proyecto lo requiere
  },
  server: {
    port: 5173, // Puedes ajustar el puerto si es necesario
    open: true, // Opción para abrir el navegador automáticamente al iniciar
  },
});
