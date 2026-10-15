import type { MessageDictionary } from "./messages";

export const fr: MessageDictionary = {
  inDevelopment: "En cours de développement",
  docTitle: "Documentation de l’API",
  metaDescription:
    "200 OK — Service de requêtes et de réponses HTTP. Inspectez les requêtes, testez les réponses et déboguez les intégrations.",
  hero: "Service de requêtes et de réponses HTTP",
  heroSubtitle:
    "Inspectez les requêtes, testez les réponses et déboguez les intégrations.",
  randDescription:
    "Pour générer des chaînes aléatoires et des identifiants, essayez",
  reference: "RÉFÉRENCE DE L’API",
  resources: "Ressources",
  notFound: "Page introuvable",
  backToDocs: "Retour à la documentation",
  github: "GitHub",
  statusCodes: "Codes de statut HTTP",
  endpoints: "Points de terminaison",
  ipCurrent: "L’adresse IP du client (IPv4 ou IPv6).",
  ipv4: "L’adresse IPv4 du client.",
  ipv6: "L’adresse IPv6 du client.",
  echoDescription:
    "Renvoie la méthode et le corps de la requête. Accepte JSON, le texte brut, les données de formulaire simples et les données binaires.",
  headersDescription: "En-têtes de la requête entrante.",
  output: "Format de sortie",
  plainText: "Texte brut",
  httpMethods: "Méthodes HTTP",
  details: "Détails",
  requestExamples: "Exemples de requêtes",
  responses: "Réponses",
  example: "Exemple",
  schema: "Schéma",
  parserNote:
    "Un JSON invalide renvoie 400. Les erreurs de l’API utilisent le format choisi : texte brut ou JSON.",
  method: "Méthode",
  body: "Corps de la requête",
  file: "Fichier",
  bodyLimitHint:
    "Taille maximale du corps : 100 Kio. Les données seront envoyées à ce serveur.",
  execute: "Exécuter",
  clear: "Effacer",
  chooseFile: "Choisissez un fichier à envoyer.",
  noContentType: "Content-Type non fourni",
  emptyResponse: "(corps de réponse vide)",
  requestFailed: "Échec de la requête",
  field: "Champ",
  fieldType: "Type",
  description: "Description",
  required: "obligatoire",
  headerName: "[nom de l’en-tête]",
  fieldIp: "Adresse IP ; null si la famille d’adresses ne correspond pas.",
  fieldMethod: "La méthode HTTP de la requête.",
  fieldError: "Description de l’erreur.",
  fieldLimit: "Taille maximale du corps en octets.",
  fieldHeader: "Valeur de l’en-tête.",
  value: "Valeur",
  binaryObject: "objet binaire",
  always: "Toujours",
  byteCount: "Nombre d’octets d’origine.",
  base64Content: "Contenu encodé en Base64.",
  echoResponse:
    "La méthode et le corps de la requête après analyse. Cet exemple est une requête GET sans corps.",
  bodySchema:
    "Une valeur JSON, une chaîne, des champs de formulaire ou un corps binaire { encoding: 'base64', sizeBytes: number, data: string }. null si aucun corps n’est fourni.",
  headersResponse:
    "En-têtes de la requête entrante. Les noms et les valeurs dépendent du client.",
  ipResponse:
    "L’adresse de connexion du client. Cet exemple utilise une IP réservée à la documentation. Si la famille d’adresses ne correspond pas au point de terminaison, la réponse est unknown en texte et null en JSON.",
  formatError:
    "Format invalide, par exemple ?format=xml. Cette erreur est toujours renvoyée en texte brut.",
  limitError: "Le corps dépasse 102 400 octets (100 Kio).",
  contentTypeError:
    "Content-Type non pris en charge ou absent pour un corps non vide.",
  form: "Formulaire",
  binaryFile: "Fichier binaire",
  customHeader: "Avec un en-tête personnalisé",
  language: "Langue",
};
