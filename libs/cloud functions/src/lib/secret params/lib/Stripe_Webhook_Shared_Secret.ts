import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const Stripe_Webhook_Shared_Secret: SecretParam = defineSecret("Stripe_Webhook_Shared_Secret");
