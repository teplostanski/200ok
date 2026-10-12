import type { Locale } from "../../../src/locales";
import { de } from "./de";
import { en } from "./en";
import { fi } from "./fi";
import { fr } from "./fr";
import { pl } from "./pl";
import { ru } from "./ru";

export type { Locale } from "../../../src/locales";

export type MessageDictionary = Record<keyof typeof en, string>;

export const messages = { en, ru, de, pl, fr, fi } satisfies Record<
  Locale,
  MessageDictionary
>;
