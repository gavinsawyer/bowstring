import { ChangeDetectionStrategy, Component, computed, effect, inject, type Signal }                                                                                                                                        from "@angular/core";
import { takeUntilDestroyed, toSignal }                                                                                                                                                                                     from "@angular/core/rxjs-interop";
import { Auth }                                                                                                                                                                                                             from "@angular/fire/auth";
import { deleteField, doc, type DocumentReference, Firestore, updateDoc }                                                                                                                                                   from "@angular/fire/firestore";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators }                                                                                                                       from "@angular/forms";
import { type AccountDocument }                                                                                                                                                                                             from "@bowstring/interfaces";
import { AccountService }                                                                                                                                                                                                   from "@bowstring/services";
import { isEqual }                                                                                                                                                                                                          from "lodash";
import { map, startWith }                                                                                                                                                                                                   from "rxjs";
import { BoxComponent, ComboboxInputComponent, ComboboxInputOptionComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, HeadingGroupComponent, TextFieldInputComponent, ToggleComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                                                       from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      BoxComponent,
      ComboboxInputComponent,
      ComboboxInputOptionComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ReactiveFormsModule,
      TextFieldInputComponent,
      ToggleComponent,
    ],
    styleUrl:        "MessagesAccountChildRouteComponent.sass",
    templateUrl:     "MessagesAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class MessagesAccountChildRouteComponent
  extends AccountChildRouteComponent {

  constructor() {
    super();

    this.accountDocumentFormGroup.controls.email.disable();

    this.accountDocumentFormGroup.valueChanges.pipe<typeof this.accountDocumentFormGroup.value>(
      takeUntilDestroyed<typeof this.accountDocumentFormGroup.value>(),
    ).subscribe(
      (): void => {
        if (this.accountDocumentEdited$())
          this.accountDocumentFormSubmit();
      },
    );
    this.accountDocumentMessagesFormGroup.valueChanges.pipe<typeof this.accountDocumentMessagesFormGroup.value>(
      takeUntilDestroyed<typeof this.accountDocumentMessagesFormGroup.value>(),
    ).subscribe(
      (): void => {
        if (this.accountDocumentMessagesEdited$())
          this.accountDocumentMessagesFormSubmit();
      },
    );

    effect(
      (): void => {
        const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

        this.accountDocumentFormGroup.reset(
          accountDocument && ((
            {
              email,
              phone,
            }: AccountDocument,
          ): typeof this.accountDocumentFormGroup.value => ({
            ...(email ? { email } : {}),
            ...(phone ? {
              phone: ((
                {
                  countryCode,
                  national,
                }: Exclude<AccountDocument["phone"], undefined>,
              ): Exclude<typeof this.accountDocumentFormGroup.value.phone, undefined> => ({
                countryCode,
                national,
              }))(phone),
            } : {}),
          }))(accountDocument),
        );
        this.accountDocumentMessagesFormGroup.reset(
          accountDocument && ((
            {
              messages,
            }: AccountDocument,
          ): typeof this.accountDocumentMessagesFormGroup.value => ({
            ...(messages ? ((
              {
                newsletter,
                orderUpdates,
                promotions,
              }: Exclude<AccountDocument["messages"], undefined>,
            ): typeof this.accountDocumentMessagesFormGroup.value => ({
              newsletter,
              orderUpdates,
              promotions,
            }))(messages) : {}),
          }))(accountDocument),
        );
      },
    );
  }

  protected readonly accountDocumentEdited$: Signal<boolean>                                                                                                                                      = computed<boolean>(
    (): boolean => {
      const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

      return !!accountDocument && !isEqual(
        this.accountDocumentFormValue$(),
        {
          "email": accountDocument.email || "",
          "phone": {
            "countryCode": accountDocument.phone?.countryCode || "",
            "national":    accountDocument.phone?.national || "",
          },
        },
      );
    },
  );
  protected readonly phoneCountryCodeOptions: { label: string, value: string }[]                                                                                                                  = [
    {
      label: "US",
      value: "1",
    },
    {
      label: "GB",
      value: "44",
    },
    {
      label: "ES",
      value: "34",
    },
    {
      label: "FR",
      value: "33",
    },
  ];
  protected readonly accountDocumentFormGroup: FormGroup<{ "email": FormControl<string>, "phone": FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }> }>           = new FormGroup<{ "email": FormControl<string>, "phone": FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }> }>(
    {
      email: new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      phone: new FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }>(
        {
          countryCode: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
                ({ value }: AbstractControl): ValidationErrors => {
                  const phoneCountryCodeOptionValues: string[] = this.phoneCountryCodeOptions.map<string>(
                    ({ value }: { value: string }): string => value,
                  );

                  if (phoneCountryCodeOptionValues.includes(value))
                    return {
                      "optionSelected": true,
                    };
                  else
                    return {};
                },
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
  protected readonly accountDocumentMessagesEdited$: Signal<boolean>                                                                                                                              = computed<boolean>(
    (): boolean => {
      const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

      return !!accountDocument && !isEqual(
        this.accountDocumentMessagesFormValue$(),
        {
          "newsletter":   typeof accountDocument.messages?.newsletter === "boolean" ? accountDocument.messages.newsletter : null,
          "orderUpdates": typeof accountDocument.messages?.orderUpdates === "boolean" ? accountDocument.messages.orderUpdates : null,
          "promotions":   typeof accountDocument.messages?.promotions === "boolean" ? accountDocument.messages.promotions : null,
        },
      );
    },
  );
  protected readonly accountDocumentMessagesFormGroup: FormGroup<{ newsletter: FormControl<boolean | null>, orderUpdates: FormControl<boolean | null>, promotions: FormControl<boolean | null> }> = new FormGroup(
    {
      "newsletter":   new FormControl<boolean | null>(null),
      "orderUpdates": new FormControl<boolean | null>(null),
      "promotions":   new FormControl<boolean | null>(null),
    },
  );
  protected readonly accountService: AccountService                                                                                                                                               = inject<AccountService>(AccountService);
  protected readonly auth: Auth                                                                                                                                                                   = inject<Auth>(Auth);
  protected readonly firestore: Firestore                                                                                                                                                         = inject<Firestore>(Firestore);

  private readonly accountDocumentFormValue$: Signal<typeof this.accountDocumentFormGroup.value>                 = toSignal<typeof this.accountDocumentFormGroup.value>(
    this.accountDocumentFormGroup.valueChanges.pipe<typeof this.accountDocumentFormGroup.value, typeof this.accountDocumentFormGroup.value>(
      startWith<typeof this.accountDocumentFormGroup.value, [ typeof this.accountDocumentFormGroup.value ]>(this.accountDocumentFormGroup.value),
      map<typeof this.accountDocumentFormGroup.value, typeof this.accountDocumentFormGroup.value>(
        (messagesContactValue: typeof this.accountDocumentFormGroup.value): typeof this.accountDocumentFormGroup.value => ({
          email: this.accountService.accountDocument$()?.email,
          ...messagesContactValue,
        }),
      ),
    ),
    {
      requireSync: true,
    },
  );
  private readonly accountDocumentMessagesFormValue$: Signal<typeof this.accountDocumentMessagesFormGroup.value> = toSignal<typeof this.accountDocumentMessagesFormGroup.value>(
    this.accountDocumentMessagesFormGroup.valueChanges.pipe<typeof this.accountDocumentMessagesFormGroup.value>(
      startWith<typeof this.accountDocumentMessagesFormGroup.value, [ typeof this.accountDocumentMessagesFormGroup.value ]>(this.accountDocumentMessagesFormGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  protected accountDocumentFormSubmit(): void {
    if (this.auth.currentUser)
      updateDoc<AccountDocument, AccountDocument>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          phone: this.accountDocumentFormGroup.value.phone ? ((
            {
              countryCode,
              national,
            }: Exclude<typeof this.accountDocumentFormGroup.value.phone, undefined>,
          ): Exclude<AccountDocument["phone"], undefined> => ({
            countryCode: countryCode || "",
            national:    national || "",
          }))(this.accountDocumentFormGroup.value.phone) : deleteField(),
        },
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected accountDocumentMessagesFormSubmit(): void {
    if (this.auth.currentUser)
      updateDoc<AccountDocument, AccountDocument>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          messages: this.accountDocumentMessagesFormGroup.value && (typeof this.accountDocumentMessagesFormGroup.value.newsletter === "boolean" || typeof this.accountDocumentMessagesFormGroup.value.orderUpdates === "boolean" || typeof this.accountDocumentMessagesFormGroup.value.promotions === "boolean") ? ((
            {
              newsletter,
              orderUpdates,
              promotions,
            }: typeof this.accountDocumentMessagesFormGroup.value,
          ): Exclude<AccountDocument["messages"], undefined> => ({
            ...(typeof newsletter === "boolean" ? { newsletter } : {}),
            ...(typeof orderUpdates === "boolean" ? { orderUpdates } : {}),
            ...(typeof promotions === "boolean" ? { promotions } : {}),
          }))(this.accountDocumentMessagesFormGroup.value) : deleteField(),
        },
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }

}
