export interface Environment {
  "app": "website",
  "apis": {
    "firebase": {
      "apiKey": string,
      "appId": string,
      "authDomain": string,
      "measurementId"?: string,
      "messagingSenderId": string,
      "projectId": string,
      "storageBucket": string
    },
    "recaptcha": {
      "apiKey": string,
    },
    "stripe": {
      "apiKey": string,
    },
  },
  "production": boolean,
}
