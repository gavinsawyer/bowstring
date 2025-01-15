import { type AccountDocument }                                        from "@standard/interfaces";
import { getApp }                                                      from "firebase-admin/app";
import { type DocumentReference, type DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { type CallableRequest, HttpsError, onCall }                    from "firebase-functions/https";
import Stripe                                                          from "stripe";


// noinspection JSUnusedGlobalSymbols
export const createStripeCustomer: CallableFunction = onCall<null, Promise<null>>(
  {
    enforceAppCheck: true,
  },
  ({ auth: authData }: CallableRequest): Promise<null> => {
    if (!authData?.uid)
      throw new HttpsError(
        "unauthenticated",
        "You're not signed in.",
      );

    const userId: string                                               = authData.uid;
    const accountDocumentReference: DocumentReference<AccountDocument> = getFirestore(getApp()).collection("accounts").doc(userId) as DocumentReference<AccountDocument>;

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

        if (!process.env["STRIPE_API_KEY"])
          throw new HttpsError(
            "failed-precondition",
            "A value for `STRIPE_API_KEY` is missing from the environment.",
          );

        return new Stripe(process.env["STRIPE_API_KEY"]).customers.create(
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
