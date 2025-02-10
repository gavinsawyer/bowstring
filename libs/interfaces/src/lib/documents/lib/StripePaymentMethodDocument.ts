import { type Timestamp as AdminTimestamp } from "firebase-admin/firestore";
import { type Timestamp }                   from "firebase/firestore";


export interface StripePaymentMethodDocument {
  "allowRedisplay"?: "always" | "limited" | "unspecified";
  "asyncDeleted"?: Timestamp | AdminTimestamp;
  "billingDetails"?: {
    "address"?: {
      "city"?: string;
      "country"?: string;
      "line1"?: string;
      "line2"?: string;
      "postalCode"?: string;
      "state"?: string;
    };
    "email"?: string;
    "name"?: string;
    "phone"?: string;
  };
  "card"?: {
    "brand": string;
    "checks"?: {
      "addressLine1Check"?: string;
      "addressPostalCodeCheck"?: string;
      "cvcCheck"?: string;
    };
    "country"?: string;
    "description"?: string;
    "displayBrand"?: string;
    "expiryMonth": number;
    "expiryYear": number;
    "fingerprint"?: string;
    "funding": string;
    "generatedFrom"?: {
      "charge"?: string;
      "paymentMethodDetails"?: {
        "cardPresent"?: {
          "amountAuthorized"?: number;
          "brand"?: "amex" | "diners" | "discover" | "eftpos_au" | "jcb" | "link" | "mastercard" | "unionpay" | "unknown" | "visa";
          "brandProduct"?: string;
          "captureBefore"?: Timestamp | AdminTimestamp;
          "cardholderName"?: string;
          "country"?: string;
          "description"?: string;
          "emvAuthData"?: string;
          "expiryMonth": number;
          "expiryYear": number;
          "fingerprint"?: string;
          "funding": string;
          "generatedCard"?: string;
          "incrementalAuthorizationSupported": boolean;
          "issuer"?: string;
          "last4"?: string;
          "network"?: "amex" | "cartes_bancaires" | "diners" | "discover" | "eftpos_au" | "girocard" | "interac" | "jcb" | "link" | "mastercard" | "unionpay" | "unknown" | "visa";
          "networkTransactionId"?: string;
          "offline"?: {
            "storedAt"?: Timestamp | AdminTimestamp;
            "type": "deferred";
          };
          "overcaptureSupported": boolean;
          "preferredLocales"?: string[];
          "readMethod"?: "contact_emv" | "contactless_emv" | "contactless_magstripe_mode" | "magnetic_stripe_fallback" | "magnetic_stripe_track2";
          "receipt"?: {
            "accountType"?: "checking" | "credit" | "prepaid" | "unknown";
            "applicationCryptogram"?: string;
            "applicationPreferredName"?: string;
            "authorizationCode"?: string;
            "authorizationResponseCode"?: string;
            "cardholderVerificationMethod"?: "approval" | "failure" | "none" | "offline_pin" | "offline_pin_and_signature" | "online_pin" | "signature";
            "dedicatedFileName"?: string;
            "terminalVerificationResults"?: string;
            "transactionStatusInformation"?: string;
          };
          "wallet"?: {
            "type"?: "apple_pay" | "google_pay" | "samsung_pay" | "unknown";
          };
        };
        "type": "card_present";
      };
      "setupAttempt"?: string;
    };
    "last4": string;
    "networks"?: {
      "available"?: string[];
      "preferred"?: "cartes_bancaires" | "invalid_preference" | "mastercard" | "visa";
    };
    "regulatedStatus"?: string;
    "threeDSecureUsage"?: {
      "supported": boolean;
    };
    "wallet"?: {
      "dynamicLast4"?: string;
      "type": string;
    };
  };
  "created"?: Timestamp | AdminTimestamp;
  "customer": string;
  "id": string;
  "livemode"?: boolean;
  "type"?: string;
  "userId": string;
}
