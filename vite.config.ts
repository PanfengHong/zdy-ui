import { defineConfig, type UserConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import dts from 'vite-plugin-dts';

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

/**
 * CSS-in-JS 注入插件
 *
 * Vite library 模式下 cssCodeSplit: true 会把 CSS 提取为独立文件，
 * JS chunk 不会引用它们，导致业务侧 import 组件后样式丢失。
 *
 * 此插件在 generateBundle 阶段，利用 Vite 的 chunk.viteMetadata.importedCss
 * 将每个 chunk 关联的 CSS 内容作为字符串注入到 JS 前面，
 * 运行时自动创建 <style> 标签注入样式，实现"零手动 CSS 引入"。
 *
 * 同时处理 UMD 构建（cssCodeSplit: false）的情况：
 * 此时所有 CSS 在一个文件中，viteMetadata.importedCss 可能为空，
 * 需要手动查找 bundle 中的 CSS asset 并注入到唯一的 JS chunk。
 */
function injectCssIntoJs(): Plugin {
  return {
    name: 'inject-css-into-js',
    enforce: 'post',
    apply: 'build',
    generateBundle(_options, bundle) {
      // 收集所有 CSS asset（用于 UMD fallback）
      const allCssAssets: Record<string, string> = {};
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && asset.type === 'asset') {
          allCssAssets[fileName] = asset.source as string;
        }
      }

      let injectedCount = 0;
      const consumedCssFiles = new Set<string>();

      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;

        // 方式一：通过 viteMetadata.importedCss 查找（ES 构建，cssCodeSplit: true）
        const importedCss = (chunk as any).viteMetadata?.importedCss as Set<string> | undefined;
        const cssFiles = importedCss ? Array.from(importedCss) : [];

        // 方式二：UMD fallback — 如果没有 importedCss 但 bundle 中有 CSS asset，
        // 且当前 chunk 是主入口 chunk（UMD 只有一个 JS chunk），注入所有 CSS
        if (cssFiles.length === 0 && Object.keys(allCssAssets).length > 0) {
          // UMD 模式：检查是否是主入口 chunk（包含 facadeModuleId）
          if (chunk.facadeModuleId != null) {
            cssFiles.push(...Object.keys(allCssAssets));
          }
        }

        if (cssFiles.length === 0) continue;

        let cssText = '';
        for (const cssFile of cssFiles) {
          if (allCssAssets[cssFile]) {
            cssText += allCssAssets[cssFile] + '\n';
            consumedCssFiles.add(cssFile);
          }
        }

        if (cssText) {
          // SSR 安全：typeof document === 'undefined' 时跳过
          const injection = `(function(){if(typeof document==='undefined')return;var s=document.createElement('style');s.setAttribute('data-zdy-css','');s.textContent=${JSON.stringify(cssText)};document.head.appendChild(s);})();\n`;
          chunk.code = injection + chunk.code;
          injectedCount++;
        }
      }

      if (injectedCount > 0) {
        console.log(`✓ [injectCssIntoJs] Injected CSS into ${injectedCount} JS chunk(s)`);
      }
    },
  };
}

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
      } catch { }
    }
  } catch { }
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
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      gitLogPlugin(),
      injectCssIntoJs(),
      dts({
        tsconfigPath: './tsconfig.json',
        include: ['src/**/*'],
        exclude: ['src/**/*.test.tsx']
      })
    ],
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
        name: 'ZdyDesign',
        fileName: (format: string, entryName: string) => {
          if (format === 'es') return `${entryName}.js`;
          if (format === 'umd') return 'zdy-design.umd.js';
          return `${entryName}.${format}.js`;
        },
        formats: isUMDBuild ? ['umd'] : ['es'],
      },
      rollupOptions: {
        external: [/^react(-dom)?(\/.+)?$/],
        output: {
          exports: 'named' as const,
          format: 'es',
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
