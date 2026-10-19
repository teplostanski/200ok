import type { MessageDictionary } from "./messages";

export const pl: MessageDictionary = {
  inDevelopment: "W przygotowaniu",
  docTitle: "Dokumentacja API",
  metaDescription:
    "200 OK — Serwis żądań i odpowiedzi HTTP. Analizuj żądania, testuj odpowiedzi i debuguj integracje.",
  hero: "Serwis żądań i odpowiedzi HTTP",
  heroSubtitle: "Analizuj żądania, testuj odpowiedzi i debuguj integracje.",
  randDescription:
    "Aby generować losowe ciągi znaków i identyfikatory, skorzystaj z",
  reference: "DOKUMENTACJA API",
  resources: "Zasoby",
  notFound: "Nie znaleziono strony",
  backToDocs: "Wróć do dokumentacji",
  github: "GitHub",
  statusCodes: "Kody statusu HTTP",
  endpoints: "Endpointy",
  ipCurrent: "Adres IP klienta (IPv4 lub IPv6).",
  ipv4: "Adres IPv4 klienta.",
  ipv6: "Adres IPv6 klienta.",
  echoDescription:
    "Zwraca metodę i treść żądania. Obsługuje JSON, zwykły tekst, proste dane formularza i dane binarne.",
  headersDescription: "Nagłówki przychodzącego żądania.",
  output: "Format odpowiedzi",
  formatNote:
    "Domyślnie oraz przy `?format=text` odpowiedź jest zwracana jako zwykły tekst. Aby otrzymać JSON, użyj `?json` lub `?format=json`. Jeśli podano `format`, ma on pierwszeństwo przed `?json`.",
  plainText: "Zwykły tekst",
  httpMethods: "Metody HTTP",
  details: "Szczegóły",
  requestExamples: "Przykłady żądań",
  responses: "Odpowiedzi",
  example: "Przykład",
  schema: "Schemat",
  parserNote:
    "Nieprawidłowy JSON zwraca 400. Błędy API używają wybranego formatu: zwykłego tekstu lub JSON.",
  method: "Metoda",
  body: "Treść żądania",
  file: "Plik",
  bodyLimitHint: "Limit treści: 100 KiB. Dane zostaną wysłane na ten serwer.",
  execute: "Wykonaj",
  clear: "Wyczyść",
  chooseFile: "Wybierz plik do wysłania.",
  noContentType: "Nie podano Content-Type",
  emptyResponse: "(pusta treść odpowiedzi)",
  requestFailed: "Żądanie nie powiodło się",
  field: "Pole",
  fieldType: "Typ",
  description: "Opis",
  required: "wymagane",
  headerName: "[nazwa nagłówka]",
  fieldIp: "Adres IP; null, jeśli rodzina adresów nie odpowiada żądanej.",
  fieldMethod: "Metoda HTTP żądania.",
  fieldError: "Opis błędu.",
  fieldLimit: "Maksymalny rozmiar treści w bajtach.",
  fieldHeader: "Wartość nagłówka.",
  value: "Wartość",
  binaryObject: "obiekt binarny",
  always: "Zawsze",
  byteCount: "Liczba oryginalnych bajtów.",
  base64Content: "Treść zakodowana w Base64.",
  echoResponse:
    "Metoda i przetworzona treść żądania. Ten przykład przedstawia żądanie GET bez treści.",
  bodySchema:
    "Wartość JSON, ciąg znaków, pola formularza lub dane binarne { encoding: 'base64', sizeBytes: number, data: string }. Bez treści: null.",
  headersResponse:
    "Nagłówki przychodzącego żądania. Nazwy i wartości zależą od klienta.",
  ipResponse:
    "Adres połączenia klienta. Przykład używa adresu IP przeznaczonego do dokumentacji. Jeśli rodzina adresów nie odpowiada endpointowi, odpowiedź to unknown w tekście i null w JSON.",
  formatError:
    "Nieprawidłowy format, np. ?format=xml. Ten błąd jest zawsze zwracany jako zwykły tekst.",
  limitError: "Treść przekracza 102 400 bajtów (100 KiB).",
  contentTypeError:
    "Nieobsługiwany lub brakujący Content-Type dla niepustej treści.",
  form: "Formularz",
  binaryFile: "Plik binarny",
  customHeader: "Z własnym nagłówkiem",
  language: "Język",
};
