import { ChangeDetectionStrategy, Component, effect, inject }                                                                                                                                                                                                             from "@angular/core";
import { Auth }                                                                                                                                                                                                                                                           from "@angular/fire/auth";
import { FormControl, FormGroup, ReactiveFormsModule, Validators }                                                                                                                                                                                                        from "@angular/forms";
import { LinkSymbolDirective }                                                                                                                                                                                                                                            from "@standard/directives";
import { type AccountDocument }                                                                                                                                                                                                                                           from "@standard/interfaces";
import { AccountService, AuthenticationService }                                                                                                                                                                                                                          from "@standard/services";
import { BoxComponent, ButtonComponent, CaptionComponent, DividerComponent, FlexboxContainerComponent, FormComponent, HeaderComponent, HeadingGroupComponent, LabelComponent, LinkComponent, SectionComponent, SheetComponent, SymbolComponent, TextFieldInputComponent } from "../../../../../../../";
import { AccountChildRouteComponent }                                                                                                                                                                                                                                     from "../../../child/AccountChildRouteComponent";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
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
      LinkSymbolDirective,
      ReactiveFormsModule,
      SectionComponent,
      SheetComponent,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    styleUrls:       [
      "SecurityAccountChildRouteComponent.sass",
    ],
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
              email: accountDocument.email || undefined,
            },
          );
          this.passwordFormGroup.reset(
            {
              email: accountDocument.email || undefined,
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

  protected passkeyFormGroupSubmit(): void {
    if (this.passkeyFormGroup.controls.email.value)
      this.authenticationService.linkWithPasskey().then<void>(
        (): void => void (0),
      );
  }
  protected passwordFormGroupSubmit(): void {
    if (this.auth.currentUser && this.passwordFormGroup.controls.email.value && this.passwordFormGroup.value.passwordNew) {
      if (this.passwordFormGroup.value.passwordCurrent)
        this.authenticationService.updateEmailAndPasswordCredential(
          this.passwordFormGroup.value.passwordCurrent,
          this.passwordFormGroup.value.passwordNew,
        );
      else
        this.authenticationService.linkWithEmailAndPasswordCredential(
          this.passwordFormGroup.controls.email.value,
          this.passwordFormGroup.value.passwordNew,
        );
    }
  }

}
