import { type AccountDocument }                                        from "@standard/interfaces";
import { getApp }                                                      from "firebase-admin/app";
import { type DocumentReference, type DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { type CallableRequest, HttpsError, onCall }                    from "firebase-functions/https";
import Stripe                                                          from "stripe";
import { Stripe_API_Key }                                              from "./secrets";


// noinspection JSUnusedGlobalSymbols
export const attachStripePaymentMethod: CallableFunction = onCall<{ "paymentMethodId": string }, Promise<null>>(
  {
    enforceAppCheck: true,
    secrets:         [
      Stripe_API_Key,
    ],
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

        const stripe: Stripe = new Stripe(Stripe_API_Key.value());

        return (stripeCustomer.paymentMethod ? stripe.paymentMethods.detach(
          stripeCustomer.paymentMethod.id,
        ).catch<never>(
          (error: unknown): never => {
            console.error("Something went wrong.");

            throw new HttpsError(
              "unknown",
              "Something went wrong.",
              error,
            );
          },
        ) : Promise.resolve()).then<null>(
          (): Promise<null> => stripe.paymentMethods.attach(
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
                      }: Stripe.PaymentMethod.BillingDetails,
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
          ),
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
