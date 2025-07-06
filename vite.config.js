import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default ({ mode }) => {
  // Carga .env.local / .env.[mode]
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // Usa el puerto definido en env
      port: Number(env.VITE_DEV_PORT) || 5173,
      proxy: {
        // Redirige /api a tu backend
        '/api': {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: env.VITE_PROXY_SECURE === 'true',
        },
      },
    },
    define: {
      // Deja import.meta.env como único origen de variables
      'process.env': {},
    },
  })
}
