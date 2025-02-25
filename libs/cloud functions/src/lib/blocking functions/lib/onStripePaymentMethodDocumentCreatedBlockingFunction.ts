import { type StripePaymentMethodDocument }                                   from "@bowstring/interfaces";
import { type CloudFunction }                                                 from "firebase-functions";
import { type FirestoreEvent, onDocumentCreated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripePaymentMethodDocumentCreatedBlockingFunction: CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>> = onDocumentCreated<"stripePaymentMethods/{documentId}">(
  "stripePaymentMethods/{documentId}",
  (
    {
      data: queryDocumentSnapshot,
      id:   firestoreEventId,
    }: FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>,
  ): Promise<object> => {
    const stripePaymentMethodDocument: StripePaymentMethodDocument | undefined = queryDocumentSnapshot && (queryDocumentSnapshot.data() as StripePaymentMethodDocument);

    if (!stripePaymentMethodDocument)
      throw new HttpsError(
        "failed-precondition",
        "The stripe payment method document is missing.",
      );

    const stripeCustomerId: string | undefined = stripePaymentMethodDocument.customer;

    if (!stripeCustomerId)
      throw new HttpsError(
        "failed-precondition",
        "A value for `customer` is missing from the stripe payment method document.",
      );

    const stripePaymentMethodId: string | undefined = stripePaymentMethodDocument.id;

    if (!stripePaymentMethodId)
      throw new HttpsError(
        "failed-precondition",
        "A value for `id` is missing from the stripe payment method document.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).paymentMethods.attach(
      stripePaymentMethodId,
      {
        customer: stripeCustomerId,
      },
      {
        idempotencyKey: firestoreEventId,
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
    );
  },
);
