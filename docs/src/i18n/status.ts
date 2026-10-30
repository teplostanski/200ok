import type { Locale } from "./locales";

interface StatusMessages {
  source: string;
  credits: string;
  via: string;
  licenses: string;
}

export const statusMessages = {
  en: {
    source: "Source",
    credits: "MDN descriptions by Mozilla Contributors,",
    via: "via",
    licenses: "Attribution, licenses and modifications",
  },
  de: {
    source: "Quelle",
    credits: "MDN-Beschreibungen von Mozilla-Mitwirkenden,",
    via: "über",
    licenses: "Quellenangaben, Lizenzen und Änderungen",
  },
  es: {
    source: "Fuente",
    credits: "Descripciones de MDN de los colaboradores de Mozilla,",
    via: "a través de",
    licenses: "Atribución, licencias y modificaciones",
  },
  fr: {
    source: "Source",
    credits: "Descriptions MDN par les contributeurs de Mozilla,",
    via: "via",
    licenses: "Attribution, licences et modifications",
  },
  ru: {
    source: "Источник",
    credits: "Описания MDN от участников Mozilla,",
    via: "через",
    licenses: "Авторы, лицензии и изменения",
  },
  "zh-CN": {
    source: "来源",
    credits: "MDN 描述由 Mozilla 贡献者编写，",
    via: "转载自",
    licenses: "署名、许可和修改说明",
  },
  ko: {
    source: "출처",
    credits: "Mozilla 기여자가 작성한 MDN 설명,",
    via: "제공:",
    licenses: "저작자 표시, 라이선스 및 수정 사항",
  },
} satisfies Record<Locale, StatusMessages>;
