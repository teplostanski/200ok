import type { Locale } from "./locales";

interface StatusEndpointMessages {
  description: string;
  important: string;
  notice: string;
  chooseCode: string;
  code: string;
  reference: string;
  response: string;
}

export const statusEndpointMessages = {
  en: {
    description: "Returns the selected HTTP status code and its reason phrase.",
    important: "Important",
    notice:
      "Codes 204, 205 and 304 have no response body. For 1xx, the HTTP response status is 200.",
    chooseCode: "Choose a status code",
    code: "Status code",
    reference: "HTTP status code reference",
    response:
      "The response body contains the requested code and its reason phrase, including for 1xx. Example: 200 OK.",
  },
  de: {
    description:
      "Gibt den ausgewählten HTTP-Statuscode und seine Statusmeldung zurück.",
    important: "Wichtig",
    notice:
      "Die Codes 204, 205 und 304 haben keinen Antwortinhalt. Für 1xx lautet der HTTP-Antwortstatus 200.",
    chooseCode: "Statuscode auswählen",
    code: "Statuscode",
    reference: "HTTP-Statuscode-Referenz",
    response:
      "Der Antwortinhalt enthält den angeforderten Code und seine Statusmeldung, auch bei 1xx. Beispiel: 200 OK.",
  },
  es: {
    description:
      "Devuelve el código de estado HTTP seleccionado y su frase descriptiva.",
    important: "Importante",
    notice:
      "Los códigos 204, 205 y 304 no tienen cuerpo de respuesta. Para 1xx, el estado de la respuesta HTTP es 200.",
    chooseCode: "Elige un código de estado",
    code: "Código de estado",
    reference: "Referencia de códigos de estado HTTP",
    response:
      "El cuerpo de la respuesta contiene el código solicitado y su frase descriptiva, también para 1xx. Ejemplo: 200 OK.",
  },
  fr: {
    description: "Renvoie le code de statut HTTP sélectionné et son libellé.",
    important: "Important",
    notice:
      "Les codes 204, 205 et 304 n’ont pas de corps de réponse. Pour les codes 1xx, le statut HTTP est 200.",
    chooseCode: "Choisir un code de statut",
    code: "Code de statut",
    reference: "Référence des codes de statut HTTP",
    response:
      "Le corps de la réponse contient le code demandé et son libellé, y compris pour les codes 1xx. Exemple : 200 OK.",
  },
  ru: {
    description: "Возвращает выбранный HTTP-код и его reason phrase.",
    important: "Важно",
    notice:
      "Ответы с кодами 204, 205 и 304 не содержат тела. Для кодов 1xx HTTP-статус ответа равен 200.",
    chooseCode: "Выберите код статуса",
    code: "Код статуса",
    reference: "Справочник HTTP-статусов",
    response:
      "Тело ответа содержит запрошенный код и его reason phrase, в том числе для 1xx. Пример: 200 OK.",
  },
  "zh-CN": {
    description: "返回所选 HTTP 状态码及其原因短语。",
    important: "重要",
    notice:
      "状态码 204、205 和 304 的响应不包含响应体。对于 1xx，HTTP 响应状态为 200。",
    chooseCode: "选择状态码",
    code: "状态码",
    reference: "HTTP 状态码参考",
    response:
      "响应体包含请求的状态码及其原因短语，1xx 也不例外。例如：200 OK。",
  },
  ko: {
    description: "선택한 HTTP 상태 코드와 상태 설명 문구를 반환합니다.",
    important: "중요",
    notice:
      "204, 205, 304 응답에는 본문이 없습니다. 1xx의 HTTP 응답 상태는 200입니다.",
    chooseCode: "상태 코드를 선택하세요",
    code: "상태 코드",
    reference: "HTTP 상태 코드 참고서",
    response:
      "응답 본문에는 요청한 코드와 상태 설명 문구가 포함되며, 1xx도 동일합니다. 예: 200 OK.",
  },
} satisfies Record<Locale, StatusEndpointMessages>;
