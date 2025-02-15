import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const CoinbaseCommerce_Webhook_Shared_Secret: SecretParam = defineSecret("CoinbaseCommerce_Webhook_Shared_Secret");
