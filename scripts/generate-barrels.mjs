import { writeFileSync, readFileSync, readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function getComponentNames(dir) {
  const entries = [];
  try {
    const items = readdirSync(dir);
    for (const item of items) {
      const itemPath = resolve(dir, item);
      try {
        const stat = statSync(itemPath);
        if (stat.isDirectory() && existsSync(resolve(itemPath, 'index.ts'))) {
          entries.push(item);
        }
      } catch {}
    }
  } catch {}
  return entries.sort();
}

const pcSrcDir = resolve(rootDir, 'src/components/pc');
const mobileSrcDir = resolve(rootDir, 'src/components/mobile');

const pcComponents = getComponentNames(pcSrcDir);
const mobileComponents = getComponentNames(mobileSrcDir);

console.log(`Found ${pcComponents.length} PC components: ${pcComponents.join(', ')}`);
console.log(`Found ${mobileComponents.length} Mobile components: ${mobileComponents.join(', ')}`);

// 1. Generate dist/index.js - main barrel file
// PC components use named (top-level) exports so `import { Alert } from 'zdy-design'` works.
// Mobile components use namespace `Mobile` to avoid name collision with PC.
// Types are excluded from JS barrel (no runtime value, only in .d.ts)
const mainLines = [];

mainLines.push('// PC components: named exports for top-level destructuring import');
for (const name of pcComponents) {
  mainLines.push(`export { default as ${name} } from './pc/${name}.js';`);
}
mainLines.push('');
mainLines.push('// Mobile components: namespaced to avoid colliding with PC exports');
mainLines.push('export * as Mobile from "./mobile/index.js";');
mainLines.push('');

const mainContent = mainLines.join('\n');
writeFileSync(resolve(distDir, 'index.js'), mainContent, 'utf-8');
console.log('✓ Generated dist/index.js with PC named exports + Mobile namespace');

// 2. Generate dist/pc/index.js - PC barrel file with named exports
const pcLines = [];
for (const name of pcComponents) {
  pcLines.push(`export { default as ${name} } from './${name}.js';`);
}
const pcContent = pcLines.join('\n') + '\n';
writeFileSync(resolve(distDir, 'pc/index.js'), pcContent, 'utf-8');
console.log('✓ Generated dist/pc/index.js');

// 3. Generate dist/mobile/index.js - Mobile barrel file with named exports
const mobileLines = [];
for (const name of mobileComponents) {
  mobileLines.push(`export { default as ${name} } from './${name}.js';`);
}
const mobileContent = mobileLines.join('\n') + '\n';
writeFileSync(resolve(distDir, 'mobile/index.js'), mobileContent, 'utf-8');
console.log('✓ Generated dist/mobile/index.js');

// 4. Generate type re-export files for each component
// These map dist/pc/Button.d.ts -> dist/components/pc/Button/index.d.ts
function generateTypeReExports(components, platform) {
  const distPlatformDir = resolve(distDir, platform);
  ensureDir(distPlatformDir);

  for (const name of components) {
    const dtsPath = resolve(distPlatformDir, `${name}.d.ts`);
    // `export *` doesn't re-export `default`, so we must explicitly re-export it.
    // This allows both:
    //   import Alert from 'zdy-design/pc/Alert';    (default)
    //   import { AlertProps } from 'zdy-design/pc/Alert';  (named types)
    const dtsContent = [
      `export * from '../components/${platform}/${name}/index';`,
      `export { default } from '../components/${platform}/${name}/index';`,
      ''
    ].join('\n');
    writeFileSync(dtsPath, dtsContent, 'utf-8');
  }
  console.log(`✓ Generated .d.ts re-exports for ${platform}/ components`);
}

generateTypeReExports(pcComponents, 'pc');
generateTypeReExports(mobileComponents, 'mobile');

// 5. Generate dist/pc/index.d.ts and dist/mobile/index.d.ts type re-exports
function generateBarrelType(platform) {
  const dtsPath = resolve(distDir, platform, 'index.d.ts');
  const dtsContent = `export * from '../components/${platform}/index';\n`;
  writeFileSync(dtsPath, dtsContent, 'utf-8');
}

generateBarrelType('pc');
generateBarrelType('mobile');
console.log('✓ Generated index.d.ts for pc/ and mobile/');

// 5.5. Overwrite dist/index.d.ts (types for root entry) to mirror dist/index.js
// tsc produces dist/index.d.ts from src/index.ts which re-exports ./components/pc etc.
// Overwrite it so type paths are relative to dist/ (matching barrel JS resolution semantics)
// and include the PC namespace plus Mobile namespace.
{
  const rootDtsLines = [];
  rootDtsLines.push('// Types for main entry: matches runtime exports in dist/index.js');
  rootDtsLines.push('');
  rootDtsLines.push('// PC components: named (top-level) exports');
  rootDtsLines.push("export * from './components/pc/index';");
  rootDtsLines.push('');
  rootDtsLines.push('// PC components (namespace alias)');
  rootDtsLines.push("export * as PC from './components/pc/index';");
  rootDtsLines.push('');
  rootDtsLines.push('// Mobile components: namespaced to avoid collision with PC');
  rootDtsLines.push("export * as Mobile from './components/mobile/index';");
  rootDtsLines.push('');
  rootDtsLines.push('// Shared public types');
  rootDtsLines.push("export * from './types/index';");
  rootDtsLines.push('');
  writeFileSync(resolve(distDir, 'index.d.ts'), rootDtsLines.join('\n'), 'utf-8');
  console.log('✓ Overwrote dist/index.d.ts to align with dist/index.js exports');
}

// 6. Generate dist/types/index.d.ts type re-export
const typesDir = resolve(distDir, 'types');
if (existsSync(typesDir)) {
  const typesDtsPath = resolve(typesDir, 'index.d.ts');
  const typesDtsContent = `export * from '../components/types/index';\n`;
  writeFileSync(typesDtsPath, typesDtsContent, 'utf-8');
  console.log('✓ Generated dist/types/index.d.ts');
}

// 7. Update package.json exports mapping
const pkgJsonPath = resolve(rootDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));

const exportsObj = {
  '.': {
    import: './dist/index.js',
    require: './dist/zdy-design.umd.js',
    types: './dist/index.d.ts'
  },
  './styles.css': './dist/zdy-design.css'
};

// Add subpath exports for each PC component
for (const name of pcComponents) {
  exportsObj[`./pc/${name}`] = {
    import: `./dist/pc/${name}.js`,
    require: `./dist/pc/${name}.js`,
    types: `./dist/pc/${name}.d.ts`
  };
}

// Add subpath exports for each Mobile component
for (const name of mobileComponents) {
  exportsObj[`./mobile/${name}`] = {
    import: `./dist/mobile/${name}.js`,
    require: `./dist/mobile/${name}.js`,
    types: `./dist/mobile/${name}.d.ts`
  };
}

// Add barrel subpath exports
exportsObj['./pc'] = {
  import: './dist/pc/index.js',
  types: './dist/pc/index.d.ts'
};

exportsObj['./mobile'] = {
  import: './dist/mobile/index.js',
  types: './dist/mobile/index.d.ts'
};

// Add types subpath
exportsObj['./types'] = {
  types: './dist/types/index.d.ts'
};

pkg.exports = exportsObj;

// 8. Ensure sideEffects is properly configured
// CSS 已通过 injectCssIntoJs 插件注入到 JS chunk 中（运行时创建 <style> 标签），
// 不再需要标记 .less 文件有副作用。设为 false 允许打包器充分 tree-shaking，
// 组件 chunk 中的 CSS 注入 IIFE 会被打包器识别为副作用而保留。
pkg.sideEffects = false;

writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
console.log('✓ Updated package.json with subpath exports');

console.log('\n✅ All barrel files generated successfully!');
console.log('\nUsage examples:');
console.log('  // 方式一：整体引入（PC 组件具名导出，可 tree-shaking）');
console.log('  import { Alert, Button } from "zdy-design";');
console.log('  <Alert type="info">Hello</Alert>');
console.log('');
console.log('  // 方式二：按需引入单个 PC 组件');
console.log('  import Alert from "zdy-design/pc/Alert";');
console.log('');
console.log('  // 额外：命名空间风格');
console.log('  import { PC, Mobile } from "zdy-design";');
console.log('  <PC.Button>Click</PC.Button>');
console.log('  <Mobile.Alert />');
console.log('');
console.log('  // 按需引入单个 Mobile 组件');
console.log('  import Alert from "zdy-design/mobile/Alert";');
console.log('');
console.log('  // TypeScript 类型');
console.log('  import type { AlertProps } from "zdy-design";');
console.log('  import type { AlertProps } from "zdy-design/types";');