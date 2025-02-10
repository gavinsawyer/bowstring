export interface AccountDocument {
  "email"?: string;
  "messages"?: {
    "newsletter"?: boolean;
    "orderUpdates"?: boolean;
    "promotions"?: boolean;
  };
  "phone"?: {
    "countryCode": string;
    "national": string;
  };
  "profile"?: {
    "birthday"?: string;
    "name"?: string;
  };
  "security"?: {
    "passkey"?: boolean;
    "passkeyBackup"?: boolean;
    "password"?: boolean;
  };
}
