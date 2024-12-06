import { ChangeDetectionStrategy, Component, computed, effect, inject, type Signal }                                                                                                          from "@angular/core";
import { takeUntilDestroyed, toSignal }                                                                                                                                                       from "@angular/core/rxjs-interop";
import { Auth }                                                                                                                                                                               from "@angular/fire/auth";
import { doc, type DocumentData, type DocumentReference, Firestore, updateDoc }                                                                                                               from "@angular/fire/firestore";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators }                                                                                         from "@angular/forms";
import { type AccountDocument }                                                                                                                                                               from "@standard/interfaces";
import { AccountService, InputService }                                                                                                                                                       from "@standard/services";
import { isEqual }                                                                                                                                                                            from "lodash";
import { map, startWith }                                                                                                                                                                                      from "rxjs";
import { BoxComponent, ComboboxInputComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, HeadingGroupComponent, SymbolComponent, TextFieldInputComponent, ToggleComponent } from "../../../../../../../";
import { ChildRouteComponent }                                                                                                                                                                                 from "../../../child route/ChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      BoxComponent,
      ComboboxInputComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      HeadingGroupComponent,
      ReactiveFormsModule,
      TextFieldInputComponent,
      ToggleComponent,
      SymbolComponent,
    ],
    styleUrls:       [
      "MessagesChildRouteComponent.sass",
    ],
    templateUrl:     "MessagesChildRouteComponent.html",

    standalone: true,
  },
)
export class MessagesChildRouteComponent
  extends ChildRouteComponent {

  constructor() {
    super();

    this.messagesContactFormGroup.controls.email.disable();

    this.messagesContactFormGroup.valueChanges.pipe<typeof this.messagesContactFormGroup.value>(
      takeUntilDestroyed<typeof this.messagesContactFormGroup.value>(),
    ).subscribe(
      (): void => {
        if (this.messagesContactEdited$())
          this.messagesContactFormSubmit();
      },
    );
    this.messagesFormGroup.valueChanges.pipe<typeof this.messagesFormGroup.value>(
      takeUntilDestroyed<typeof this.messagesFormGroup.value>(),
    ).subscribe(
      (): void => {
        if (this.messagesEdited$())
          this.messagesFormSubmit();
      },
    );

    effect(
      (): void => {
        const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

        if (accountDocument) {
          this.messagesContactFormGroup.reset(
            {
              email: accountDocument.email,
              phone: accountDocument.phone || {
                countryCode: "",
                national:    "",
              },
            },
          );
          this.messagesFormGroup.reset(
            {
              newsletter:   accountDocument.messages?.newsletter || null,
              orderUpdates: accountDocument.messages?.orderUpdates || null,
              promotions:   accountDocument.messages?.promotions || null,
            },
          );
        }
      },
    );
  }

  protected readonly accountService: AccountService          = inject<AccountService>(AccountService);
  protected readonly auth: Auth                              = inject<Auth>(Auth);
  protected readonly firestore: Firestore                    = inject<Firestore>(Firestore);
  protected readonly inputService: InputService              = inject<InputService>(InputService);
  protected readonly messagesContactEdited$: Signal<boolean> = computed<boolean>(
    (): boolean => {
      const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

      return !isEqual(
        this.messagesContactValue$(),
        {
          email: accountDocument?.email || "",
          phone: accountDocument?.phone || {
            countryCode: "",
            national:    "",
          },
        },
      );
    },
  );
  protected readonly messagesContactFormGroup                = new FormGroup(
    {
      "email": new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      "phone": new FormGroup<{ "countryCode": FormControl<string>, "national": FormControl<string> }>(
        {
          countryCode: new FormControl<string>(
            "",
            {
              nonNullable: true,
              validators:  [
                Validators.required,
                ({ value }: AbstractControl): ValidationErrors => {
                  if (!Object.values<keyof typeof this.inputService.phoneCountryCodeInputComponentOptions>(this.inputService.phoneCountryCodeInputComponentOptions).includes(value))
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
  protected readonly messagesEdited$: Signal<boolean>        = computed<boolean>(
    (): boolean => {
      const messages: AccountDocument["messages"] | undefined = this.accountService.accountDocument$()?.messages;

      return !isEqual(
        this.messagesValue$(),
        {
          newsletter:   messages?.newsletter || null,
          orderUpdates: messages?.orderUpdates || null,
          promotions:   messages?.promotions || null,
        },
      );
    },
  );
  protected readonly messagesFormGroup                       = new FormGroup(
    {
      "newsletter":   new FormControl<boolean | null>(null),
      "orderUpdates": new FormControl<boolean | null>(null),
      "promotions":   new FormControl<boolean | null>(null),
    },
  );

  private readonly messagesContactValue$: Signal<typeof this.messagesContactFormGroup.value> = toSignal<typeof this.messagesContactFormGroup.value>(
    this.messagesContactFormGroup.valueChanges.pipe<typeof this.messagesContactFormGroup.value, typeof this.messagesContactFormGroup.value>(
      startWith<typeof this.messagesContactFormGroup.value, [ typeof this.messagesContactFormGroup.value ]>(this.messagesContactFormGroup.value),
      map<typeof this.messagesContactFormGroup.value, typeof this.messagesContactFormGroup.value>(
        (messagesContactValue: typeof this.messagesContactFormGroup.value): typeof this.messagesContactFormGroup.value => ({
          email: this.accountService.accountDocument$()?.email,
          ...messagesContactValue,
        }),
      ),
    ),
    {
      requireSync: true,
    },
  );
  private readonly messagesValue$: Signal<typeof this.messagesFormGroup.value>               = toSignal<typeof this.messagesFormGroup.value>(
    this.messagesFormGroup.valueChanges.pipe<typeof this.messagesFormGroup.value>(
      startWith<typeof this.messagesFormGroup.value, [ typeof this.messagesFormGroup.value ]>(this.messagesFormGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  protected messagesContactFormSubmit(): void {
    if (this.auth.currentUser)
      updateDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument>,
        {
          phone: this.messagesContactFormGroup.value.phone,
        },
      ).then<void, never>(
        (): void => void (0),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected messagesFormSubmit(): void {
    if (this.auth.currentUser)
      updateDoc<AccountDocument, DocumentData>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument>,
        {
          messages: this.messagesFormGroup.value,
        },
      ).then<void, never>(
        (): void => void (0),
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }

}
