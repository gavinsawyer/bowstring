import { NgTemplateOutlet }                                                                                                   from "@angular/common";
import { Component, computed, effect, inject, type Signal }                                                                   from "@angular/core";
import { toSignal }                                                                                                           from "@angular/core/rxjs-interop";
import { Functions, httpsCallable, type HttpsCallableResult }                                                                 from "@angular/fire/functions";
import { FormControl, FormGroup }                                                                                             from "@angular/forms";
import { ContainerDirective }                                                                                                 from "@standard/directives";
import { type AccountDocument }                                                                                               from "@standard/interfaces";
import { type SetupIntentResult, type Stripe, type StripeElement, type StripeElements, type StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { isEqual }                                                                                                            from "lodash";
import { startWith }                                                                                                          from "rxjs";
import { type SheetComponent }                                                                                                from "../../../../../presentation";
import { StripeElementComponent }                                                                                             from "../../../stripe element/StripeElementComponent";


@Component(
  {
    hostDirectives: [
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
    imports:        [
      NgTemplateOutlet,
    ],
    selector:       "standard--payment-stripe-element",
    standalone:     true,
    styleUrls:      [
      "PaymentStripeElementComponent.sass",
    ],
    templateUrl:    "PaymentStripeElementComponent.html",
  },
)
export class PaymentStripeElementComponent
  extends StripeElementComponent {

  constructor() {
    super();

    this.getStripeElement = (
      {
        stripeCustomer,
        stripeElements,
      }: { "stripeCustomer"?: AccountDocument["stripeCustomer"], "stripeElements": StripeElements, },
    ): StripeElement => stripeElements.create(
      "payment",
      {
        defaultValues: stripeCustomer ? {
          billingDetails: {
            address: stripeCustomer.address ? {
              city:        stripeCustomer.address.city,
              country:     stripeCustomer.address.country,
              line1:       stripeCustomer.address.line1,
              line2:       stripeCustomer.address.line2 || undefined,
              postal_code: stripeCustomer.address.postalCode,
              state:       stripeCustomer.address.state || undefined,
            } : undefined,
            name:    stripeCustomer.name || undefined,
            phone:   stripeCustomer.phone || undefined,
          },
        } : undefined,
      },
    ).on(
      "change",
      (stripePaymentElementChangeEvent: StripePaymentElementChangeEvent): void => {
        const stripeElementValue: StripePaymentElementChangeEvent["value"]                                                                                                 = stripePaymentElementChangeEvent.value;
        const stripeElementValuePaymentMethod: StripePaymentElementChangeEvent["value"]["payment_method"]                                                                  = stripeElementValue.payment_method;
        const stripeElementValuePaymentMethodBillingDetails: Exclude<StripePaymentElementChangeEvent["value"]["payment_method"], undefined>["billing_details"] | undefined = stripeElementValue.payment_method?.billing_details;

        this.complete$.set(stripePaymentElementChangeEvent.complete);

        this.formGroup.setValue(
          {
            paymentMethod: {
              billingDetails: {
                address: {
                  city:       stripeElementValuePaymentMethodBillingDetails?.address.city || null,
                  country:    stripeElementValuePaymentMethodBillingDetails?.address.country || null,
                  line1:      stripeElementValuePaymentMethodBillingDetails?.address.line1 || null,
                  line2:      stripeElementValuePaymentMethodBillingDetails?.address.line2 || null,
                  postalCode: stripeElementValuePaymentMethodBillingDetails?.address.postal_code || null,
                  state:      stripeElementValuePaymentMethodBillingDetails?.address.state || null,
                },
                email:   stripeElementValuePaymentMethodBillingDetails?.email || null,
                name:    stripeElementValuePaymentMethodBillingDetails?.name || null,
                phone:   stripeElementValuePaymentMethodBillingDetails?.phone || null,
              },
              id:             stripeElementValuePaymentMethod?.id || null,
              type:           stripeElementValuePaymentMethod?.type || null,
            },
            type:          stripeElementValue.type,
          },
        );
      },
    );

    httpsCallable<null, { "clientSecret": string }>(
      this.functions,
      "createStripeSetupIntent",
    )().then<void, never>(
      ({ data: { clientSecret } }: HttpsCallableResult<{ clientSecret: string }>): void => {
        this.getStripeElements = (stripe: Stripe): StripeElements => stripe.elements(
          {
            ...this.getBaseStripeElementsOptions(),
            clientSecret: clientSecret,
          },
        );

        this.initializeStripeElement();
      },
      (error: unknown): never => {
        console.error("Something went wrong.");

        throw error;
      },
    );

    effect(
      (): void => {
        const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

        if (accountDocument?.stripeCustomer)
          this.formGroup.reset(
            {
              paymentMethod: {
                ...accountDocument.stripeCustomer.paymentMethod,
                billingDetails: {
                  address: {
                    ...accountDocument.stripeCustomer.address,
                    line2: accountDocument.stripeCustomer.address?.line2 || undefined,
                    state: accountDocument.stripeCustomer.address?.state || undefined,
                  },
                  email:   accountDocument.email,
                  name:    accountDocument.stripeCustomer.name,
                  phone:   accountDocument.stripeCustomer.phone,
                },
              },
              type:          accountDocument.stripeCustomer.paymentMethod?.type || undefined,
            },
          );
      },
    );
  }

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
  private readonly formGroupValue$: Signal<typeof this.formGroup.value>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            = toSignal<typeof this.formGroup.value>(
    this.formGroup.valueChanges.pipe<typeof this.formGroup.value>(
      startWith<typeof this.formGroup.value, [ typeof this.formGroup.value ]>(this.formGroup.value),
    ),
    {
      requireSync: true,
    },
  );
  private readonly functions: Functions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            = inject<Functions>(Functions);

  public readonly edited$: Signal<boolean> = computed<boolean>(
    (): boolean => {
      const payment_method: NonNullable<AccountDocument["stripeCustomer"]>["paymentMethod"] | undefined                                                 = this.accountService.accountDocument$()?.stripeCustomer?.paymentMethod;
      const billing_details: NonNullable<NonNullable<AccountDocument["stripeCustomer"]>["paymentMethod"]>["billingDetails"] | undefined                 = payment_method?.billingDetails;
      const address: NonNullable<NonNullable<NonNullable<AccountDocument["stripeCustomer"]>["paymentMethod"]>["billingDetails"]>["address"] | undefined = billing_details?.address;

      return !isEqual(
        this.formGroupValue$(),
        {
          paymentMethod: {
            billingDetails: {
              address: {
                city:        address?.city || null,
                country:     address?.country || null,
                line1:       address?.line1 || null,
                line2:       address?.line2 || null,
                postal_code: address?.postalCode || null,
                state:       address?.state || null,
              },
              email:   billing_details?.email || null,
              name:    billing_details?.name || null,
              phone:   billing_details?.phone || null,
            },
            id:             payment_method?.id || null,
            type:           payment_method?.type || null,
          },
          type:          payment_method?.type || null,
        },
      );
    },
  );

  public submit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);

    setTimeout(
      (): void => {
        if (this.submitStripeElement)
          this.submitStripeElement().then<void>(
            (
              {
                stripe,
                stripeElements,
              }: { stripe: Stripe, stripeElements: StripeElements },
            ): Promise<void> => stripe.confirmSetup(
              {
                elements: stripeElements,
                redirect: "if_required",
              },
            ).then<void, never>(
              (setupIntentResult: SetupIntentResult): void => {
                if (setupIntentResult.error) {
                  console.error("Something went wrong.");

                  throw setupIntentResult.error;
                }

                if (setupIntentResult.setupIntent.payment_method)
                  httpsCallable<{ "paymentMethodId": string }, null>(
                    this.functions,
                    "attachStripePaymentMethod",
                  )(
                    {
                      paymentMethodId: typeof setupIntentResult.setupIntent.payment_method === "string" ? setupIntentResult.setupIntent.payment_method : setupIntentResult.setupIntent.payment_method.id,
                    },
                  ).then<void, never>(
                    (): void => void (0),
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
            ),
          );
      },
      180,
    );
  }

}
