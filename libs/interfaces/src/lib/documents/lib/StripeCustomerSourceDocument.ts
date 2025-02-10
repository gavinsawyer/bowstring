import { type Timestamp as AdminTimestamp } from "@google-cloud/firestore";
import { type Timestamp }                   from "firebase/firestore";


export interface StripeCustomerSourceDocument {
  "created"?: AdminTimestamp | Timestamp;
}
