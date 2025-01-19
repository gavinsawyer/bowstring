import { type CallableRequest, HttpsError, onCall } from "firebase-functions/https";
import Stripe                                       from "stripe";
import { Stripe_API_Key }                           from "./secrets";


// noinspection JSUnusedGlobalSymbols
export const createStripeSetupIntent: CallableFunction = onCall<null, Promise<{ "clientSecret": string }>>(
  {
    enforceAppCheck: true,
    secrets:         [
      Stripe_API_Key,
    ],
  },
  async ({ auth: authData }: CallableRequest<null>): Promise<{ clientSecret: string }> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    return new Stripe(Stripe_API_Key.value()).setupIntents.create(
      {
        payment_method_types: [
          "card",
        ],
      },
    ).then<{ clientSecret: string }, never>(
      ({ client_secret: clientSecret }: Stripe.SetupIntent): { clientSecret: string } => {
        if (!clientSecret)
          throw new HttpsError(
            "unavailable",
            "A value for `clientSecret` is missing from the setup intent.",
          );

        return {
          clientSecret,
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
