import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const CoinbaseCommerce_API_Key: SecretParam = defineSecret("CoinbaseCommerce_API_Key");
