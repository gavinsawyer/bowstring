import { type StripePaymentMethodDocument }                                   from "@standard/interfaces";
import { type CloudFunction }                                                 from "firebase-functions";
import { type FirestoreEvent, onDocumentCreated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripePaymentMethodDocumentCreatedBlockingFunction: CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>> = onDocumentCreated<"stripePaymentMethods/{documentId}">(
  "stripePaymentMethods/{documentId}",
  async (
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

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).paymentMethods.attach(
      stripePaymentMethodDocument.id,
      {
        customer: stripePaymentMethodDocument.customer,
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
