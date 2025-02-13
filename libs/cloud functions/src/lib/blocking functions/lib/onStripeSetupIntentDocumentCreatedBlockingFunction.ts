import { StripeSetupIntentDocument }                                          from "@bowstring/interfaces";
import { type CloudFunction }                                                 from "firebase-functions";
import { type FirestoreEvent, onDocumentCreated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripeSetupIntentDocumentCreatedBlockingFunction: CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>> = onDocumentCreated<"stripeSetupIntents/{documentId}">(
  "stripeSetupIntents/{documentId}",
  async (
    {
      data:   queryDocumentSnapshot,
      id:     firestoreEventId,
      params: { documentId },
    }: FirestoreEvent<QueryDocumentSnapshot | undefined, { documentId: string }>,
  ): Promise<object> => {
    const userId: string | undefined = queryDocumentSnapshot && (queryDocumentSnapshot.data() as StripeSetupIntentDocument).userId;

    if (!userId)
      throw new HttpsError(
        "failed-precondition",
        "A value for `userId` is missing from the stripe setup intent document.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).setupIntents.create(
      {
        metadata:             {
          documentId,
          userId,
        },
        payment_method_types: [
          "card",
        ],
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
