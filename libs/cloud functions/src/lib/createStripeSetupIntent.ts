import { type CallableRequest, HttpsError, onCall } from "firebase-functions/https";
import Stripe                                       from "stripe";


// noinspection JSUnusedGlobalSymbols
export const createStripeSetupIntent: CallableFunction = onCall<null, Promise<{ "clientSecret": string }>>(
  {
    enforceAppCheck: true,
  },
  async (callableRequest: CallableRequest<null>): Promise<{ clientSecret: string }> => {
    if (!callableRequest.auth?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).setupIntents.create().then<{ clientSecret: string }, never>(
      ({ client_secret: clientSecret }: Stripe.SetupIntent): { clientSecret: string } => {
        if (!clientSecret)
          throw new HttpsError(
            "unavailable",
            "A value for `clientSecret` is missing from the setup intent.",
          );

        return {
          clientSecret: clientSecret,
        };
      },
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
