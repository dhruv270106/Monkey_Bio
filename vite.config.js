import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Get all .html files in the root directory
const root = resolve(__dirname, './');
const htmlFiles = readdirSync(root).filter(file => file.endsWith('.html'));

const input = {};
htmlFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[name] = resolve(root, file);
});

export default defineConfig({
  root,
  build: {
    outDir: 'dist',
    rollupOptions: {
      input,
    },
  },
});
