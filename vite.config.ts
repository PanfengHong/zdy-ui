import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { exec } from 'child_process';

import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const gitLogPlugin = () => ({
  name: 'git-log-plugin',
  configureServer(server: any) {
    server.middlewares.use('/api/git-log', (req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json');
      
      const count = parseInt(req.url?.split('?count=')[1] || '20', 10);
      
      exec(`git log --pretty=format:'%H|%ad|%s|%an' --date=short -n ${count}`, { cwd: dirname }, (error, stdout) => {
        if (error) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
          return;
        }
        
        const commits = stdout.trim().split('\n').map(line => {
          const [hash, date, message, author] = line.split('|');
          return {
            hash: hash?.substring(0, 7) || '',
            date: date || '',
            message: message || '',
            author: author || ''
          };
        }).filter(commit => commit.hash);
        
        res.end(JSON.stringify(commits));
      });
    });
  }
});

export default defineConfig({
  plugins: [react(), gitLogPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'ReactUiComponentLibrary',
      fileName: format => `react-ui-component-library.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});