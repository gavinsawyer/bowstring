import { type AccountDocument }                                        from "@standard/interfaces";
import { getApp }                                                      from "firebase-admin/app";
import { type DocumentReference, type DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { type CallableRequest, HttpsError, onCall }                    from "firebase-functions/https";
import Stripe                                                          from "stripe";
import { Stripe_API_Key }                                              from "./secrets";


// noinspection JSUnusedGlobalSymbols
export const detachStripePaymentMethod: CallableFunction = onCall<null, Promise<null>>(
  {
    enforceAppCheck: true,
    secrets:         [
      Stripe_API_Key,
    ],
  },
  async (callableRequest: CallableRequest<null>): Promise<null> => {
    if (!callableRequest.auth?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    const accountDocumentReference: DocumentReference<AccountDocument> = getFirestore(getApp()).collection("accounts").doc(callableRequest.auth.uid) as DocumentReference<AccountDocument>;

    return accountDocumentReference.get().then<null, never>(
      async (accountDocumentSnapshot: DocumentSnapshot<AccountDocument>): Promise<null> => {
        const accountDocument: AccountDocument | undefined = accountDocumentSnapshot.data();

        if (!accountDocument)
          throw new HttpsError(
            "invalid-argument",
            "The account document is missing.",
          );

        const stripeCustomer: AccountDocument["stripeCustomer"] = accountDocument.stripeCustomer;

        if (!stripeCustomer)
          throw new HttpsError(
            "invalid-argument",
            "A value for `stripeCustomer` is missing from the account document.",
          );

        if (!stripeCustomer.paymentMethod?.id)
          return null;

        return new Stripe(Stripe_API_Key.value()).paymentMethods.detach(
          stripeCustomer.paymentMethod.id,
        ).then<null, never>(
          (): Promise<null> => accountDocumentReference.update(
            {
              stripeCustomer: {
                ...stripeCustomer,
                paymentMethod: null,
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
