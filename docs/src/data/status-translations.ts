import type { Locale } from "../i18n/locales";
import { statusCodes } from "./status-codes";
import de from "./status-descriptions/de.json";
import es from "./status-descriptions/es.json";
import fr from "./status-descriptions/fr.json";
import ko from "./status-descriptions/ko.json";
import ru from "./status-descriptions/ru.json";
import zhCN from "./status-descriptions/zh-CN.json";

interface StatusTranslation {
  descriptionHtml: string;
  source: string;
}

const translations: Record<
  Exclude<Locale, "en">,
  Record<number, StatusTranslation>
> = { de, es, fr, ru, "zh-CN": zhCN, ko };

export function localizedStatusCodes(locale: Locale) {
  if (locale === "en") return statusCodes;

  return statusCodes.map((status) => {
    const translation = translations[locale][status.code];
    if (!translation) {
      throw new Error(`Missing ${locale} translation for HTTP ${status.code}`);
    }
    return { ...status, ...translation };
  });
}
