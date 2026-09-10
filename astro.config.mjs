import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://escatega.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true, // Forces /en/ and /es/
      redirectToDefaultLocale: false // We will handle root / explicitly
    }
  }
});