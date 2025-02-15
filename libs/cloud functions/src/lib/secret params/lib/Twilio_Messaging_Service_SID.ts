import { type SecretParam } from "firebase-functions/lib/params/types";
import { defineSecret }     from "firebase-functions/params";


export const Twilio_Messaging_Service_SID: SecretParam = defineSecret("Twilio_Messaging_Service_SID");
