import { type Locale, messages } from "../i18n/messages";

type NavigationItem =
  | { label: string; kind: "internal"; path: string; disabled?: boolean }
  | { label: string; kind: "external"; href: string };

export function navigationItems(locale: Locale): NavigationItem[] {
  const t = messages[locale];
  return [
    { label: t.reference, kind: "internal", path: "/" },
    {
      label: t.statusCodes,
      kind: "internal",
      path: "/status-codes/",
    },
    {
      label: t.github,
      kind: "external",
      href: "https://github.com/teplostanski/200ok",
    },
  ];
}

export { localizedPath } from "../../../src/locales";
