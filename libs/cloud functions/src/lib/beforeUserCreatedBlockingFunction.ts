import { type AccountDocument }                      from "@standard/interfaces";
import { getApp }                                    from "firebase-admin/app";
import { type DocumentReference, getFirestore }      from "firebase-admin/firestore";
import { HttpsError }                                from "firebase-functions/https";
import { type AuthBlockingEvent, beforeUserCreated } from "firebase-functions/identity";
import Stripe                                        from "stripe";


// noinspection JSUnusedGlobalSymbols
export const beforeUserCreatedBlockingFunction = beforeUserCreated(
  async ({ data: authUserRecord }: AuthBlockingEvent): Promise<object> => {
    if (!authUserRecord?.email)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).customers.create(
      {
        email: authUserRecord.email,
      },
    ).then<object, never>(
      ({ id }: Stripe.Response<Stripe.Customer>): Promise<object> => (getFirestore(getApp()).collection("accounts").doc(authUserRecord.uid) as DocumentReference<AccountDocument>).set(
        {
          email:          authUserRecord.email,
          stripeCustomer: {
            id,
          },
        },
        {
          merge: true,
        },
      ).then<object, never>(
        (): object => ({}),
        (error: unknown): never => {
          console.error(error);

          throw new HttpsError(
            "unknown",
            "Something went wrong.",
          );
        },
      ),
    );
  },
);
