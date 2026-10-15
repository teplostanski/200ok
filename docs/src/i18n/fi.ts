import type { MessageDictionary } from "./messages";

export const fi: MessageDictionary = {
  inDevelopment: "Kehitteillä",
  docTitle: "API-dokumentaatio",
  metaDescription:
    "200 OK — HTTP-pyyntöjen ja -vastausten palvelu. Tutki pyyntöjä, testaa vastauksia ja selvitä integraatioiden virheitä.",
  hero: "HTTP-pyyntöjen ja -vastausten palvelu",
  heroSubtitle:
    "Tutki pyyntöjä, testaa vastauksia ja selvitä integraatioiden virheitä.",
  randDescription:
    "Satunnaisten merkkijonojen ja tunnisteiden luomiseen kokeile palvelua",
  reference: "API-DOKUMENTAATIO",
  resources: "Resurssit",
  notFound: "Sivua ei löytynyt",
  backToDocs: "Takaisin dokumentaatioon",
  github: "GitHub",
  statusCodes: "HTTP-tilakoodit",
  endpoints: "Päätepisteet",
  ipCurrent: "Asiakkaan IP-osoite (IPv4 tai IPv6).",
  ipv4: "Asiakkaan IPv4-osoite.",
  ipv6: "Asiakkaan IPv6-osoite.",
  echoDescription:
    "Palauttaa pyynnön metodin ja sisällön. Hyväksyy JSONin, pelkän tekstin, yksinkertaiset lomaketiedot ja binääridatan.",
  headersDescription: "Saapuvan pyynnön otsakkeet.",
  output: "Vastausmuoto",
  plainText: "Pelkkä teksti",
  httpMethods: "HTTP-metodit",
  details: "Lisätiedot",
  requestExamples: "Esimerkkipyynnöt",
  responses: "Vastaukset",
  example: "Esimerkki",
  schema: "Skeema",
  parserNote:
    "Virheellinen JSON palauttaa koodin 400. API-virheet palautetaan valitussa muodossa: pelkkänä tekstinä tai JSONina.",
  method: "Metodi",
  body: "Pyynnön sisältö",
  file: "Tiedosto",
  bodyLimitHint:
    "Sisällön enimmäiskoko: 100 KiB. Tiedot lähetetään tälle palvelimelle.",
  execute: "Suorita",
  clear: "Tyhjennä",
  chooseFile: "Valitse lähetettävä tiedosto.",
  noContentType: "Content-Type puuttuu",
  emptyResponse: "(tyhjä vastauksen sisältö)",
  requestFailed: "Pyyntö epäonnistui",
  field: "Kenttä",
  fieldType: "Tyyppi",
  description: "Kuvaus",
  required: "pakollinen",
  headerName: "[otsakkeen nimi]",
  fieldIp: "IP-osoite; null, jos osoiteperhe ei vastaa pyydettyä.",
  fieldMethod: "Pyynnön HTTP-metodi.",
  fieldError: "Virheen kuvaus.",
  fieldLimit: "Pyynnön sisällön enimmäiskoko tavuina.",
  fieldHeader: "Otsakkeen arvo.",
  value: "Arvo",
  binaryObject: "binääriobjekti",
  always: "Aina",
  byteCount: "Alkuperäisten tavujen määrä.",
  base64Content: "Base64-koodattu sisältö.",
  echoResponse:
    "Pyynnön metodi ja jäsennetty sisältö. Tässä esimerkissä on GET-pyyntö ilman sisältöä.",
  bodySchema:
    "JSON-arvo, merkkijono, lomakekentät tai binäärisisältö { encoding: 'base64', sizeBytes: number, data: string }. null, jos sisältöä ei ole.",
  headersResponse:
    "Saapuvan pyynnön otsakkeet. Nimet ja arvot riippuvat asiakkaasta.",
  ipResponse:
    "Asiakasyhteyden osoite. Esimerkissä käytetään dokumentaatioon varattua IP-osoitetta. Jos osoiteperhe ei vastaa päätepistettä, vastaus on tekstissä unknown ja JSONissa null.",
  formatError:
    "Virheellinen format, esimerkiksi ?format=xml. Tämä virhe palautetaan aina pelkkänä tekstinä.",
  limitError: "Sisältö ylittää 102 400 tavua (100 KiB).",
  contentTypeError:
    "Content-Type puuttuu tai sitä ei tueta, vaikka pyynnössä on sisältöä.",
  form: "Lomake",
  binaryFile: "Binääritiedosto",
  customHeader: "Omalla otsakkeella",
  language: "Kieli",
};
