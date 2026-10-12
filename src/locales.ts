export const locales = {
  en: "English",
  de: "Deutsch",
  pl: "Polski",
  fr: "Français",
  fi: "Suomi",
  ru: "Русский",
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "en";
export const localeCodes = Object.keys(locales) as Locale[];

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && Object.hasOwn(locales, value);
}

export function localeFromPath(path: string): Locale {
  const prefix = path.split("/")[1];
  return isLocale(prefix) ? prefix : defaultLocale;
}

export function localizedPath(path: string, locale: Locale): string {
  const prefix = path.split("/")[1];
  const unprefixed = isLocale(prefix)
    ? path.slice(prefix.length + 1) || "/"
    : path;
  return locale === defaultLocale ? unprefixed : `/${locale}${unprefixed}`;
}
