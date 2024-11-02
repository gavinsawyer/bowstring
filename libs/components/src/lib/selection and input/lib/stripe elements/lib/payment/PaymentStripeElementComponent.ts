import { NgTemplateOutlet }                                                                                                                       from "@angular/common";
import { afterRender, Component, computed, effect, inject, type Signal }                                                                          from "@angular/core";
import { toSignal }                                                                                                                               from "@angular/core/rxjs-interop";
import { Functions, httpsCallable }                                                                                                               from "@angular/fire/functions";
import { FormControl, FormGroup }                                                                                                                 from "@angular/forms";
import { ContainerDirective }                                                                                                                     from "@standard/directives";
import { type AccountDocument }                                                                                                                   from "@standard/interfaces";
import { AccountService }                                                                                                                         from "@standard/services";
import { type PaymentMethodResult, type Stripe, type StripeElement, type StripeElements, type StripeError, type StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { isEqual }                                                                                                                                from "lodash";
import { startWith }                                                                                                                              from "rxjs";
import { type SheetComponent }                                                                                                                    from "../../../../../../";
import { StripeElementComponent }                                                                                                                 from "../../../stripe element/StripeElementComponent";
import getAppearance                                                                                                                              from "../getAppearance";


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

    this.stripeApiLoaderService.load().then<void>(
      (stripe: Stripe | null): void => {
        if (stripe) {
          const changeEventHandler = (stripePaymentElementChangeEvent: StripePaymentElementChangeEvent): void => {
            this.complete$.set(stripePaymentElementChangeEvent.complete);

            this.formGroup.setValue(
              {
                ...stripePaymentElementChangeEvent.value,
                payment_method: {
                  billing_details: {
                    address: {
                      city:        stripePaymentElementChangeEvent.value.payment_method?.billing_details.address.city || null,
                      country:     stripePaymentElementChangeEvent.value.payment_method?.billing_details.address.country || null,
                      line1:       stripePaymentElementChangeEvent.value.payment_method?.billing_details.address.line1 || null,
                      line2:       stripePaymentElementChangeEvent.value.payment_method?.billing_details.address.line2 || null,
                      postal_code: stripePaymentElementChangeEvent.value.payment_method?.billing_details.address.postal_code || null,
                      state:       stripePaymentElementChangeEvent.value.payment_method?.billing_details.address.state || null,
                    },
                    email:   stripePaymentElementChangeEvent.value.payment_method?.billing_details.email || null,
                    name:    stripePaymentElementChangeEvent.value.payment_method?.billing_details.name || null,
                    phone:   stripePaymentElementChangeEvent.value.payment_method?.billing_details.phone || null,
                  },
                  id:              stripePaymentElementChangeEvent.value.payment_method?.id || null,
                  type:            stripePaymentElementChangeEvent.value.payment_method?.type || null,
                },
              },
            );
          };
          const resetEffectFn      = (): void => {
            const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

            stripeElements = stripe.elements(
              {
                appearance:            getAppearance(this.colorScheme$()),
                currency:              "usd",
                loader:                "never",
                mode:                  "setup",
                paymentMethodCreation: "manual",
              },
            );

            stripeElement.destroy();

            stripeElement = stripeElements.create(
              "payment",
              {
                defaultValues: stripeCustomer ? {
                  billingDetails: {
                    address: stripeCustomer.address ? {
                      ...stripeCustomer.address,
                      line2: stripeCustomer.address.line2 || undefined,
                      state: stripeCustomer.address.state || undefined,
                    } : undefined,
                    name:    stripeCustomer.name || undefined,
                    phone:   stripeCustomer.phone || undefined,
                  },
                } : undefined,
              },
            ).on(
              "change",
              changeEventHandler,
            );

            if (mounted)
              stripeElement.mount(this.htmlDivElementRef$().nativeElement);
          };

          let stripeElements: StripeElements = stripe.elements(
            {
              appearance:            getAppearance(this.colorScheme$()),
              currency:              "usd",
              loader:                "never",
              mode:                  "setup",
              paymentMethodCreation: "manual",
            },
          );
          let stripeElement: StripeElement   = stripeElements.create("payment").on(
            "change",
            changeEventHandler,
          );
          let mounted: boolean               = false as const;

          this.resetStripeElement  = resetEffectFn;
          this.submitStripeElement = (): void => {
            stripeElements.submit().then<void, never>(
              ({ error: stripeError }: { error?: StripeError }): void => {
                if (stripeError) {
                  console.error("Something went wrong.");

                  throw stripeError;
                }

                stripe.createPaymentMethod(
                  {
                    elements: stripeElements,
                  },
                ).then<void, never>(
                  (paymentMethodResult: PaymentMethodResult): void => {
                    if (paymentMethodResult.error) {
                      console.error("Something went wrong.");

                      throw paymentMethodResult.error;
                    }

                    httpsCallable<{ "paymentMethodId": string }, null>(
                      this.functions,
                      "attachStripePaymentMethod",
                    )(
                      {
                        paymentMethodId: paymentMethodResult.paymentMethod.id,
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
                );
              },
            );
          };

          effect(
            resetEffectFn,
            {
              injector: this.injector,
            },
          );

          afterRender(
            (): void => {
              if (!mounted) {
                stripeElement.mount(this.htmlDivElementRef$().nativeElement);

                mounted = true;
              }
            },
            {
              injector: this.injector,
            },
          );
        }
      },
    );

    effect(
      (): void => {
        const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

        if (accountDocument?.stripeCustomer)
          this.formGroup.reset(
            {
              payment_method: {
                ...accountDocument.stripeCustomer.payment_method,
                billing_details: {
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
              type:           accountDocument.stripeCustomer.payment_method?.type || undefined,
            },
          );
      },
    );
  }

  private readonly accountService: AccountService                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     = inject<AccountService>(AccountService);
  private readonly formGroup: FormGroup<{ "payment_method": FormGroup<{ "billing_details": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postal_code": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>, "id": FormControl<string | null>, "type": FormControl<string | null> }>, "type": FormControl<string | null> }> = new FormGroup<{ "payment_method": FormGroup<{ "billing_details": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postal_code": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>, "id": FormControl<string | null>, "type": FormControl<string | null> }>, "type": FormControl<string | null> }>(
    {
      payment_method: new FormGroup<{ "billing_details": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postal_code": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>, "id": FormControl<string | null>, "type": FormControl<string | null> }>(
        {
          billing_details: new FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postal_code": FormControl<string | null>, "state": FormControl<string | null> }>, "email": FormControl<string | null>, "name": FormControl<string | null>, "phone": FormControl<string | null> }>(
            {
              address: new FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postal_code": FormControl<string | null>, "state": FormControl<string | null> }>(
                {
                  city:        new FormControl<string | null>(null),
                  country:     new FormControl<string | null>(null),
                  line1:       new FormControl<string | null>(null),
                  line2:       new FormControl<string | null>(null),
                  postal_code: new FormControl<string | null>(null),
                  state:       new FormControl<string | null>(null),
                },
              ),
              email:   new FormControl<string | null>(null),
              name:    new FormControl<string | null>(null),
              phone:   new FormControl<string | null>(null),
            },
          ),
          id:              new FormControl<string | null>(null),
          type:            new FormControl<string | null>(null),
        },
      ),
      type:           new FormControl<string | null>(null),
    },
  );
  private readonly formGroupValue$: Signal<typeof this.formGroup.value>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               = toSignal<typeof this.formGroup.value>(
    this.formGroup.valueChanges.pipe<typeof this.formGroup.value>(
      startWith<typeof this.formGroup.value, [ typeof this.formGroup.value ]>(this.formGroup.value),
    ),
    {
      requireSync: true,
    },
  );
  private readonly functions: Functions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               = inject<Functions>(Functions);

  public readonly edited$: Signal<boolean> = computed<boolean>(
    (): boolean => {
      const payment_method: NonNullable<AccountDocument["stripeCustomer"]>["payment_method"] | undefined                                                  = this.accountService.accountDocument$()?.stripeCustomer?.payment_method;
      const billing_details: NonNullable<NonNullable<AccountDocument["stripeCustomer"]>["payment_method"]>["billing_details"] | undefined                 = payment_method?.billing_details;
      const address: NonNullable<NonNullable<NonNullable<AccountDocument["stripeCustomer"]>["payment_method"]>["billing_details"]>["address"] | undefined = billing_details?.address;

      return !isEqual(
        this.formGroupValue$(),
        {
          payment_method: {
            billing_details: {
              address: {
                city:        address?.city || null,
                country:     address?.country || null,
                line1:       address?.line1 || null,
                line2:       address?.line2 || null,
                postal_code: address?.postal_code || null,
                state:       address?.state || null,
              },
              email:   billing_details?.email || null,
              name:    billing_details?.name || null,
              phone:   billing_details?.phone || null,
            },
            id:              payment_method?.id || null,
            type:            payment_method?.type || null,
          },
          type:           payment_method?.type || null,
        },
      );
    },
  );

  public submit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);

    setTimeout(
      (): void => {
        this.submitStripeElement?.();
      },
      180,
    );
  }

}
