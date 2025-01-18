import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const Twilio_Auth_Token: SecretParam = defineSecret("Twilio_Auth_Token");
