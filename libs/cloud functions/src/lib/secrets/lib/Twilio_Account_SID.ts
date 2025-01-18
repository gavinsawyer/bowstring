import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const Twilio_Account_SID: SecretParam = defineSecret("Twilio_Account_SID");
