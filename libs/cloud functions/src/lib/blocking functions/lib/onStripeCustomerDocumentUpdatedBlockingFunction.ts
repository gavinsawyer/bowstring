import { type StripeCustomerDocument }                                        from "@standard/interfaces";
import { getStripeCustomerUpdateParams }                                      from "@standard/stripe-interop";
import { type Change, type CloudFunction }                                    from "firebase-functions";
import { type FirestoreEvent, onDocumentUpdated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


// noinspection JSUnusedGlobalSymbols
export const onStripeCustomerDocumentUpdatedBlockingFunction: CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>> = onDocumentUpdated<"stripeCustomers/{documentId}">(
  "stripeCustomers/{documentId}",
  async (
    {
      data: queryDocumentSnapshotChange,
      id:   firestoreEventId,
    }: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>,
  ): Promise<object> => {
    if (!queryDocumentSnapshotChange)
      return {};

    const stripeCustomerDocument: StripeCustomerDocument = queryDocumentSnapshotChange.after.data() as StripeCustomerDocument;
    const stripeCustomerId: string | undefined           = stripeCustomerDocument.id;

    if (!stripeCustomerId)
      throw new HttpsError(
        "invalid-argument",
        "A value for `id` is missing from the stripe customer document.",
      );

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    return new Stripe(process.env["STRIPE_API_KEY"]).customers.update(
      stripeCustomerId,
      getStripeCustomerUpdateParams(stripeCustomerDocument),
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
