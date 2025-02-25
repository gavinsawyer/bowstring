import { ChangeDetectionStrategy, Component, effect, inject }                                                                                                                                                                                                             from "@angular/core";
import { Auth }                                                                                                                                                                                                                                                           from "@angular/fire/auth";
import { FormControl, FormGroup, ReactiveFormsModule, Validators }                                                                                                                                                                                                        from "@angular/forms";
import { type AccountDocument }                                                                                                                                                                                                                                           from "@bowstring/interfaces";
import { AccountService, AuthenticationService }                                                                                                                                                                                                                          from "@bowstring/services";
import { BoxComponent, ButtonComponent, CaptionComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, SectionComponent, SheetComponent, SymbolComponent, TextFieldInputComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                                                                                                     from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      BoxComponent,
      ButtonComponent,
      CaptionComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      HeadingGroupComponent,
      LabelComponent,
      LinkComponent,
      ReactiveFormsModule,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    styleUrl:        "SecurityAccountChildRouteComponent.sass",
    templateUrl:     "SecurityAccountChildRouteComponent.html",

    standalone: true,
  },
)
export class SecurityAccountChildRouteComponent
  extends AccountChildRouteComponent {

  constructor() {
    super();

    this.passkeyFormGroup.controls.email.disable();
    this.passwordFormGroup.controls.email.disable();

    effect(
      (): void => {
        const accountDocument: AccountDocument | undefined = this.accountService.accountDocument$();

        if (accountDocument) {
          this.passkeyFormGroup.reset(
            {
              email: accountDocument.email,
            },
          );
          this.passwordFormGroup.reset(
            {
              email: accountDocument.email,
            },
          );
        }
      },
    );
  }

  protected readonly accountService: AccountService                                                                                                             = inject<AccountService>(AccountService);
  protected readonly auth: Auth                                                                                                                                 = inject<Auth>(Auth);
  protected readonly authenticationService: AuthenticationService                                                                                               = inject<AuthenticationService>(AuthenticationService);
  protected readonly passkeyFormGroup: FormGroup<{ "email": FormControl<string> }>                                                                              = new FormGroup<{ "email": FormControl<string> }>(
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
    },
  );
  protected readonly passwordFormGroup: FormGroup<{ "email": FormControl<string>, "passwordCurrent": FormControl<string>, "passwordNew": FormControl<string> }> = new FormGroup<{ "email": FormControl<string>, "passwordCurrent": FormControl<string>, "passwordNew": FormControl<string> }>(
    {
      email:           new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      passwordCurrent: new FormControl<string>(
        "",
        {
          nonNullable: true,
        },
      ),
      passwordNew:     new FormControl<string>(
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

  protected async passkeyFormSubmit(): Promise<void> {
    if (this.passkeyFormGroup.controls.email.value)
      return this.authenticationService.linkWithPasskey();
  }
  protected async passwordFormSubmit(): Promise<void> {
    if (this.auth.currentUser && this.passwordFormGroup.controls.email.value && this.passwordFormGroup.value.passwordNew) {
      if (this.passwordFormGroup.value.passwordCurrent)
        return this.authenticationService.updateEmailAndPasswordCredential(
          this.passwordFormGroup.value.passwordCurrent,
          this.passwordFormGroup.value.passwordNew,
        );
      else
        return this.authenticationService.linkWithEmailAndPasswordCredential(
          this.passwordFormGroup.controls.email.value,
          this.passwordFormGroup.value.passwordNew,
        );
    }
  }

}
