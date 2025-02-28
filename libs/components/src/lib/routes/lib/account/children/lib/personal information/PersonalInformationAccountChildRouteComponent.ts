import { ChangeDetectionStrategy, Component, computed, effect, inject, type Signal }                                                                                                      from "@angular/core";
import { toSignal }                                                                                                                                                                       from "@angular/core/rxjs-interop";
import { Auth }                                                                                                                                                                           from "@angular/fire/auth";
import { deleteField, doc, type DocumentReference, Firestore, updateDoc }                                                                                                                 from "@angular/fire/firestore";
import { FormControl, FormGroup, ReactiveFormsModule }                                                                                                                                    from "@angular/forms";
import { type AccountDocument }                                                                                                                                                           from "@bowstring/interfaces";
import { AccountService }                                                                                                                                                                 from "@bowstring/services";
import { isEqual }                                                                                                                                                                        from "lodash";
import { startWith }                                                                                                                                                                      from "rxjs";
import { BoxComponent, ButtonComponent, DatepickerInputComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, SymbolComponent, TextFieldInputComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                     from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      BoxComponent,
      ButtonComponent,
      DatepickerInputComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      ReactiveFormsModule,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    styleUrl:        "PersonalInformationAccountChildRouteComponent.sass",
    templateUrl:     "PersonalInformationAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class PersonalInformationAccountChildRouteComponent
  extends AccountChildRouteComponent {

  constructor() {
    super();

    effect(
      (): void => {
        const profile: AccountDocument["profile"] = this.accountService.accountDocument$()?.profile;

        if (profile) {
          this.birthdayFormGroup.reset(
            {
              birthday: profile.birthday,
            },
          );
          this.nameFormGroup.reset(
            {
              name: profile.name,
            },
          );
        }
      },
    );
  }

  private readonly auth: Auth           = inject<Auth>(Auth);
  private readonly firestore: Firestore = inject<Firestore>(Firestore);

  protected readonly accountService: AccountService                                           = inject<AccountService>(AccountService);
  protected readonly birthdayEdited$: Signal<boolean>                                         = computed<boolean>(
    (): boolean => {
      const profile: AccountDocument["profile"] = this.accountService.accountDocument$()?.profile;

      return !isEqual(
        this.birthdayValue$(),
        {
          "birthday": profile?.birthday || null,
        },
      );
    },
  );
  protected readonly birthdayFormGroup: FormGroup<{ "birthday": FormControl<string | null> }> = new FormGroup<{ "birthday": FormControl<string | null> }>(
    {
      birthday: new FormControl<string | null>(null),
    },
  );
  protected readonly nameEdited$: Signal<boolean>                                             = computed<boolean>(
    (): boolean => {
      const profile: AccountDocument["profile"] = this.accountService.accountDocument$()?.profile;

      return !isEqual(
        this.nameValue$(),
        {
          "name": profile?.name || null,
        },
      );
    },
  );
  protected readonly nameFormGroup: FormGroup<{ "name": FormControl<string | null> }>         = new FormGroup<{ "name": FormControl<string | null> }>(
    {
      name: new FormControl<string | null>(null),
    },
  );

  private readonly birthdayValue$: Signal<typeof this.birthdayFormGroup.value> = toSignal<typeof this.birthdayFormGroup.value>(
    this.birthdayFormGroup.valueChanges.pipe<typeof this.birthdayFormGroup.value>(
      startWith<typeof this.birthdayFormGroup.value, [ typeof this.birthdayFormGroup.value ]>(this.birthdayFormGroup.value),
    ),
    {
      requireSync: true,
    },
  );
  private readonly nameValue$: Signal<typeof this.nameFormGroup.value>         = toSignal<typeof this.nameFormGroup.value>(
    this.nameFormGroup.valueChanges.pipe<typeof this.nameFormGroup.value>(
      startWith<typeof this.nameFormGroup.value, [ typeof this.nameFormGroup.value ]>(this.nameFormGroup.value),
    ),
    {
      requireSync: true,
    },
  );

  protected async birthdayFormSubmit(): Promise<void> {
    if (this.auth.currentUser)
      return updateDoc<AccountDocument, AccountDocument>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          "profile.birthday": this.birthdayFormGroup.value.birthday || deleteField(),
        },
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }
  protected async nameFormSubmit(): Promise<void> {
    if (this.auth.currentUser)
      return updateDoc<AccountDocument, AccountDocument>(
        doc(
          this.firestore,
          `/accounts/${ this.auth.currentUser.uid }`,
        ) as DocumentReference<AccountDocument, AccountDocument>,
        {
          "profile.name": this.nameFormGroup.value.name || deleteField(),
        },
      ).catch<never>(
        (error: unknown): never => {
          console.error("Something went wrong.");

          throw error;
        },
      );
  }

}
