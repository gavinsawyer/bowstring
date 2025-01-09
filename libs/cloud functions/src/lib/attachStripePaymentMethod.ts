import { type AccountDocument }                                        from "@standard/interfaces";
import { getApp }                                                      from "firebase-admin/app";
import { type DocumentReference, type DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { type CallableRequest, HttpsError, onCall }                    from "firebase-functions/https";
import Stripe                                                          from "stripe";


// noinspection JSUnusedGlobalSymbols
export const attachStripePaymentMethod: CallableFunction = onCall<{ "paymentMethodId": string }, Promise<null>>(
  {
    enforceAppCheck: true,
  },
  async (callableRequest: CallableRequest<{ "paymentMethodId": string }>): Promise<null> => {
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

        if (!process.env["STRIPE_API_KEY"])
          throw new HttpsError(
            "failed-precondition",
            "A value for `STRIPE_API_KEY` is missing from the environment.",
          );

        return new Stripe(process.env["STRIPE_API_KEY"]).paymentMethods.attach(
          callableRequest.data.paymentMethodId,
          {
            customer: stripeCustomer.id,
          },
        ).then<null, never>(
          (
            {
              billing_details: billingDetails,
              id,
              type,
            }: Stripe.PaymentMethod,
          ): Promise<null> => accountDocumentReference.update(
            {
              stripeCustomer: {
                ...stripeCustomer,
                paymentMethod: {
                  billingDetails: ((
                    {
                      address,
                      email,
                      name,
                      phone,
                    }: Stripe.PaymentMethod["billing_details"],
                  ): { address: { country: string | null, city: string | null, line1: string | null, line2: string | null, postalCode: string | null, state: string | null } | null, email: string | null, name: string | null, phone: string | null } => ({
                    address: address && ((
                      {
                        country,
                        city,
                        line1,
                        line2,
                        postal_code: postalCode,
                        state,
                      }: Stripe.Address,
                    ): { country: string | null, city: string | null, line1: string | null, line2: string | null, postalCode: string | null, state: string | null } => ({
                      country,
                      city,
                      line1,
                      line2,
                      postalCode,
                      state,
                    }))(address),
                    email,
                    name,
                    phone,
                  }))(billingDetails),
                  id,
                  type,
                },
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
    );
  },
);
