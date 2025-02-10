import { type StripePaymentMethodDocument }                                   from "@standard/interfaces";
import { type Change, type CloudFunction }                                    from "firebase-functions";
import { type FirestoreEvent, onDocumentUpdated, type QueryDocumentSnapshot } from "firebase-functions/firestore";
import { HttpsError }                                                         from "firebase-functions/https";
import Stripe                                                                 from "stripe";


function getStripePaymentMethodUpdateParams(
  {
    allowRedisplay: allow_redisplay,
    billingDetails: billing_details,
    card,
  }: StripePaymentMethodDocument,
): Stripe.PaymentMethodUpdateParams {
  return {
    allow_redisplay,
    billing_details: billing_details && ((
      {
        address,
        email,
        name,
        phone,
      }: Exclude<StripePaymentMethodDocument["billingDetails"], undefined>,
    ): Stripe.PaymentMethodUpdateParams.BillingDetails => ({
      address: address && (address.city || address.country || address.line1 || address.line2 || address.postalCode || address.state) ? ((
        {
          city,
          country,
          line1,
          line2,
          postalCode: postal_code,
          state,
        }: Exclude<Exclude<StripePaymentMethodDocument["billingDetails"], undefined>["address"], undefined>,
      ): Stripe.AddressParam => ({
        city:        city !== "" && city || "",
        country:     country !== "" && country || "",
        line1:       line1 !== "" && line1 || "",
        line2:       line2 !== "" && line2 || "",
        postal_code: postal_code !== "" && postal_code || "",
        state:       state !== "" && state || "",
      }))(address) : "",
      email:   email !== "" && email || "",
      name:    name !== "" && name || "",
      phone:   phone !== "" && phone || "",
    }))(billing_details),
    card:            card && ((
      {
        expiryMonth: exp_month,
        expiryYear:  exp_year,
        networks,
      }: Exclude<StripePaymentMethodDocument["card"], undefined>,
    ): Stripe.PaymentMethodUpdateParams.Card => ({
      exp_month,
      exp_year,
      networks: networks && ((
        {
          preferred,
        }: Exclude<Exclude<StripePaymentMethodDocument["card"], undefined>["networks"], undefined>,
      ): Stripe.PaymentMethodUpdateParams.Card.Networks => ({
        preferred: preferred !== "invalid_preference" ? preferred : "",
      }))(networks),
    }))(card),
  };
}

// noinspection JSUnusedGlobalSymbols
export const onStripePaymentMethodDocumentUpdatedBlockingFunction: CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>> = onDocumentUpdated<"stripePaymentMethods/{documentId}">(
  "stripePaymentMethods/{documentId}",
  async (
    {
      data: queryDocumentSnapshotChange,
      id:   firestoreEventId,
    }: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, { documentId: string }>,
  ): Promise<object> => {
    if (!queryDocumentSnapshotChange)
      return {};

    const queryDocumentSnapshotAfter: StripePaymentMethodDocument = queryDocumentSnapshotChange.after.data() as StripePaymentMethodDocument;

    if (!process.env["STRIPE_API_KEY"])
      throw new HttpsError(
        "failed-precondition",
        "A value for `STRIPE_API_KEY` is missing from the environment.",
      );

    const stripe: Stripe = new Stripe(process.env["STRIPE_API_KEY"]);

    return queryDocumentSnapshotAfter.asyncDeleted ? stripe.paymentMethods.detach(
      queryDocumentSnapshotAfter.id,
      undefined,
      {
        idempotencyKey: firestoreEventId,
      },
    ) : stripe.paymentMethods.update(
      queryDocumentSnapshotAfter.id,
      getStripePaymentMethodUpdateParams(queryDocumentSnapshotAfter),
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
