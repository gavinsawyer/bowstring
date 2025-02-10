import { NgTemplateOutlet }                                                                                                             from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, effect, inject, type Signal }                                                    from "@angular/core";
import { toSignal }                                                                                                                     from "@angular/core/rxjs-interop";
import { Auth }                                                                                                                         from "@angular/fire/auth";
import { deleteField, doc, type DocumentReference, Firestore, updateDoc }                                                               from "@angular/fire/firestore";
import { FormControl, FormGroup }                                                                                                       from "@angular/forms";
import { ContainerDirective }                                                                                                           from "@standard/directives";
import { type StripeCustomerDocument }                                                                                                  from "@standard/interfaces";
import { type Stripe, type StripeAddressElementChangeEvent, type StripeAddressElementOptions, type StripeElement, type StripeElements } from "@stripe/stripe-js";
import { isEqual }                                                                                                                      from "lodash";
import { startWith }                                                                                                                    from "rxjs";
import { type SheetComponent }                                                                                                          from "../../../../../presentation";
import { StripeElementComponent }                                                                                                       from "../../../stripe element/StripeElementComponent";


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
    selector:        "standard--address-stripe-element",
    styleUrl:        "AddressStripeElementComponent.sass",
    templateUrl:     "AddressStripeElementComponent.html",

    standalone: true,
  },
)
export class AddressStripeElementComponent
  extends StripeElementComponent {

  constructor() {
    super();

    this.getStripeElement  = (
      {
        stripeCustomerDocument,
        stripeElements,
      }: { "stripeCustomerDocument"?: StripeCustomerDocument, "stripeElements": StripeElements },
    ): StripeElement => stripeElements.create(
      "address",
      {
        ...(stripeCustomerDocument?.shipping ? {
          defaultValues: ((
            {
              address,
              name,
              phone,
            }: Exclude<StripeCustomerDocument["shipping"], undefined>,
          ): Exclude<StripeAddressElementOptions["defaultValues"], undefined> => ({
            ...(address && address?.country ? {
              address: ((
                {
                  city,
                  line1,
                  line2,
                  postalCode,
                  state,
                }: Exclude<Exclude<StripeCustomerDocument["shipping"], undefined>["address"], undefined>,
                country: string,
              ): Exclude<Exclude<StripeAddressElementOptions["defaultValues"], undefined>["address"], undefined> => ({
                city:        city || null,
                country,
                line1:       line1 || null,
                line2:       line2 || null,
                postal_code: postalCode || null,
                state:       state || null,
              }))(
                address,
                address.country,
              ),
            } : {}),
            name,
            phone,
          }))(stripeCustomerDocument.shipping),
        } : {}),
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
      (
        {
          complete,
          value,
        }: StripeAddressElementChangeEvent,
      ): void => {
        this.complete$.set(complete);

        this.formGroup.setValue(
          {
            shipping: {
              address: {
                city:       value.address.city,
                country:    value.address.country,
                line1:      value.address.line1,
                line2:      value.address.line2,
                state:      value.address.state,
                postalCode: value.address.postal_code,
              },
              name:    value.name,
              phone:   value.phone || null,
            },
          },
        );
      },
    );
    this.getStripeElements = (stripe: Stripe): StripeElements => stripe.elements(this.getBaseStripeElementsOptions());

    this.initializeStripeElement();

    effect(
      (): void => {
        const stripeCustomerDocument: StripeCustomerDocument | undefined = this.stripeCustomersService.stripeCustomerDocument$();

        if (stripeCustomerDocument)
          ((
            {
              shipping,
            }: StripeCustomerDocument,
          ): void => this.formGroup.reset(
            {
              ...(shipping ? {
                shipping: ((
                  {
                    address,
                    name,
                    phone,
                  }: Exclude<StripeCustomerDocument["shipping"], undefined>,
                ): Exclude<typeof this.formGroup.value.shipping, undefined> => ({
                  ...(address ? {
                    address: ((
                      {
                        city,
                        country,
                        line1,
                        line2,
                        postalCode,
                        state,
                      }: Exclude<Exclude<StripeCustomerDocument["shipping"], undefined>["address"], undefined>,
                    ): Exclude<Exclude<typeof this.formGroup.value.shipping, undefined>["address"], undefined> => ({
                      ...(city ? { city } : {}),
                      ...(country ? { country } : {}),
                      ...(line1 ? { line1 } : {}),
                      ...(line2 ? { line2 } : {}),
                      ...(postalCode ? { postalCode } : {}),
                      ...(state ? { state } : {}),
                    }))(address),
                  } : {}),
                  ...(name ? { name } : {}),
                  ...(phone ? { phone } : {}),
                }))(shipping),
              } : {}),
            },
          ))(stripeCustomerDocument);
      },
    );
  }

  private readonly auth: Auth                                                                                                                                                                                                                                                                                                                                                                                 = inject<Auth>(Auth);
  private readonly firestore: Firestore                                                                                                                                                                                                                                                                                                                                                                       = inject<Firestore>(Firestore);
  private readonly formGroup: FormGroup<{ "shipping": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }> }> = new FormGroup<{ "shipping": FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }> }>(
    {
      shipping: new FormGroup<{ "address": FormGroup<{ "city": FormControl<string | null>, "country": FormControl<string | null>, "line1": FormControl<string | null>, "line2": FormControl<string | null>, "postalCode": FormControl<string | null>, "state": FormControl<string | null> }>, "phone": FormControl<string | null>, "name": FormControl<string | null> }>(
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
          name:    new FormControl<string | null>(null),
          phone:   new FormControl<string | null>(null),
        },
      ),
    },
  );
  private readonly value$: Signal<typeof this.formGroup.value>                                                                                                                                                                                                                                                                                                                                                = toSignal<typeof this.formGroup.value>(
    this.formGroup.valueChanges.pipe<typeof this.formGroup.value>(
      startWith<typeof this.formGroup.value, [ typeof this.formGroup.value ]>(this.formGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  public readonly edited$: Signal<boolean> = computed<boolean>(
    (): boolean => {
      const stripeCustomerDocument: StripeCustomerDocument | undefined = this.stripeCustomersService.stripeCustomerDocument$();

      return !isEqual(
        this.value$(),
        {
          "shipping": {
            "address": {
              "city":       stripeCustomerDocument?.shipping?.address?.city || null,
              "country":    stripeCustomerDocument?.shipping?.address?.country || null,
              "line1":      stripeCustomerDocument?.shipping?.address?.line1 || null,
              "line2":      stripeCustomerDocument?.shipping?.address?.line2 || null,
              "postalCode": stripeCustomerDocument?.shipping?.address?.postalCode || null,
              "state":      stripeCustomerDocument?.shipping?.address?.state || null,
            },
            "name":    stripeCustomerDocument?.shipping?.name || null,
            "phone":   stripeCustomerDocument?.shipping?.phone || null,
          },
        },
      );
    },
  );

  public submit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);

    setTimeout(
      (): void => {
        this.submitStripeElement?.().then<void>(
          (): void => {
            const stripeCustomerDocument: StripeCustomerDocument | undefined = this.stripeCustomersService.stripeCustomerDocument$();

            if (stripeCustomerDocument && this.auth.currentUser)
              updateDoc<StripeCustomerDocument, StripeCustomerDocument>(
                doc(
                  this.firestore,
                  `/stripeCustomers/${ this.auth.currentUser.uid }`,
                ) as DocumentReference<StripeCustomerDocument, StripeCustomerDocument>,
                {
                  shipping: this.formGroup.value.shipping && this.formGroup.value.shipping.address && this.formGroup.value.shipping.name ? ((
                    {
                      phone,
                    }: typeof this.formGroup.value.shipping,
                    address: typeof this.formGroup.value.shipping.address,
                    name: string,
                  ): Exclude<StripeCustomerDocument["shipping"], undefined> => ({
                    address: ((
                      {
                        city,
                        country,
                        line1,
                        line2,
                        postalCode,
                        state,
                      }: typeof address,
                    ): Exclude<Exclude<StripeCustomerDocument["shipping"], undefined>["address"], undefined> => ({
                      ...(city ? { city } : {}),
                      ...(country ? { country } : {}),
                      ...(line1 ? { line1 } : {}),
                      ...(line2 ? { line2 } : {}),
                      ...(postalCode ? { postalCode } : {}),
                      ...(state ? { state } : {}),
                    }))(address),
                    name,
                    ...(phone ? { phone } : {}),
                  }))(
                    this.formGroup.value.shipping,
                    this.formGroup.value.shipping.address,
                    this.formGroup.value.shipping.name,
                  ) : deleteField(),
                },
              ).catch<never>(
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
