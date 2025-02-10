export interface Environment {
  "app": "website";
  "apis": {
    "appleMusic": {
      "developerToken": string;
    };
    "firebase": {
      "apiKey": string;
      "appId": string;
      "authDomain": string;
      "databaseURL"?: string;
      "measurementId"?: string;
      "messagingSenderId": string;
      "projectId": string;
      "storageBucket": string
    };
    "recaptcha": {
      "siteKey": string;
    };
    "stripe": {
      "publishableKey": string;
    };
  };
  "production": boolean;
}
