import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server must be reachable through the platform's public proxy host, so we
// bind all interfaces and allow any host (the sandbox id rotates per session).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: true,
    // Bind mounts often don't forward inotify events — poll so HMR still fires.
    watch: { usePolling: true, interval: 300 },
  },
});
