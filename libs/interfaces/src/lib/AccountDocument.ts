export interface AccountDocument {
  "email": string,
  "name": string | null,
  "shipping": {
    "address": {
      "country": string,
      "level1": string,
      "level2": string,
      "level3": string | null,
      "level4": string | null,
      "line1": string,
      "line2": string | null,
      "line3": string | null,
      "postalCode": string,
    },
    "name": {
      "first": string,
      "last": string,
      "prefix": string | null,
    },
    "phone": {
      "countryCode": string,
      "national": string,
    },
  } | null
}
