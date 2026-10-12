import { localizedPath } from "../../../src/locales";
import type { Locale } from "./messages";

export function languageUrl(url: URL, locale: Locale): string {
  const localized = localizedPath(url.pathname, locale);
  return `${localized}${url.search}${url.hash}`;
}
