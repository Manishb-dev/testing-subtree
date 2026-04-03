import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Polling is more reliable than native FS events on Windows.
      // Without it, the watcher silently dies after the system's inotify
      // handle limit is hit, causing the HMR server to stop responding.
      usePolling: process.platform === 'win32',
      interval: 500,           // check every 500ms (good balance of speed vs CPU)
      binaryInterval: 1000,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.turbo/**',
      ],
    },
  },
});
