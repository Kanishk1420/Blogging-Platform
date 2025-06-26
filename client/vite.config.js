import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Match CRA default port
    open: true, // Auto-open browser
  },
  resolve: {
    alias: {
      // Add any path aliases here if needed
    }
  }
})