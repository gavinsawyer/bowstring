export interface Environment {
  "project": "console" | "website",
  "firebase": {
    "apiKey": string,
    "appId": string,
    "authDomain": string,
    "measurementId"?: string,
    "messagingSenderId": string,
    "projectId": string,
    "storageBucket": string
  },
  "production": boolean,
  "recaptchaKeyID": string,
}
