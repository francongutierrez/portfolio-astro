import { defineConfig } from 'astro/config';
// 1. Importamos la integración de Tailwind
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://francogutierrez.vercel.app',
  
  // 2. Le decimos a Astro que USE Tailwind
  integrations: [tailwind()],

  // 3. Tu configuración de i18n
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});

