import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://escatega.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false // Clean URLs: English at root /, Spanish at /es/
    }
  }
});