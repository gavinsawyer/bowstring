import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const Stripe_API_Key: SecretParam = defineSecret("Stripe_API_Key");
