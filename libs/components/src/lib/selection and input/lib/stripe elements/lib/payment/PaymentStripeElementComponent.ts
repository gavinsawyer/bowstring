import { NgTemplateOutlet }                                                                           from "@angular/common";
import { afterRender, Component, computed, effect, inject, type Signal }                              from "@angular/core";
import { toSignal }                                                                                   from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, Validators }                                                         from "@angular/forms";
import { ContainerDirective }                                                                         from "@standard/directives";
import { type AccountDocument }                                                                       from "@standard/interfaces";
import { AccountService }                                                                             from "@standard/services";
import { type Stripe, type StripeElement, type StripeElements, type StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { isEqual }                                                                                    from "lodash";
import { startWith }                                                                                  from "rxjs";
import { type SheetComponent }                                                                        from "../../../../../../";
import { StripeElementComponent }                                                                     from "../../../stripe element/StripeElementComponent";
import getAppearance                                                                                  from "../getAppearance";


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
                appearance: getAppearance(this.colorScheme$()),
                currency:   "usd",
                loader:     "never",
                mode:       "setup",
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
              appearance: getAppearance(this.colorScheme$()),
              currency:   "usd",
              loader:     "never",
              mode:       "setup",
            },
          );
          let stripeElement: StripeElement   = stripeElements.create("payment").on(
            "change",
            changeEventHandler,
          );
          let mounted: boolean               = false as const;

          this.reset = resetEffectFn;

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
                billing_details: {
                  address: {
                    city:        accountDocument.stripeCustomer.address?.city,
                    country:     accountDocument.stripeCustomer.address?.country,
                    line1:       accountDocument.stripeCustomer.address?.line1,
                    line2:       accountDocument.stripeCustomer.address?.line2 || undefined,
                    postal_code: accountDocument.stripeCustomer.address?.postal_code,
                    state:       accountDocument.stripeCustomer.address?.state || undefined,
                  },
                  email:   accountDocument.email,
                  name:    accountDocument.stripeCustomer.name,
                  phone:   accountDocument.stripeCustomer.phone,
                },
              },
            },
          );
      },
    );
  }

  private readonly accountService: AccountService                       = inject<AccountService>(AccountService);
  private readonly formGroup                                            = new FormGroup(
    {
      payment_method: new FormGroup(
        {
          billing_details: new FormGroup(
            {
              address: new FormGroup(
                {
                  city:        new FormControl<string | null>(
                    null,
                  ),
                  country:     new FormControl<string | null>(
                    null,
                  ),
                  line1:       new FormControl<string | null>(
                    null,
                  ),
                  line2:       new FormControl<string | null>(
                    null,
                  ),
                  postal_code: new FormControl<string | null>(
                    null,
                  ),
                  state:       new FormControl<string | null>(
                    null,
                  ),
                },
              ),
              email:   new FormControl<string | null>(
                null,
              ),
              name:    new FormControl<string | null>(
                null,
              ),
              phone:   new FormControl<string | null>(
                null,
              ),
            },
          ),
          id:              new FormControl<string | null>(
            null,
          ),
          type:            new FormControl<string | null>(
            null,
          ),
        },
      ),
      type:           new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
    },
  );
  private readonly formGroupValue$: Signal<typeof this.formGroup.value> = toSignal<typeof this.formGroup.value>(
    this.formGroup.valueChanges.pipe<typeof this.formGroup.value>(
      startWith<typeof this.formGroup.value, [ typeof this.formGroup.value ]>(this.formGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  public readonly edited$: Signal<boolean> = computed<boolean>(
    (): boolean => !isEqual(
      this.formGroupValue$(),
      {
        payment_method: {
          billing_details: {
            address: {
              city:        this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details.address?.city || null,
              country:     this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details.address?.country || null,
              line1:       this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details.address?.line1 || null,
              line2:       this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details.address?.line2 || null,
              postal_code: this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details.address?.postal_code || null,
              state:       this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details.address?.state || null,
            },
            email:   this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details?.email || null,
            name:    this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details?.name || null,
            phone:   this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.billing_details?.phone || null,
          },
          id:              this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.id || null,
          type:            this.accountService.accountDocument$()?.stripeCustomer?.payment_method?.type || null,
        },
        type:           this.accountService.accountDocument$()?.stripeCustomer?.type || "",
      },
    ),
  );

  public submit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);

    setTimeout(
      (): void => {
        if (this.formGroup.value.type) {
          const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

          if (stripeCustomer)
            this.accountService.update(
              {
                stripeCustomer: {
                  ...stripeCustomer,
                  payment_method: this.formGroup.value.payment_method?.billing_details?.address?.city && this.formGroup.value.payment_method.billing_details.address.country && this.formGroup.value.payment_method.billing_details.address.line1 && this.formGroup.value.payment_method.billing_details.address.postal_code && this.formGroup.value.payment_method.billing_details.email && this.formGroup.value.payment_method.billing_details.name && this.formGroup.value.payment_method.billing_details.phone && this.formGroup.value.payment_method.id && this.formGroup.value.payment_method.type ? {
                    billing_details: {
                      address: this.formGroup.value.payment_method.billing_details.address ? {
                        city:        this.formGroup.value.payment_method.billing_details.address.city,
                        country:     this.formGroup.value.payment_method.billing_details.address.country,
                        line1:       this.formGroup.value.payment_method.billing_details.address.line1,
                        line2:       this.formGroup.value.payment_method.billing_details.address.line2 || null,
                        postal_code: this.formGroup.value.payment_method.billing_details.address.postal_code,
                        state:       this.formGroup.value.payment_method.billing_details.address.state || null,
                      } : null,
                      email:   this.formGroup.value.payment_method.billing_details.email,
                      name:    this.formGroup.value.payment_method.billing_details.name,
                      phone:   this.formGroup.value.payment_method.billing_details.phone,
                    },
                    id:              this.formGroup.value.payment_method.id,
                    type:            this.formGroup.value.payment_method.type,
                  } : null,
                  type:           this.formGroup.value.type,
                },
              },
            ).then<void>(
              (): void => void (0),
            );
        }
      },
      180,
    );
  }

}
