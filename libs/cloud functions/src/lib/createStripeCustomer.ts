import { type AccountDocument }                                        from "@standard/interfaces";
import { getApp }                                                      from "firebase-admin/app";
import { type DocumentReference, type DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { type CallableRequest, HttpsError, onCall }                    from "firebase-functions/https";
import Stripe                                                          from "stripe";
import { Stripe_API_Key }                                              from "./secrets";


// noinspection JSUnusedGlobalSymbols
export const createStripeCustomer: CallableFunction = onCall<null, Promise<null>>(
  {
    enforceAppCheck: true,
    secrets:         [
      Stripe_API_Key,
    ],
  },
  async ({ auth: authData }: CallableRequest): Promise<null> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    const accountDocumentReference: DocumentReference<AccountDocument> = getFirestore(getApp()).collection("accounts").doc(authData.uid) as DocumentReference<AccountDocument>;

    return accountDocumentReference.get().then<null, never>(
      async (accountDocumentSnapshot: DocumentSnapshot<AccountDocument>): Promise<null> => {
        const accountDocument: AccountDocument | undefined = accountDocumentSnapshot.data();

        if (!accountDocument)
          throw new HttpsError(
            "invalid-argument",
            "The account document is missing.",
          );

        if (!accountDocument.email)
          throw new HttpsError(
            "invalid-argument",
            "A value for `email` is missing from the account document.",
          );

        if (accountDocument.stripeCustomer)
          return null;

        return new Stripe(Stripe_API_Key.value()).customers.create(
          {
            email: accountDocument.email,
          },
        ).then<null, never>(
          ({ id }: Stripe.Response<Stripe.Customer>): Promise<null> => accountDocumentReference.update(
            {
              stripeCustomer: {
                id,
              },
            },
          ).then<null, never>(
            (): null => null,
            (error: unknown): never => {
              console.error("Something went wrong.");

              throw new HttpsError(
                "unknown",
                "Something went wrong.",
                error,
              );
            },
          ),
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
