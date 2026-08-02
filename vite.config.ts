import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
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

function getComponentEntries(dir: string, prefix: string): Record<string, string> {
  const entries: Record<string, string> = {};
  const fullDir = path.resolve(dirname, dir);
  try {
    const items = readdirSync(fullDir);
    for (const item of items) {
      const itemPath = path.join(fullDir, item);
      try {
        const stat = statSync(itemPath);
        if (stat.isDirectory() && existsSync(path.join(itemPath, 'index.ts'))) {
          entries[`${prefix}/${item}`] = itemPath;
        }
      } catch {}
    }
  } catch {}
  return entries;
}

const isUMDBuild = process.env.BUILD_FORMAT === 'umd';

const pcComponentEntries = getComponentEntries('src/components/pc', 'pc');
const mobileComponentEntries = getComponentEntries('src/components/mobile', 'mobile');

const esEntry = {
  index: path.resolve(dirname, 'src/index.ts'),
  'pc/index': path.resolve(dirname, 'src/components/pc/index.ts'),
  ...pcComponentEntries,
  ...mobileComponentEntries,
};

const umdEntry = path.resolve(dirname, 'src/index.ts');

export default defineConfig({
  plugins: [react(), gitLogPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  build: {
    emptyOutDir: !isUMDBuild,
    cssCodeSplit: !isUMDBuild,
    lib: {
      entry: isUMDBuild ? umdEntry : esEntry,
      name: 'ReactUiComponentLibrary',
      fileName: (format: string, entryName: string) => {
        if (format === 'es') {
          return `${entryName}.js`;
        }
        if (format === 'umd') {
          return 'react-ui-component-library.umd.js';
        }
        return `${entryName}.${format}.js`;
      },
      formats: isUMDBuild ? ['umd'] : ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return assetInfo.name.replace(/assets\//, '');
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});