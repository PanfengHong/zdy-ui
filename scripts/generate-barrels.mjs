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
// Only namespace exports (PC, Mobile) to avoid duplicate export names
// Types are excluded from JS barrel (no runtime value, only in .d.ts)
const mainLines = [];

mainLines.push('export * as PC from "./pc/index.js";');
mainLines.push('export * as Mobile from "./mobile/index.js";');
mainLines.push('');

const mainContent = mainLines.join('\n');
writeFileSync(resolve(distDir, 'index.js'), mainContent, 'utf-8');
console.log('✓ Generated dist/index.js with namespace exports');

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
    const dtsContent = `export * from '../components/${platform}/${name}/index';\n`;
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
    require: './dist/react-ui-component-library.umd.js',
    types: './dist/index.d.ts'
  },
  './styles.css': './dist/react-ui-component-library.css'
};

// Add subpath exports for each PC component
for (const name of pcComponents) {
  exportsObj[`./pc/${name}`] = {
    import: `./dist/pc/${name}.js`,
    require: `./dist/pc/${name}.umd.js`,
    types: `./dist/pc/${name}.d.ts`
  };
}

// Add subpath exports for each Mobile component
for (const name of mobileComponents) {
  exportsObj[`./mobile/${name}`] = {
    import: `./dist/mobile/${name}.js`,
    require: `./dist/mobile/${name}.umd.js`,
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
pkg.sideEffects = ['**/*.less'];

writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
console.log('✓ Updated package.json with subpath exports');

console.log('\n✅ All barrel files generated successfully!');
console.log('\nUsage examples:');
console.log('  // Namespace import (tree-shakeable via bundler)');
console.log('  import { PC, Mobile } from "react-ui-component-library";');
console.log('  <PC.Button>Click</PC.Button>');
console.log('');
console.log('  // Direct component import (fully tree-shakeable, only loads the specific component)');
console.log('  import Button from "react-ui-component-library/pc/Button";');
console.log('');
console.log('  // TypeScript types');
console.log('  import type { BaseButtonProps } from "react-ui-component-library";');
console.log('  import type { BaseButtonProps } from "react-ui-component-library/types";');