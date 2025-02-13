import { type StripeSetupIntentDocument }                                     from "@standard/interfaces";
import { getStripeSetupIntentUpdateParams }                                   from "@standard/stripe-interop";
import { type Change, type CloudFunction }                                    from "firebase-functions";
import { type FirestoreEvent, onDocumentUpdated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripeSetupIntentDocumentUpdatedBlockingFunction: CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>> = onDocumentUpdated<"stripeSetupIntents/{documentId}">(
  "stripeSetupIntents/{documentId}",
  async (
    {
      data: queryDocumentSnapshotChange,
      id:   firestoreEventId,
    }: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>,
  ): Promise<object> => {
    if (!queryDocumentSnapshotChange)
      return {};

    const stripeSetupIntentDocument: StripeSetupIntentDocument = queryDocumentSnapshotChange.after.data() as StripeSetupIntentDocument;
    const stripeSetupIntentId: string | undefined              = stripeSetupIntentDocument.id;

    if (!stripeSetupIntentId)
      throw new HttpsError(
        "failed-precondition",
        "A value for `id` is missing from the stripe payment method document.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    const stripe: Stripe = new Stripe(process.env["STRIPE_API_KEY"]);

    return stripeSetupIntentDocument.asyncDeleted ? stripe.setupIntents.cancel(
      stripeSetupIntentId,
      undefined,
      {
        idempotencyKey: firestoreEventId,
      },
    ) : stripe.setupIntents.update(
      stripeSetupIntentId,
      getStripeSetupIntentUpdateParams(stripeSetupIntentDocument),
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
