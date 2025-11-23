import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration tailored for a premium, dark UI experience.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
