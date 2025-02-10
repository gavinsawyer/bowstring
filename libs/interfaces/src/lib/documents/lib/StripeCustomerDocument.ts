import { type Timestamp as AdminTimestamp } from "@google-cloud/firestore";
import { type Timestamp }                   from "firebase/firestore";


export interface StripeCustomerDocument {
  "address"?: {
    "city"?: string;
    "country"?: string;
    "line1"?: string;
    "line2"?: string;
    "postalCode"?: string;
    "state"?: string;
  };
  "balance"?: number;
  "created"?: Timestamp | AdminTimestamp;
  "defaultSource"?: string;
  "description"?: string;
  "email"?: string;
  "id"?: string;
  "invoicePrefix"?: string;
  "invoiceSettings"?: {
    "customFields"?: {
      "name": string;
      "value": string;
    }[];
    "defaultPaymentMethod"?: string;
    "footer"?: string;
    "renderingOptions"?: {
      "amountTaxDisplay"?: "exclude_tax" | "include_inclusive_tax";
      "template"?: string;
    };
  };
  "livemode"?: boolean;
  "name"?: string;
  "nextInvoiceSequence"?: number;
  "phone"?: string;
  "preferredLocales"?: string[];
  "shipping"?: {
    "address"?: {
      "city"?: string;
      "country"?: string;
      "line1"?: string;
      "line2"?: string;
      "postalCode"?: string;
      "state"?: string;
    };
    "name"?: string;
    "phone"?: string;
  };
  "taxExempt"?: "exempt" | "none" | "reverse";
  "testClock"?: string;
}
