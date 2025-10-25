import es from './es.json';
import en from './en.json';

// Definimos los idiomas y el idioma por defecto
export const LANGUAGES = {
  es,
  en,
};
export const DEFAULT_LANG = 'es';

/**
 * Obtiene las traducciones para el idioma actual
 * @param lang El idioma actual (ej. 'es' o 'en')
 * @returns Una función `t` para obtener las cadenas de texto
 */
export function useTranslations(lang: keyof typeof LANGUAGES) {
  const translations = LANGUAGES[lang] || LANGUAGES[DEFAULT_LANG];

  /**
   * Obtiene la cadena de texto traducida usando una clave
   * @param key La clave de la traducción (ej. "hero.title")
   * @returns La cadena de texto traducida
   */
  return function t(key: string): string {
    // Divide la clave por puntos (ej. "hero.title" -> ["hero", "title"])
    const keys = key.split('.');
    let current: any = translations;
    
    // Itera sobre las claves para encontrar el texto
    for (const k of keys) {
      if (current[k] !== undefined) {
        current = current[k];
      } else {
        // Si no se encuentra, devuelve la clave como fallback
        return key;
      }
    }
    
    return current;
  }
}
