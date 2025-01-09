import { type CallableRequest, HttpsError, onCall } from "firebase-functions/https";
import getTwilio, { type Twilio }                   from "twilio";


// noinspection JSUnusedGlobalSymbols
export const createTwilioMessage: CallableFunction = onCall<null, Promise<{ "messageId": string }>>(
  {
    enforceAppCheck: true,
  },
  async ({ auth: authData }: CallableRequest<null>): Promise<{ messageId: string }> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    const userId: string = authData.uid;

    if (!process.env["TWILIO_ACCOUNT_SID"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `TWILIO_ACCOUNT_SID` is missing from the environment.",
      );

    if (!process.env["TWILIO_AUTH_TOKEN"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `TWILIO_AUTH_TOKEN` is missing from the environment.",
      );

    if (!process.env["TWILIO_MESSAGING_SERVICE_SID"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `TWILIO_MESSAGING_SERVICE_SID` is missing from the environment.",
      );

    const twilio: Twilio = getTwilio(
      process.env["TWILIO_ACCOUNT_SID"],
      process.env["TWILIO_AUTH_TOKEN"],
    );

    return await twilio.messages.create(
      {
        body:                userId,
        messagingServiceSid: process.env["TWILIO_MESSAGING_SERVICE_SID"],
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
