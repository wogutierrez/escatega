import { en } from './en';
import { es } from './es';

export const defaultLang = 'en';
export const languages = {
  en: 'English',
  es: 'Español',
};

export const ui = { en, es } as const;

/**
 * Extracts current locale from the request URL
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

/**
 * Returns translation dictionary helper function `t()`
 */
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value: any = ui[lang];
    
    for (const k of keys) {
      if (value && k in value) {
        value = value[k];
      } else {
        // Fallback to English string if missing
        let fallback: any = ui[defaultLang];
        for (const fk of keys) {
          if (fallback && fk in fallback) fallback = fallback[fk];
        }
        return fallback || key;
      }
    }
    return value;
  };
}

/**
 * Helper to build localized internal links
 */
export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, targetLang = lang) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `/${targetLang}${cleanPath}`;
  };
}


// Route translation mapping (English slug <-> Spanish slug)
export const routeTranslations: Record<string, { en: string; es: string }> = {
  '': { en: '', es: '' }, // Homepage
  'about': { en: 'about', es: 'sobre' },
  'sobre': { en: 'about', es: 'sobre' },
  'contact': { en: 'contact', es: 'contacto' },
  'contacto': { en: 'contact', es: 'contacto' },
  'foundation': { en: 'foundation', es: 'fundacion' },
  'fundacion': { en: 'foundation', es: 'fundacion' },
  'ortega': { en: 'ortega', es: 'ortega' },
  'security-assessment': { en: 'security-assessment', es: 'evaluacion-seguridad' },
  'evaluacion-seguridad': { en: 'security-assessment', es: 'evaluacion-seguridad' },
  'team': { en: 'team', es: 'equipo' },
  'equipo': { en: 'team', es: 'equipo' },
  'articles': { en: 'articles', es: 'articulos' },
  'articulos': { en: 'articles', es: 'articulos' },
};

/**
 * Generates the opposite language equivalent URL for the current page
 */
export function getAlternatePageUrl(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean); // e.g. ["en", "about"]
  if (segments.length === 0) return '/es/';

  const currentLang = segments[0] as 'en' | 'es';
  const targetLang = currentLang === 'en' ? 'es' : 'en';
  const currentSlug = segments[1] || '';

  // Check if we have an explicit mapping
  if (routeTranslations[currentSlug]) {
    const targetSlug = routeTranslations[currentSlug][targetLang];
    return `/${targetLang}/${targetSlug}${targetSlug ? '/' : ''}`;
  }

  // Fallback if no direct route mapping found (defaults to target language home)
  return `/${targetLang}/`;
}