import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ko } from "./ko";
import type { Locale } from "./locales";
import { ru } from "./ru";
import { zhCN } from "./zh-CN";

export type { Locale } from "./locales";

export type MessageDictionary = Record<keyof typeof en, string>;

export const messages = {
  en,
  de,
  es,
  fr,
  ru,
  "zh-CN": zhCN,
  ko,
} satisfies Record<Locale, MessageDictionary>;
