import { type CallableRequest, HttpsError, onCall }                            from "firebase-functions/https";
import getTwilio, { type Twilio }                                              from "twilio";
import { Twilio_Account_SID, Twilio_Auth_Token, Twilio_Messaging_Service_SID } from "../../secrets";


// noinspection JSUnusedGlobalSymbols
export const createTwilioMessage: CallableFunction = onCall<null, Promise<{ "messageId": string }>>(
  {
    enforceAppCheck: true,
    secrets:         [
      Twilio_Account_SID,
      Twilio_Auth_Token,
      Twilio_Messaging_Service_SID,
    ],
  },
  async ({ auth: authData }: CallableRequest<null>): Promise<{ messageId: string }> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    const twilio: Twilio = getTwilio(
      Twilio_Account_SID.value(),
      Twilio_Auth_Token.value(),
    );

    return await twilio.messages.create(
      {
        body:                authData.uid,
        messagingServiceSid: Twilio_Messaging_Service_SID.value(),
        to:                  "+16177979041",
      },
    ).then<{ "messageId": string }, never>(
      ({ sid: messageId }): { "messageId": string } => ({
        messageId,
      }),
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw new HttpsError(
          "unknown",
          "Something went wrong.",
          error,
        );
      },
    );
  },
);
