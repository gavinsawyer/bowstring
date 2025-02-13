import { type Timestamp as AdminTimestamp } from "@google-cloud/firestore";
import { type Timestamp }                   from "firebase/firestore";


export interface StripePriceDocument {
  "active"?: boolean;
  "asyncDelyeted"?: Timestamp | AdminTimestamp;
  "billingScheme"?: "per_unit" | "tiered";
  "created"?: AdminTimestamp | Timestamp;
  "currency"?: string;
  "currencyOptions"?: {
    [key in "eur" | "gbp" | "usd"]?: {
      "customUnitAmount"?: {
        "enabled": boolean;
        "maximum"?: number;
        "minimum"?: number;
        "preset"?: number;
      };
      "taxBehavior"?: "exclusive" | "inclusive" | "unspecified";
      "tiers"?: {
        "flatAmount"?: number;
        "flatAmountDecimal"?: string;
        "unitAmount"?: number;
        "unitAmountDecimal"?: string;
        "upTo"?: number;
      }[];
      "unitAmount"?: number;
      "unitAmountDecimal"?: string;
    };
  };
  "customUnitAmount"?: {
    "maximum"?: number;
    "minimum"?: number;
    "preset"?: number;
  };
  "id"?: string;
  "livemode"?: boolean;
  "lookupKey"?: string;
  "nickname"?: string;
  "product"?: string;
  "recurring"?: {
    "aggregateUsage"?: "last_during_period" | "last_ever" | "max" | "sum";
    "interval": "day" | "month" | "week" | "year";
    "intervalCount": number;
    "meter"?: string;
    "trialPeriodDays"?: number;
    "usageType": "licensed" | "metered";
  };
  "taxBehavior"?: "exclusive" | "inclusive" | "unspecified";
  "tiers"?: {
    "flatAmount"?: number;
    "flatAmountDecimal"?: string;
    "unitAmount"?: number;
    "unitAmountDecimal"?: string;
    "upTo"?: number;
  }[];
  "tiersMode"?: "graduated" | "volume";
  "transformQuantity"?: {
    "divideBy": number;
    "round": "down" | "up";
  };
  "type"?: "one_time" | "recurring";
  "unitAmount"?: number;
  "unitAmountDecimal"?: string;
}
