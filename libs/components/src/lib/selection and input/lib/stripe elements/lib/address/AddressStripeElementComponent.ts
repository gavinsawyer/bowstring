import { NgTemplateOutlet }                                                                                                                        from "@angular/common";
import { afterRender, Component, computed, effect, inject, type Signal }                                                                           from "@angular/core";
import { toSignal }                                                                                                                                from "@angular/core/rxjs-interop";
import { Auth }                                                                                                                                    from "@angular/fire/auth";
import { doc, type DocumentData, type DocumentReference, Firestore, updateDoc }                                                                    from "@angular/fire/firestore";
import { FormControl, FormGroup, Validators }                                                                                                      from "@angular/forms";
import { ContainerDirective }                                                                                                                      from "@standard/directives";
import { type AccountDocument }                                                                                                                    from "@standard/interfaces";
import { AccountService }                                                                                                                          from "@standard/services";
import { type Stripe, type StripeAddressElement, type StripeAddressElementChangeEvent, type StripeElement, type StripeElements, type StripeError } from "@stripe/stripe-js";
import { isEqual }                                                                                                                                 from "lodash";
import { startWith }                                                                                                                               from "rxjs";
import { StripeElementComponent }                                                                                                                  from "../../../stripe element/StripeElementComponent";


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
    selector:       "standard--address-stripe-element",
    standalone:     true,
    styleUrls:      [
      "AddressStripeElementComponent.sass",
    ],
    templateUrl:    "AddressStripeElementComponent.html",
  },
)
export class AddressStripeElementComponent
  extends StripeElementComponent {

  constructor() {
    super();

    this.getStripeElement  = (
      {
        stripeCustomer,
        stripeElements,
      }: { "stripeCustomer"?: AccountDocument["stripeCustomer"], "stripeElements": StripeElements, }): StripeAddressElement => stripeElements.create(
      "address",
      {
        defaultValues: stripeCustomer ? {
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
        } : undefined,
        fields:        {
          phone: "always",
        },
        mode:          "shipping",
        validation:    {
          phone: {
            required: "always",
          },
        },
      },
    ).on(
      "change",
      (stripeAddressElementChangeEvent: StripeAddressElementChangeEvent): void => {
        const stripeElementValue: StripeAddressElementChangeEvent["value"] = stripeAddressElementChangeEvent.value;

        this.complete$.set(stripeAddressElementChangeEvent.complete);

        this.formGroup.setValue(
          {
            address: {
              city:       stripeElementValue.address.city,
              country:    stripeElementValue.address.country,
              line1:      stripeElementValue.address.line1,
              line2:      stripeElementValue.address.line2,
              state:      stripeElementValue.address.state,
              postalCode: stripeElementValue.address.postal_code,
            },
            name:    stripeElementValue.name,
            phone:   stripeElementValue.phone || null,
          },
        );
      },
    );
    this.getStripeElements = (stripe: Stripe): StripeElements => stripe.elements(this.getBaseStripeElementsOptions());

    this.stripeApiLoaderService.load().then<void>(
      (stripe: Stripe | null): void => {
        if (stripe) {
          let stripeElements: StripeElements = this.getStripeElements?.(stripe) as StripeElements;
          let stripeElement: StripeElement   = this.getStripeElement?.(
            {
              stripeElements: stripeElements,
            },
          ) as StripeAddressElement;
          let mounted: boolean               = false as const;

          this.resetStripeElement  = (): void => {
            stripeElements = this.getStripeElements?.(stripe) as StripeElements;

            stripeElement.destroy();

            stripeElement = this.getStripeElement?.(
              {
                stripeCustomer: this.accountService.accountDocument$()?.stripeCustomer,
                stripeElements: stripeElements,
              },
            ) as StripeAddressElement;

            if (mounted)
              stripeElement.mount(this.htmlDivElementRef$().nativeElement);
          };
          this.submitStripeElement = (): void => {
            stripeElements.submit().then<void, never>(
              ({ error: stripeError }: { error?: StripeError }): void => {
                if (stripeError) {
                  console.error("Something went wrong.");

                  throw stripeError;
                }

                const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

                if (stripeCustomer && this.auth.currentUser)
                  updateDoc<AccountDocument, DocumentData>(
                    doc(
                      this.firestore,
                      `/accounts/${ this.auth.currentUser.uid }`,
                    ) as DocumentReference<AccountDocument>,
                    {
                      stripeCustomer: {
                        ...stripeCustomer,
                        address: this.formGroup.value.address?.city && this.formGroup.value.address.country && this.formGroup.value.address.line1 && this.formGroup.value.address.postalCode ? {
                          city:       this.formGroup.value.address.city,
                          country:    this.formGroup.value.address.country,
                          line1:      this.formGroup.value.address.line1,
                          line2:      this.formGroup.value.address.line2 || null,
                          postalCode: this.formGroup.value.address.postalCode,
                          state:      this.formGroup.value.address.state || null,
                        } : null,
                        name:    this.formGroup.value.name || null,
                        phone:   this.formGroup.value.phone || null,
                      },
                    },
                  ).then<void, never>(
                    (): void => void (0),
                    (error: unknown): never => {
                      console.error("Something went wrong.");

                      throw error;
                    },
                  );
              },
            );
          };

          effect(
            this.resetStripeElement,
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
        const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

        if (stripeCustomer)
          this.formGroup.reset(
            {
              address: stripeCustomer.address || undefined,
              name:    stripeCustomer.name || undefined,
              phone:   stripeCustomer.phone || undefined,
            },
          );
      },
    );
  }

  private readonly accountService: AccountService                                                                                                                                                                                                                                                                                                      = inject<AccountService>(AccountService);
  private readonly auth: Auth                                                                                                                                                                                                                                                                                                                          = inject<Auth>(Auth);
  private readonly firestore: Firestore                                                                                                                                                                                                                                                                                                                = inject<Firestore>(Firestore);
  private readonly formGroup: FormGroup<{ "address": FormGroup<{ "country": FormControl<string>, "city": FormControl<string>, "state": FormControl<string | null>, "postalCode": FormControl<string>, "line2": FormControl<string | null>, "line1": FormControl<string> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }> = new FormGroup<{ "address": FormGroup<{ "country": FormControl<string>, "city": FormControl<string>, "state": FormControl<string | null>, "postalCode": FormControl<string>, "line2": FormControl<string | null>, "line1": FormControl<string> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }>(
    {
      address: new FormGroup<{ "country": FormControl<string>, "city": FormControl<string>, "state": FormControl<string | null>, "postalCode": FormControl<string>, "line2": FormControl<string | null>, "line1": FormControl<string> }>(
        {
          city:       new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          country:    new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          line1:      new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          line2:      new FormControl<string | null>(null),
          postalCode: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          state:      new FormControl<string | null>(null),
        },
      ),
      name:    new FormControl<string | null>(null),
      phone:   new FormControl<string | null>(null),
    },
  );
  private readonly formGroupValue$: Signal<typeof this.formGroup.value>                                                                                                                                                                                                                                                                                = toSignal<typeof this.formGroup.value>(
    this.formGroup.valueChanges.pipe<typeof this.formGroup.value>(
      startWith<typeof this.formGroup.value, [ typeof this.formGroup.value ]>(this.formGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  public readonly edited$: Signal<boolean> = computed<boolean>(
    (): boolean => {
      const stripeCustomer: AccountDocument["stripeCustomer"] | undefined                  = this.accountService.accountDocument$()?.stripeCustomer;
      const address: NonNullable<AccountDocument["stripeCustomer"]>["address"] | undefined = stripeCustomer?.address;

      return !isEqual(
        this.formGroupValue$(),
        {
          address: {
            city:       address?.city || "",
            country:    address?.country || "",
            line1:      address?.line1 || "",
            line2:      address?.line2 || null,
            postalCode: address?.postalCode || "",
            state:      address?.state || null,
          },
          name:    stripeCustomer?.name || null,
          phone:   stripeCustomer?.phone || null,
        },
      );
    },
  );

}
