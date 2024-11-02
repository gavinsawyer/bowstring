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
        if (!process.env["STRIPE_API_KEY"])
          throw new HttpsError(
            "failed-precondition",
            "The STRIPE_API_KEY environment variable is missing.",
          );

        const accountDocument: AccountDocument | undefined = accountDocumentSnapshot.data();

        if (!accountDocument)
          throw new HttpsError(
            "invalid-argument",
            "The document associated with your account is missing.",
          );

        if (!accountDocument.stripeCustomer)
          throw new HttpsError(
            "invalid-argument",
            "The stripeCustomer object is missing from the document associated with your account.",
          );

        const stripeCustomer: NonNullable<AccountDocument["stripeCustomer"]> = accountDocument.stripeCustomer;

        return new Stripe(process.env["STRIPE_API_KEY"]).paymentMethods.attach(
          callableRequest.data.paymentMethodId,
          {
            customer: accountDocument.stripeCustomer.id,
          },
        ).then<null, never>(
          (paymentMethod: Stripe.PaymentMethod): Promise<null> => accountDocumentReference.update(
            {
              stripeCustomer: {
                ...stripeCustomer,
                payment_method: {
                  billing_details: {
                    address: paymentMethod.billing_details.address ? {
                      city:        paymentMethod.billing_details.address.city,
                      country:     paymentMethod.billing_details.address.country,
                      line1:       paymentMethod.billing_details.address.line1,
                      line2:       paymentMethod.billing_details.address.line2,
                      postal_code: paymentMethod.billing_details.address.postal_code,
                      state:       paymentMethod.billing_details.address.state,
                    } : null,
                    email:   paymentMethod.billing_details.email,
                    name:    paymentMethod.billing_details.name,
                    phone:   paymentMethod.billing_details.phone,
                  },
                  id:              paymentMethod.id,
                  type:            paymentMethod.type,
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
