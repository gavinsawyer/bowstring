import { NgTemplateOutlet }                                                                                                                                                             from "@angular/common";
import { ChangeDetectionStrategy, Component, effect, inject }                                                                                                                           from "@angular/core";
import { Auth }                                                                                                                                                                         from "@angular/fire/auth";
import { addDoc, collection, type CollectionReference, Firestore, getDocs, query, type QueryDocumentSnapshot, type QuerySnapshot, serverTimestamp, where, writeBatch, type WriteBatch } from "@angular/fire/firestore";
import { FormControl, FormGroup }                                                                                                                                                       from "@angular/forms";
import { ContainerDirective }                                                                                                                                                           from "@bowstring/directives";
import { type StripeCustomerDocument, type StripePaymentMethodDocument, type StripeSetupIntentDocument }                                                                                from "@bowstring/interfaces";
import { StripeSetupIntentsService }                                                                                                                                                    from "@bowstring/services";
import { type DefaultValuesOption, type SetupIntentResult, type Stripe, type StripeElement, type StripeElements, type StripePaymentElementChangeEvent }                                 from "@stripe/stripe-js";
import { type SheetComponent }                                                                                                                                                          from "../../../../../presentation";
import { StripeElementComponent }                                                                                                                                                       from "../../../stripe element/StripeElementComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives:  [
      {
        directive: ContainerDirective,
        inputs:    [
          "alignSelf",
          "aspectRatio",
          "marginBottom",
          "marginSides",
          "marginTop",
          "overflowX",
          "overflowY",
          "paddingBottom",
          "paddingSides",
          "paddingTop",
          "position",
          "positionBottom",
          "positionLeft",
          "positionRight",
          "positionTop",
          "scrollSnapAlign",
          "scrollSnapStop",
          "scrollSnapType",
        ],
      },
    ],
    imports:         [
      NgTemplateOutlet,
    ],
    selector:        "bowstring--payment-stripe-element",
    styleUrl:        "PaymentStripeElementComponent.sass",
    templateUrl:     "PaymentStripeElementComponent.html",

    standalone: true,
  },
)
export class PaymentStripeElementComponent
  extends StripeElementComponent {

  constructor() {
    super();

    this.getStripeElement = (
      {
        stripeCustomerDocument,
        stripeElements,
      }: { "stripeCustomerDocument"?: StripeCustomerDocument, "stripeElements": StripeElements },
    ): StripeElement => stripeElements.create(
      "payment",
      {
        defaultValues: {
          billingDetails: stripeCustomerDocument && ((
            {
              address,
              name,
              phone,
            }: StripeCustomerDocument,
          ): DefaultValuesOption["billingDetails"] => ({
            address: address && ((
              {
                city,
                country,
                line1,
                line2,
                postalCode,
                state,
              }: Exclude<StripeCustomerDocument["address"], undefined>,
            ): Exclude<DefaultValuesOption["billingDetails"], undefined>["address"] => ({
              city,
              country,
              line1,
              line2,
              postal_code: postalCode,
              state,
            }))(address),
            name,
            phone,
          }))(stripeCustomerDocument),
        },
      },
    ).on(
      "change",
      (
        {
          complete,
          value,
        }: StripePaymentElementChangeEvent,
      ): void => {
        this.complete$.set(complete);

        this.formGroup.setValue(
          {
            paymentMethod: {
              billingDetails: {
                address: {
                  city:       value.payment_method?.billing_details?.address.city || null,
                  country:    value.payment_method?.billing_details?.address.country || null,
                  line1:      value.payment_method?.billing_details?.address.line1 || null,
                  line2:      value.payment_method?.billing_details?.address.line2 || null,
                  postalCode: value.payment_method?.billing_details?.address.postal_code || null,
                  state:      value.payment_method?.billing_details?.address.state || null,
                },
                email:   value.payment_method?.billing_details?.email || null,
                name:    value.payment_method?.billing_details?.name || null,
                phone:   value.payment_method?.billing_details?.phone || null,
              },
              id:             value.payment_method?.id || null,
              type:           value.payment_method?.type || null,
            },
            type:          value.type,
          },
        );
      },
    );

    effect(
      (): void => {
        const stripeSetupIntentDocuments: StripeSetupIntentDocument[] | undefined = this.stripeSetupIntentsService.stripeSetupIntentDocuments$();

        if (stripeSetupIntentDocuments && stripeSetupIntentDocuments?.length === 0) {
          const userId: string | undefined = this.auth.currentUser?.uid;

          if (userId)
            addDoc<StripeSetupIntentDocument, StripeSetupIntentDocument>(
              collection(
                this.firestore,
                "stripeSetupIntents",
              ) as CollectionReference<StripeSetupIntentDocument, StripeSetupIntentDocument>,
              {
                userId,
              },
            ).catch<never>(
              (error: unknown): never => {
                console.error("Something went wrong.");

                throw error;
              },
            );
        } else {
          const stripeSetupIntentDocument: StripeSetupIntentDocument | undefined = stripeSetupIntentDocuments?.[0];
          const stripeSetupIntentClientSecret: string | undefined                = stripeSetupIntentDocument?.clientSecret;
          const stripeSetupIntentId: string | undefined                          = stripeSetupIntentDocument?.id;

          if (stripeSetupIntentDocument && stripeSetupIntentClientSecret && stripeSetupIntentId) {
            this.getStripeElements = (stripe: Stripe): StripeElements | undefined => {
              if (this.failedClientSecrets?.includes(stripeSetupIntentClientSecret))
                return undefined;

              try {
                return stripe.elements(
                  {
                    ...this.getBaseStripeElementsOptions(),
                    clientSecret: stripeSetupIntentClientSecret,
                  },
                );
              } catch {
                console.error("Something went wrong.");

                const removeSetupIntentMethodWriteBatch: WriteBatch = writeBatch(this.firestore);
                const userId: string | undefined                    = this.auth.currentUser?.uid;

                if (userId)
                  getDocs<StripeSetupIntentDocument, StripeSetupIntentDocument>(
                    query<StripeSetupIntentDocument, StripeSetupIntentDocument>(
                      collection(
                        this.firestore,
                        "stripeSetupIntents",
                      ) as CollectionReference<StripeSetupIntentDocument, StripeSetupIntentDocument>,
                      where(
                        "userId",
                        "==",
                        userId,
                      ),
                      where(
                        "id",
                        "==",
                        stripeSetupIntentId,
                      ),
                    ),
                  ).then<void, never>(
                    (stripeSetupIntentDocumentsQuerySnapshot: QuerySnapshot<StripeSetupIntentDocument, StripeSetupIntentDocument>): void => {
                      stripeSetupIntentDocumentsQuerySnapshot.forEach(
                        ({ ref: stripeSetupIntentDocumentReference }: QueryDocumentSnapshot<StripeSetupIntentDocument, StripeSetupIntentDocument>): void => removeSetupIntentMethodWriteBatch.update<StripeSetupIntentDocument, StripeSetupIntentDocument>(
                          stripeSetupIntentDocumentReference,
                          {
                            asyncDeleted: serverTimestamp(),
                          },
                        ) && void (0),
                      );

                      removeSetupIntentMethodWriteBatch.commit().catch<never>(
                        (error: unknown): never => {
                          console.error("Something went wrong.");

                          throw error;
                        },
                      );
                    },
                    (error: unknown): never => {
                      console.error("Something went wrong.");

                      throw error;
                    },
                  );

                this.failedClientSecrets = [
                  ...(this.failedClientSecrets ? [ ...this.failedClientSecrets ] : []),
                  stripeSetupIntentClientSecret,
                ];

                return undefined;
              }
            };

            this.initializeStripeElement();
          }
        }
      },
    );
  }

  private readonly auth: Auth                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      = inject<Auth>(Auth);
  private readonly firestore: Firestore                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            = inject<Firestore>(Firestore);
  private readonly formGroup: FormGroup<{ "paymentMethod": FormGroup<{ "billingDetails": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>, "id": FormControl<string | null>, "type": FormControl<string | null> }>, "type": FormControl<string | null> }> = new FormGroup<{ "paymentMethod": FormGroup<{ "billingDetails": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>, "id": FormControl<string | null>, "type": FormControl<string | null> }>, "type": FormControl<string | null> }>(
    {
      paymentMethod: new FormGroup<{ "billingDetails": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>, "id": FormControl<string | null>, "type": FormControl<string | null> }>(
        {
          billingDetails: new FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>(
            {
              address: new FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>(
                {
                  city:       new FormControl<string | null>(null),
                  country:    new FormControl<string | null>(null),
                  line1:      new FormControl<string | null>(null),
                  line2:      new FormControl<string | null>(null),
                  postalCode: new FormControl<string | null>(null),
                  state:      new FormControl<string | null>(null),
                },
              ),
              email:   new FormControl<string | null>(null),
              name:    new FormControl<string | null>(null),
              phone:   new FormControl<string | null>(null),
            },
          ),
          id:             new FormControl<string | null>(null),
          type:           new FormControl<string | null>(null),
        },
      ),
      type:          new FormControl<string | null>(null),
    },
  );

  protected readonly stripeSetupIntentsService: StripeSetupIntentsService = inject<StripeSetupIntentsService>(StripeSetupIntentsService);

  private failedClientSecrets?: string[];

  public submit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);

    setTimeout(
      (): void => {
        const userId: string | undefined = this.auth.currentUser?.uid;

        if (userId)
          this.submitStripeElement?.().then<void>(
            (
              submitStripeElementResponse?: { stripe: Stripe, stripeElements: StripeElements },
            ): void => {
              if (!submitStripeElementResponse)
                return void (0);

              const stripe: Stripe                 = submitStripeElementResponse.stripe;
              const stripeElements: StripeElements = submitStripeElementResponse.stripeElements;

              stripe?.confirmSetup(
                {
                  elements: stripeElements,
                  redirect: "if_required",
                },
              ).then<void, never>(
                ({ setupIntent }: SetupIntentResult): void => {
                  const paymentMethodId: string | undefined  = typeof setupIntent?.payment_method === "string" ? setupIntent.payment_method : setupIntent?.payment_method?.id;
                  const stripeCustomerId: string | undefined = this.stripeCustomersService.stripeCustomerDocument$()?.id || undefined;

                  if (paymentMethodId && stripeCustomerId)
                    addDoc<StripePaymentMethodDocument, StripePaymentMethodDocument>(
                      collection(
                        this.firestore,
                        "stripePaymentMethods",
                      ) as CollectionReference<StripePaymentMethodDocument, StripePaymentMethodDocument>,
                      {
                        customer: stripeCustomerId,
                        id:       paymentMethodId,
                        userId,
                      },
                    ).catch<never>(
                      (error: unknown): never => {
                        console.error("Something went wrong.");

                        throw error;
                      },
                    );
                },
                (error: unknown): never => {
                  console.error("Something went wrong.");

                  throw error;
                },
              );
            },
          );
      },
      180,
    );
  }

}
