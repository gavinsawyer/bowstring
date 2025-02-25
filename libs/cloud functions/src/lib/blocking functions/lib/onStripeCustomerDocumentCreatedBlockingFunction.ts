import { StripeCustomerDocument }                                             from "@bowstring/interfaces";
import { type CloudFunction }                                                 from "firebase-functions";
import { type FirestoreEvent, onDocumentCreated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripeCustomerDocumentCreatedBlockingFunction: CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>> = onDocumentCreated<"stripeCustomers/{documentId}">(
  "stripeCustomers/{documentId}",
  (
    {
      data:   queryDocumentSnapshot,
      id:     firestoreEventId,
      params: { documentId },
    }: FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>,
  ): Promise<object> => {
    const userId: string | undefined = queryDocumentSnapshot && (queryDocumentSnapshot.data() as StripeCustomerDocument).userId;

    if (!userId)
      throw new HttpsError(
        "failed-precondition",
        "A value for `userId` is missing from the stripe customer document.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).customers.create(
      {
        metadata: {
          documentId,
          userId,
        },
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
