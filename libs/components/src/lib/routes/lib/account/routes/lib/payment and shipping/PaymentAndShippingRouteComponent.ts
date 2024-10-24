import { Component, computed, effect, inject, type Signal }                                                                                                                                                                                                   from "@angular/core";
import { toSignal }                                                                                                                                                                                                                                           from "@angular/core/rxjs-interop";
import { type AbstractControl, FormControl, FormGroup, ReactiveFormsModule, type ValidationErrors, Validators }                                                                                                                                               from "@angular/forms";
import { AccountDocument }                                                                                                                                                                                                                                    from "@standard/interfaces";
import { MaskPipe, UnmaskPipe }                                                                                                                                                                                                                               from "@standard/pipes";
import { AccountService, InputService, StripeApiLoaderService }                                                                                                                                                                                               from "@standard/services";
import { isEqual }                                                                                                                                                                                                                                            from "lodash";
import { startWith }                                                                                                                                                                                                                                          from "rxjs";
import { BoxComponent, ButtonComponent, ComboboxComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, LabelComponent, MapComponent, RouteComponent, SectionComponent, SheetComponent, SymbolComponent, TextFieldComponent } from "../../../../../../../";


@Component(
  {
    imports:     [
      BoxComponent,
      ButtonComponent,
      ComboboxComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      LabelComponent,
      MapComponent,
      MaskPipe,
      ReactiveFormsModule,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
      TextFieldComponent,
      UnmaskPipe,
    ],
    standalone:  true,
    styleUrls:   [
      "PaymentAndShippingRouteComponent.sass",
    ],
    templateUrl: "PaymentAndShippingRouteComponent.html",
  },
)
export class PaymentAndShippingRouteComponent
  extends RouteComponent {

  constructor() {
    super();

    this.stripeApiLoaderService.load().then<void>(
      (): void => void (0),
    );

    effect(
      (): void => {
        const shipping: AccountDocument["shipping"] | undefined = this.accountService.accountDocument$()?.shipping;

        if (shipping)
          this.shippingFormGroup.reset(shipping);
      },
    );
  }

  private readonly stripeApiLoaderService: StripeApiLoaderService = inject<StripeApiLoaderService>(StripeApiLoaderService);

  protected readonly accountService: AccountService                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       = inject<AccountService>(AccountService);
  protected readonly billingFormEdited$: Signal<boolean>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  = computed<boolean>(
    (): boolean => !isEqual(
      this.billingFormValue$(),
      this.accountService.accountDocument$()?.shipping,
    ),
  );
  protected readonly billingFormGroup: FormGroup<{ "number": FormControl<string>, "postalCode": FormControl<string>, "name": FormControl<string>, "securityCode": FormControl<string>, "expirationDate": FormControl<string> }>                                                                                                                                                                                                                                                                                                                                                                                           = new FormGroup<{ "number": FormControl<string>, "postalCode": FormControl<string>, "name": FormControl<string>, "securityCode": FormControl<string>, "expirationDate": FormControl<string> }>(
    {
      expirationDate: new FormControl(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
      name:           new FormControl(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
      number:         new FormControl(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
      postalCode:     new FormControl(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.required,
          ],
        },
      ),
      securityCode:   new FormControl(
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
  protected readonly billingFormValue$: Signal<typeof this.billingFormGroup.value>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        = toSignal<typeof this.billingFormGroup.value>(
    this.billingFormGroup.valueChanges.pipe<typeof this.billingFormGroup.value>(
      startWith<typeof this.billingFormGroup.value, [ typeof this.billingFormGroup.value ]>(this.billingFormGroup.value),
    ),
    {
      requireSync: true,
    },
  );
  protected readonly inputService: InputService                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           = inject<InputService>(InputService);
  protected readonly shippingFormEdited$: Signal<boolean>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 = computed<boolean>(
    (): boolean => !isEqual(
      this.shippingFormValue$(),
      this.accountService.accountDocument$()?.shipping,
    ),
  );
  protected readonly shippingFormGroup: FormGroup<{ "address": FormGroup<{ "country": FormControl<string>, "level1": FormControl<string>, "level2": FormControl<string>, "level3": FormControl<string | null>, "level4": FormControl<string | null>, "line1": FormControl<string>, "line2": FormControl<string | null>, "line3": FormControl<string | null>, "postalCode": FormControl<string> }>, "name": FormGroup<{ "first": FormControl<string>, "last": FormControl<string>, "prefix": FormControl<string | null> }>, "phone": FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }> }> = new FormGroup<{ "address": FormGroup<{ "country": FormControl<string>, "level1": FormControl<string>, "level2": FormControl<string>, "level3": FormControl<string | null>, "level4": FormControl<string | null>, "line1": FormControl<string>, "line2": FormControl<string | null>, "line3": FormControl<string | null>, "postalCode": FormControl<string> }>, "name": FormGroup<{ "first": FormControl<string>, "last": FormControl<string>, "prefix": FormControl<string | null> }>, "phone": FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }> }>(
    {
      address: new FormGroup<{ "country": FormControl<string>, "level1": FormControl<string>, "level2": FormControl<string>, "level3": FormControl<string | null>, "level4": FormControl<string | null>, "line1": FormControl<string>, "line2": FormControl<string | null>, "line3": FormControl<string | null>, "postalCode": FormControl<string> }>(
        {
          country:    new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
                ({ value }: AbstractControl): ValidationErrors => !Object.values<string>(this.inputService.addressCountryInputComponentOptions).includes(value) ? {
                  "optionSelected": true,
                } : {},
              ],
            },
          ),
          level1:     new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          level2:     new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          level3:     new FormControl<string | null>(
            null,
          ),
          level4:     new FormControl<string | null>(
            null,
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
          line2:      new FormControl<string | null>(
            null,
          ),
          line3:      new FormControl<string | null>(
            null,
          ),
          postalCode: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
        },
      ),
      name:    new FormGroup<{ "first": FormControl<string>, "last": FormControl<string>, "prefix": FormControl<string | null> }>(
        {
          first:  new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          last:   new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
          prefix: new FormControl<string | null>(
            null,
            {
              validators: [
                ({ value }: AbstractControl): ValidationErrors => !Object.values<string>(this.inputService.namePrefixInputComponentOptions).includes(value) ? {
                  "optionSelected": true,
                } : {},
              ],
            },
          ),
        },
      ),
      phone:   new FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }>(
        {
          countryCode: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
                ({ value }: AbstractControl): ValidationErrors => !Object.values<string>(this.inputService.phoneCountryCodeInputComponentOptions).includes(value) ? {
                  "optionSelected": true,
                } : {},
              ],
            },
          ),
          national:    new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
              ],
            },
          ),
        },
      ),
    },
  );
  protected readonly shippingFormValue$: Signal<typeof this.shippingFormGroup.value>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      = toSignal<typeof this.shippingFormGroup.value>(
    this.shippingFormGroup.valueChanges.pipe<typeof this.shippingFormGroup.value>(
      startWith<typeof this.shippingFormGroup.value, [ typeof this.shippingFormGroup.value ]>(this.shippingFormGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  protected billingFormSubmit(openModel$: SheetComponent["openModel$"]): void {
    openModel$.set(false);
  }
  protected shippingFormSubmit(openModel$: SheetComponent["openModel$"]): void {
    if (this.shippingFormGroup.value.address && this.shippingFormGroup.value.address.country && this.shippingFormGroup.value.address.level1 && this.shippingFormGroup.value.address.level2 && this.shippingFormGroup.value.address.line1 && this.shippingFormGroup.value.address.postalCode && this.shippingFormGroup.value.name && this.shippingFormGroup.value.name.first && this.shippingFormGroup.value.name.last && this.shippingFormGroup.value.phone && this.shippingFormGroup.value.phone.countryCode && this.shippingFormGroup.value.phone.national)
      this.accountService.update(
        {
          shipping: {
            address: {
              country:    this.shippingFormGroup.value.address.country,
              level1:     this.shippingFormGroup.value.address.level1,
              level2:     this.shippingFormGroup.value.address.level2,
              level3:     this.shippingFormGroup.value.address.level3 || null,
              level4:     this.shippingFormGroup.value.address.level4 || null,
              line1:      this.shippingFormGroup.value.address.line1,
              line2:      this.shippingFormGroup.value.address.line2 || null,
              line3:      this.shippingFormGroup.value.address.line3 || null,
              postalCode: this.shippingFormGroup.value.address.postalCode,
            },
            name:    {
              first:  this.shippingFormGroup.value.name.first,
              last:   this.shippingFormGroup.value.name.last,
              prefix: this.shippingFormGroup.value.name.prefix || null,
            },
            phone:   {
              countryCode: this.shippingFormGroup.value.phone.countryCode,
              national:    this.shippingFormGroup.value.phone.national,
            },
          },
        },
      ).then<void>(
        (): void => openModel$.set(false),
      );
  }

}
