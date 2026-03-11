
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { globSync } from 'tinyglobby';

// Get all .html files recursively
const htmlFiles = globSync('**/*.html', { 
  ignore: ['node_modules/**', 'dist/**'] 
});

const input = {};
htmlFiles.forEach(file => {
  // Create a unique key for each file
  const name = file.replace(/\//g, '_').replace('.html', '');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input,
    },
  },
});
