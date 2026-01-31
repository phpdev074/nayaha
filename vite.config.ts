import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'react', replacement: path.resolve(process.cwd(), 'node_modules/react') },
      { find: 'react-dom', replacement: path.resolve(process.cwd(), 'node_modules/react-dom') },
      { find: 'react/jsx-runtime', replacement: path.resolve(process.cwd(), 'node_modules/react/jsx-runtime') }
    ]
  }
})
