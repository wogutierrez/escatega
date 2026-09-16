import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig({
  site: 'https://escatega.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false // Clean URLs: English at root /, Spanish at /es/
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@components': path.resolve(__dirname, './src/components'),
        '@i18n': path.resolve(__dirname, './src/i18n')
      }
    }
  }
});