import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import { execSync } from 'child_process';

import { fileURLToPath } from 'node:url';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Shared logic: run `git log` and parse into commit objects
function getGitLogData(count: number = 50) {
  try {
    const output = execSync(
      `git log --pretty=format:'%H|%ad|%s|%an' --date=short -n ${count}`,
      { cwd: dirname, encoding: 'utf-8' }
    );
    return output.trim().split('\n').map(line => {
      const [hash, date, message, author] = line.split('|');
      return {
        hash: hash?.substring(0, 7) || '',
        date: date || '',
        message: message || '',
        author: author || '',
      };
    }).filter(commit => commit.hash);
  } catch {
    return [];
  }
}

const gitLogPlugin = () => ({
  name: 'git-log-plugin',
  // Dev mode: serve as API middleware
  configureServer(server: any) {
    server.middlewares.use('/api/git-log', (req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json');
      const count = parseInt(req.url?.split('?count=')[1] || '20', 10);
      res.end(JSON.stringify(getGitLogData(count)));
    });
  },
  // Build mode: provide git data via virtual module so it's baked into the bundle
  resolveId(id: string) {
    if (id === 'virtual:git-log') return '\0virtual:git-log';
    return null;
  },
  load(id: string) {
    if (id === '\0virtual:git-log') {
      const commits = getGitLogData(50);
      return `export default ${JSON.stringify(commits)}`;
    }
    return null;
  },
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
const isDemoBuild = process.env.BUILD_MODE === 'demo';

const pcComponentEntries = getComponentEntries('src/components/pc', 'pc');
const mobileComponentEntries = getComponentEntries('src/components/mobile', 'mobile');

const esEntry = {
  index: path.resolve(dirname, 'src/index.ts'),
  'pc/index': path.resolve(dirname, 'src/components/pc/index.ts'),
  ...pcComponentEntries,
  ...mobileComponentEntries,
};

const umdEntry = path.resolve(dirname, 'src/index.ts');

// GitHub Pages base: <repo-name>/ (project site), auto-override via BASE_URL env in CI
// e.g. https://PanfengHong.github.io/zdy-ui/  =>  base = /zdy-ui/
const pagesBase = process.env.BASE_URL ||
  process.env.BASE ||
  (isDemoBuild ? '/zdy-ui/' : '/');

export default defineConfig((): UserConfig => {
  // ============== Demo (SPA) build for GitHub Pages ==============
  if (isDemoBuild) {
    return {
      plugins: [react(), gitLogPlugin()],
      base: pagesBase,
      resolve: {
        alias: {
          '@': path.resolve(dirname, './src'),
        },
      },
      build: {
        emptyOutDir: true,
        outDir: path.resolve(dirname, 'dist-demo'),
      },
    };
  }

  // ============== Library build ==============
  return {
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
          if (format === 'es') return `${entryName}.js`;
          if (format === 'umd') return 'react-ui-component-library.umd.js';
          return `${entryName}.${format}.js`;
        },
        formats: isUMDBuild ? ['umd'] : ['es'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          exports: 'named' as const,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: (assetInfo: { name?: string }) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return assetInfo.name.replace(/assets\//, '');
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
