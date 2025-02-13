import { ChangeDetectionStrategy, Component, inject, input, type InputSignal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators }             from "@angular/forms";
import { AuthenticationService }                                               from "@bowstring/services";
import { CaptionComponent, HeaderComponent, LabelComponent, SymbolComponent }  from "../content";
import { DividerComponent, FlexboxContainerComponent, SectionComponent }       from "../layout and organization";
import { ButtonComponent }                                                     from "../menus and actions";
import { type SheetComponent }                                                 from "../presentation";
import { FormComponent, TextFieldInputComponent }                              from "../selection and input";


@Component(
  {
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:         [
      ButtonComponent,
      CaptionComponent,
      DividerComponent,
      FlexboxContainerComponent,
      FormComponent,
      HeaderComponent,
      LabelComponent,
      ReactiveFormsModule,
      SectionComponent,
      SymbolComponent,
      TextFieldInputComponent,
    ],
    selector:        "bowstring--signin",
    styleUrl:        "SigninComponent.sass",
    templateUrl:     "SigninComponent.html",

    standalone: true,
  },
)
export class SigninComponent {

  protected readonly authenticationService: AuthenticationService                                                              = inject<AuthenticationService>(AuthenticationService);
  protected readonly signinWithPasswordFormGroup: FormGroup<{ "email": FormControl<string>, "password": FormControl<string> }> = new FormGroup<{ "email": FormControl<string>, "password": FormControl<string> }>(
    {
      email:    new FormControl<string>(
        "",
        {
          nonNullable: true,
          validators:  [
            Validators.email,
            Validators.required,
          ],
        },
      ),
      password: new FormControl<string>(
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

  public readonly sheetComponentInput$: InputSignal<SheetComponent> = input.required<SheetComponent>(
    {
      alias: "sheetComponent",
    },
  );

  protected async signinWithPasswordFormSubmit(openModel$: SheetComponent["openModel$"]): Promise<void> {
    const email: string | undefined    = this.signinWithPasswordFormGroup.value.email;
    const password: string | undefined = this.signinWithPasswordFormGroup.value.password;

    if (email && password)
      return this.authenticationService.signInWithEmailAndPassword(
        email,
        password,
      ).then<void>(
        (): void => {
          openModel$.set(false);

          setTimeout(
            (): void => this.signinWithPasswordFormGroup.reset(),
            180,
          );
        },
      );
  }
  protected async signinWithPasskeyFormSubmit(openModel$: SheetComponent["openModel$"]): Promise<void> {
    return this.authenticationService.signInWithPasskey().then<void>(
      (): void => openModel$.set(false),
    );
  }

}
