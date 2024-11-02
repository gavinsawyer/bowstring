import { NgTemplateOutlet }                                                                           from "@angular/common";
import { afterRender, Component, computed, effect, inject, type Signal }                              from "@angular/core";
import { toSignal }                                                                                   from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, Validators }                                                         from "@angular/forms";
import { ContainerDirective }                                                                         from "@standard/directives";
import { type AccountDocument }                                                                       from "@standard/interfaces";
import { AccountService }                                                                             from "@standard/services";
import { type Stripe, type StripeAddressElementChangeEvent, type StripeElement, type StripeElements } from "@stripe/stripe-js";
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

    this.stripeApiLoaderService.load().then<void>(
      (stripe: Stripe | null): void => {
        if (stripe) {
          const changeEventHandler = (stripeAddressElementChangeEvent: StripeAddressElementChangeEvent): void => {
            this.complete$.set(stripeAddressElementChangeEvent.complete);

            this.formGroup.setValue(
              {
                ...stripeAddressElementChangeEvent.value,
                phone: stripeAddressElementChangeEvent.value.phone || null,
              },
            );
          };
          const resetEffectFn      = (): void => {
            const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

            stripeElements = stripe.elements(
              {
                appearance: getAppearance(this.colorScheme$()),
                loader:     "never",
              },
            );

            stripeElement.destroy();

            stripeElement = stripeElements.create(
              "address",
              {
                defaultValues: stripeCustomer ? {
                  address: stripeCustomer.address ? {
                    ...stripeCustomer.address,
                    line2: stripeCustomer.address.line2 || undefined,
                    state: stripeCustomer.address.state || undefined,
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
              changeEventHandler,
            );

            if (mounted)
              stripeElement.mount(this.htmlDivElementRef$().nativeElement);
          };

          let stripeElements: StripeElements = stripe.elements(
            {
              appearance: getAppearance(this.colorScheme$()),
              loader:     "never",
            },
          );
          let stripeElement: StripeElement   = stripeElements.create(
            "address",
            {
              fields:     {
                phone: "always",
              },
              mode:       "shipping",
              validation: {
                phone: {
                  required: "always",
                },
              },
            },
          ).on(
            "change",
            changeEventHandler,
          );
          let mounted: boolean               = false as const;

          this.resetStripeElement = resetEffectFn;

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

  private readonly accountService: AccountService                                                                                                                                                                                                                                                                                                       = inject<AccountService>(AccountService);
  private readonly formGroup: FormGroup<{ "address": FormGroup<{ "country": FormControl<string>, "city": FormControl<string>, "state": FormControl<string | null>, "postal_code": FormControl<string>, "line2": FormControl<string | null>, "line1": FormControl<string> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }> = new FormGroup<{ "address": FormGroup<{ "country": FormControl<string>, "city": FormControl<string>, "state": FormControl<string | null>, "postal_code": FormControl<string>, "line2": FormControl<string | null>, "line1": FormControl<string> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }>(
    {
      address: new FormGroup<{ "country": FormControl<string>, "city": FormControl<string>, "state": FormControl<string | null>, "postal_code": FormControl<string>, "line2": FormControl<string | null>, "line1": FormControl<string> }>(
        {
          city:        new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          country:     new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          line1:       new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          line2:       new FormControl<string | null>(null),
          postal_code: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          state:       new FormControl<string | null>(null),
        },
      ),
      name:    new FormControl<string | null>(null),
      phone:   new FormControl<string | null>(null),
    },
  );
  private readonly formGroupValue$: Signal<typeof this.formGroup.value>                                                                                                                                                                                                                                                                                 = toSignal<typeof this.formGroup.value>(
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
            city:        address?.city || "",
            country:     address?.country || "",
            line1:       address?.line1 || "",
            line2:       address?.line2 || null,
            postal_code: address?.postal_code || "",
            state:       address?.state || null,
          },
          name:    stripeCustomer?.name || null,
          phone:   stripeCustomer?.phone || null,
        },
      );
    },
  );

  public submit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);

    setTimeout(
      (): void => {
        const stripeCustomer: AccountDocument["stripeCustomer"] | undefined = this.accountService.accountDocument$()?.stripeCustomer;

        if (stripeCustomer)
          this.accountService.update(
            {
              stripeCustomer: {
                ...stripeCustomer,
                address: this.formGroup.value.address?.city && this.formGroup.value.address.country && this.formGroup.value.address.line1 && this.formGroup.value.address.postal_code ? {
                  city:        this.formGroup.value.address.city,
                  country:     this.formGroup.value.address.country,
                  line1:       this.formGroup.value.address.line1,
                  line2:       this.formGroup.value.address.line2 || null,
                  postal_code: this.formGroup.value.address.postal_code,
                  state:       this.formGroup.value.address.state || null,
                } : null,
                name:    this.formGroup.value.name || null,
                phone:   this.formGroup.value.phone || null,
              },
            },
          ).then<void>(
            (): void => void (0),
          );
      },
      180,
    );
  }

}
