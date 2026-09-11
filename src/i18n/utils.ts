// src/i18n/utils.ts
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
export function getLangFromUrl(url: URL): keyof typeof ui {
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments[0] === 'es') return 'es';
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
    const cleanPath = path.replace(/^\/+|\/+$/g, '').toLowerCase();

    let translatedSlug = cleanPath;
    if (routeTranslations[cleanPath] && routeTranslations[cleanPath][targetLang]) {
      translatedSlug = routeTranslations[cleanPath][targetLang];
    }

    if (targetLang === 'en') {
      return translatedSlug ? `/${translatedSlug}` : '/';
    } else {
      return translatedSlug ? `/es/${translatedSlug}` : '/es/';
    }
  };
}

// Route translation mapping (English slug <-> Spanish slug)
export const routeTranslations: Record<string, { en: string; es: string }> = {
  '': { en: '', es: '' },
  
  // About Us
  'about': { en: 'about', es: 'nosotros' },
  'nosotros': { en: 'about', es: 'nosotros' },
  'sobre': { en: 'about', es: 'nosotros' },
  'sobre-nosotros': { en: 'about', es: 'nosotros' },

  // Contact
  'contact': { en: 'contact', es: 'contacto' },
  'contacto': { en: 'contact', es: 'contacto' },

  // Team
  'team': { en: 'team', es: 'equipo' },
  'equipo': { en: 'team', es: 'equipo' },

  // Security Assessment
  'security-assessment': { en: 'security-assessment', es: 'evaluacion-seguridad' },
  'evaluacion-seguridad': { en: 'security-assessment', es: 'evaluacion-seguridad' },

  // Business Foundations
  'foundation': { en: 'foundation', es: 'fundamentos' },
  'fundamentos': { en: 'foundation', es: 'fundamentos' },
  'bases': { en: 'foundation', es: 'fundamentos' },

  // Brand / Personal route
  'ortega': { en: 'ortega', es: 'ortega' },

  // Articles / Blog (Folder & Route)
  'articles': { en: 'articles', es: 'articulos' },
  'articulos': { en: 'articles', es: 'articulos' },
};

/**
 * Generates the opposite language equivalent URL for the current page
 */
export function getAlternatePageUrl(url: URL): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const isSpanish = segments[0] === 'es';
  
  const targetLang = isSpanish ? 'en' : 'es';
  const rawSlug = isSpanish ? (segments[1] || '') : (segments[0] || '');
  const currentSlug = rawSlug.toLowerCase();

  let targetSlug = currentSlug;
  if (routeTranslations[currentSlug] && routeTranslations[currentSlug][targetLang]) {
    targetSlug = routeTranslations[currentSlug][targetLang];
  }

  if (targetLang === 'en') {
    return targetSlug ? `/${targetSlug}` : '/';
  } else {
    return targetSlug ? `/es/${targetSlug}` : '/es/';
  }
}